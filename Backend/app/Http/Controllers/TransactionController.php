<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transaction\CreateTransctionRequest;
use App\Http\Requests\Transaction\UpdateTransctionRequest;
use App\Models\Category;
use App\Models\Wallet;
use App\Services\ImageService;
use App\Traits\JsonApiResponse;
use Illuminate\Support\Facades\Log;

class TransactionController extends Controller
{
    use JsonApiResponse;

    protected object $user;
    protected string $path = "transaction/";

    /**
     * Display a listing of the resource.
     */
    public function __construct(protected Category $model, protected ImageService $imageService)
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
            $credentials["user_id"] = $this->user->id;

            // tanggal
            if (!isset($credentials["date"]) && empty($credentials["date"])) {
                $credentials["date"] = now();
            }

            // gambar bukti
            if (isset($credentials["receipt_image"]) && !empty($credentials["receipt_image"])) {
                $filename = $this->imageService->save($credentials["receipt_image"], $this->path);
                $credentials["receipt_image"] = $filename;
            }

            $category = Category::findOrFail($credentials["category_id"]);
            $wallet = Wallet::findOrFail($credentials["wallet_id"]);


            $item = $this->model->create($credentials);
            return $this->success($item, "Berhasilkan menambahkan transaksi baru!", 201);
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
        //
    }
}
