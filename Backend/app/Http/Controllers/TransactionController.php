<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transaction\CreateTransctionRequest;
use App\Http\Requests\Transaction\UpdateTransctionRequest;
use App\Models\Category;
use App\Models\Transaction;
use App\Models\Wallet;
use App\Services\ImageService;
use App\Traits\JsonApiResponse;
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
        $items = $this->model->query()->where("user_id", $this->user->id)->get();
        return $this->success($items, "Data transaksi berhasil diambil");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateTransctionRequest $request)
    {
        $credentials = $request->validated();
        try {
            $wallet = Wallet::query()->where("id", $credentials["wallet_id"])->where("user_id", $this->user->id)->first();

            if (!$wallet) {
                return $this->error("", "Wallet tidak ditemukan", 404);
            }

            $category = Category::query()->where("id", $credentials["category_id"])->where("user_id", $this->user->id)->first();

            if (!$category) {
                return $this->error("", "Kategori tidak ditemukan", 404);
            }

            $data = DB::transaction(function () use ($credentials, $wallet) {

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

                $category = Category::findOrFail($credentials["category_id"]);

                $newBalance = $category->type === "income" ? $wallet->balance + $credentials["amount"] : $wallet->balance - $credentials["amount"];

                $wallet->update(["balance" => $newBalance]);

                $item = $this->model->create($credentials);
                return $item;
            });

            return $this->success($data, "Berhasil menambahkan transaksi baru!", 201);
        } catch (\Exception $e) {
            Log::error("error : " . $e->getMessage());
            return $this->error("Error", "Request gagal");
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransctionRequest $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $transaction = Transaction::query()->where("id", $id)->where("user_id", $this->user->id)->get();
            
            if(!$transaction) {
                return $this->error("error", "Transaksi tidak ditemukan!", 404);
            }
            
            $transaction->delete();

            return $this->success($transaction, "Berhasil menghapus transaksi!", 201);
        } catch (\Exception $e) {
            Log::error("error : " . $e->getMessage());
            return $this->error("Error", "Request gagal");
        }
    }
}
