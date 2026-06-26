<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transaction\CreateTransctionRequest;
use App\Http\Requests\Transaction\UpdateTransctionRequest;
use App\Http\Resources\TransactionResource;
use App\Models\Category;
use App\Models\Transaction;
use App\Models\Wallet;
use App\Services\ImageService;
use App\Traits\JsonApiResponse;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TransactionController extends Controller
{
    use JsonApiResponse;

    protected object $user;
    protected string $path = "transaction/";

    /**
     * Display a listing of the resource.
     */
    public function __construct(protected Transaction $model, protected ImageService $imageService)
    {
        $this->user = auth('sanctum')->user();
    }

    public function index()
    {
        // ambil transaksi pribadi
        $items = $this->model->query()->where("user_id", $this->user->id)->with(['category', 'wallet'])->orderByDesc('date')->get();

        $transactions = TransactionResource::collection($items)->resolve();
        return $this->success($transactions, "Data transaksi berhasil diambil");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateTransctionRequest $request)
    {
        $credentials = $request->validated();
        try {
            $wallet = Wallet::query()->where("id", $credentials["wallet_id"])->where("user_id", $this->user->id)->first();

            $category = Category::query()->where("id", $credentials["category_id"])->where("user_id", $this->user->id)->first();

            if (!$wallet) {
                throw new Exception("Wallet tidak ditemukan!");
            }

            if (!$category) {
                throw new Exception("Kategori tidak ditemukan!");
            }

            if ($category->type === "expense") {
                if ($wallet->balance < $credentials['amount']) {
                    throw new Exception("Saldo tidak cukup!");
                }
            }

            $data = DB::transaction(function () use ($credentials, $wallet, $category) {
                $credentials["user_id"] = $this->user->id;

                // tanggal
                if (!isset($credentials["date"]) && empty($credentials["date"])) {
                    $credentials["date"] = now()->format("Y-m-d");
                }

                // gambar bukti
                if (isset($credentials["receipt_image"]) && !empty($credentials["receipt_image"])) {
                    $filename = $this->imageService->save($credentials["receipt_image"], $this->path);
                    $credentials["receipt_image"] = $filename;
                }

                // $category = Category::query()->where("id", $credentials["category_id"])->where("user_id", $this->user->id)->first();

                $newBalance = $category->type === "income" ? $wallet->balance + $credentials["amount"] : $wallet->balance - $credentials["amount"];

                $wallet->update(["balance" => $newBalance]);

                $item = $this->model->create($credentials);
                return $item;
            });

            return $this->success($data, "Berhasil menambahkan transaksi baru!", 201);
        } catch (\Exception $e) {
            Log::error("error : " . $e->getMessage());
            return $this->error($e->getMessage(), "Request gagal");
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $item =  $this->model->query()->where("user_id", $this->user->id)->where('id', $id)->first();

            if (!$item) {
                return $this->error("error", "Transaksi tidak ditemukan!", 404);
            }

            return $this->success($item, "Berhasil mendapatkan transaksi!", 201);
        } catch (\Exception $e) {
            Log::error("error : " . $e->getMessage());
            return $this->error($e->getMessage(), "Request gagal");
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransctionRequest $request, string $id)
    {
        try {
            $credentials = $request->validated();

            $item =  $this->model->query()->where("user_id", $this->user->id)->where('id', $id)->first();

            if (!$item) {
                throw new Exception("Transaksi tidak ditemukan!");
            }

            if ($request->hasFile('receipt_image')) {
                $filename = $this->imageService->update($item->receipt_image, $credentials['receipt_image'], $this->path);
                $credentials['receipt_image'] = $filename;
            }

            $item->update($credentials);

            return $this->success($item, "Berhasil mengubah data transaksi!", 201);
        } catch (\Exception $e) {
            Log::error("error : " . $e->getMessage());
            return $this->error($e->getMessage(), "Request gagal");
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $transaction = Transaction::query()->where("id", $id)->where("user_id", $this->user->id)->first();

            if (!$transaction) {
                throw new Exception("Transaksi tidak ditemukan!");
            }

            if ($transaction->receipt_image) {
                $this->imageService->delete($transaction->receipt_image, $this->path);
            }

            $transaction->delete();

            return $this->success($transaction, "Berhasil menghapus transaksi!", 201);
        } catch (\Exception $e) {
            Log::error("error : " . $e->getMessage());
            return $this->error($e->getMessage(), "Request gagal");
        }
    }

    public function getFormData()
    {
        try {
            $categories = Category::query()->where("user_id", $this->user->id)->get();

            if (!$categories) {
                throw new Exception("Kategori tidak ditemukan!");
            }

            $wallets = Wallet::query()->where("user_id", $this->user->id)->get();

            if (!$wallets) {
                throw new Exception("Dompet tidak ditemukan!");
            }

            $formData = [
                "categories" => $categories,
                "wallets" => $wallets
            ];

            return $this->success($formData, "Berhasil mendapat form data!", 201);
        } catch (\Exception $e) {
            Log::error("error : " . $e->getMessage());
            return $this->error($e->getMessage(), "Request gagal");
        }
    }
}
