<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\CreateCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Models\Category;
use App\Traits\JsonApiResponse;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    use JsonApiResponse;

    protected object $user;

    /**
     * Display a listing of the resource.
     */
    public function __construct(protected Category $model)
    {
        $this->user = auth('sanctum')->user();
    }

    public function index()
    {
        // ambil kategori pribadi
        $userId = auth('sanctum')->user()->id;
        $items = $this->model->query()->where("user_id", $userId)->get();
        return $this->success($items, "Data kategori berhasil diambil");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateCategoryRequest $request)
    {
        $credentials = $request->validated();
        try {
            $credentials["user_id"] = $this->user->id;

            $item = $this->model->create($credentials);

            return $this->success($item, "Berhasil menambahkan kategori baru!", 201);
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
    public function update(UpdateCategoryRequest $request, string $id)
    {
        $credentials = $request->validated();

        try {
            $item = $this->model->query()->where("user_id", $this->user->id)->where("id", $id)->update($credentials);

            return $this->success($item, "Berhasil mengubah kategori!", 201);
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

            return $this->success($item, "Berhasil menghapus kategori!", 201);
        } catch (\Exception $e) {
            Log::error("error : " . $e->getMessage());
            return $this->error($e->getMessage(), "Request gagal");
        }
    }
}
