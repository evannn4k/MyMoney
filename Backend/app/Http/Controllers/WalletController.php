<?php

namespace App\Http\Controllers;

use App\Http\Requests\Wallet\CreateWalletRequest;
use App\Http\Requests\Wallet\UpdateWalletRequest;
use App\Models\Wallet;
use App\Services\WalletService;
use App\Traits\JsonApiResponse;
use Illuminate\Support\Facades\Log;

class WalletController extends Controller
{
    use JsonApiResponse;

    /**
     * Display a listing of the resource.
     */
    public function __construct(protected WalletService $walletService) {}

    public function index()
    {
        // ambil dompet pribadi
        $items = $this->walletService->getAll();
        return $this->success($items, "Data wallet berhasil diambil");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateWalletRequest $request)
    {
        try {
            $item = $this->walletService->create($request->validated());

            return $this->success($item, "Berhasil menambahkan wallet baru!", 201);
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
            $item = $this->walletService->getById($id);

            return $this->success($item, "Berhasil menfapatkan wallet!", 201);
        } catch (\Exception $e) {
            Log::error("error : " . $e->getMessage());
            return $this->error($e->getMessage(), "Request gagal");
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWalletRequest $request, string $id)
    {
        try {
            $item = $this->walletService->update($request->validated(), $id);

            return $this->success($item, "Berhasil mengubah wallet!", 201);
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
            $item = $this->walletService->delete($id);

            return $this->success($item, "Berhasil menghapus wallet!", 201);
        } catch (\Exception $e) {
            Log::error("error : " . $e->getMessage());
            return $this->error($e->getMessage(), "Request gagal");
        }
    }
}
