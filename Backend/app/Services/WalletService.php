<?php

namespace App\Services;

use App\Models\Wallet;

class WalletService
{
    /**
     * Create a new class instance.
     */
    protected object $user;

    /**
     * Display a listing of the resource.
     */
    public function __construct(protected Wallet $model)
    {
        $this->user = auth('sanctum')->user();
    }

    public function getAll()
    {
        return $this->model->query()->where("user_id", $this->user->id)->get();
    }

    public function getById($id)
    {
        $item = $this->model->query()->where("user_id", $this->user->id)->where('id', $id)->first();

        if (!$item) {
            throw new \Exception("Wallet tidak ditemukan");
        }

        return $item;
    }

    public function create($credentials)
    {
        $credentials["user_id"] = $this->user->id;
        $item = $this->model->create($credentials);

        if (!$item) {
            throw new \Exception("Wallet tidak ditemukan");
        }

        return $item;
    }

    public function update($credentials, $id)
    {
        $item = $this->model->query()->where("user_id", $this->user->id)->where("id", $id)->update($credentials);

        if (!$item) {
            throw new \Exception("Wallet tidak ditemukan");
        }

        return $item;
    }

    public function delete($id)
    {
        $item = $this->model->query()->where("user_id", $this->user->id)->where("id", $id)->delete();

        if (!$item) {
            throw new \Exception("Wallet tidak ditemukan");
        }

        return $item;
    }
}
