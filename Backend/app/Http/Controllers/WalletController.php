<?php

namespace App\Http\Controllers;

use App\Http\Requests\Wallet\CreateWalletRequest;
use App\Http\Requests\Wallet\UpdateWalletRequest;
use App\Models\Wallet;
use App\Traits\JsonApiResponse;
use Illuminate\Support\Facades\Log;

class WalletController extends Controller
{
    use JsonApiResponse;

    protected object $user;

    /**
     * Display a listing of the resource.
     */
    public function __construct(protected Wallet $model)
    {
        $this->user = auth('sanctum')->user();
    }

    public function index()
    {
        // ambil dompet pribadi
        $items = $this->model->query()->where("user_id", $this->user->id)->get();
        return $this->success($items, "Data wallet berhasil diambil");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateWalletRequest $request)
    {
        $credentials = $request->validated();
        try {
            $credentials["user_id"] = $this->user->id;

            $item = $this->model->create($credentials);

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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWalletRequest $request, string $id)
    {
        $credentials = $request->validated();

        try {
            $item = $this->model->query()->where("user_id", $this->user->id)->where("id", $id)->update($credentials);

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
            $item = $this->model->query()->where("user_id", $this->user->id)->where("id", $id)->delete();

            return $this->success($item, "Berhasil menghapus wallet!", 201);
        } catch (\Exception $e) {
            Log::error("error : " . $e->getMessage());
            return $this->error($e->getMessage(), "Request gagal");
        }
    }
}
