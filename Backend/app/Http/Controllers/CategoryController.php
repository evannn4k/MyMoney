<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\CreateCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Models\Category;
use App\Services\CategoryService;
use App\Traits\JsonApiResponse;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    use JsonApiResponse;


    /**
     * Display a listing of the resource.
     */
    public function __construct(protected CategoryService $categoryService) {}

    public function index()
    {
        // ambil kategori pribadi
        $items = $this->categoryService->getAll();
        return $this->success($items, "Data kategori berhasil diambil");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateCategoryRequest $request)
    {
        try {

            $item = $this->categoryService->create($request->validated());

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
        try {
            $item = $this->categoryService->getById($id);

            return $this->success($item, "Berhasil menpapatkan kategori!", 201);
        } catch (\Exception $e) {
            Log::error("error : " . $e->getMessage());
            return $this->error($e->getMessage(), "Request gagal");
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, string $id)
    {

        try {
            $item = $this->categoryService->update($request->validated(), $id);

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
            $item = $this->categoryService->delete($id);

            return $this->success($item, "Berhasil menghapus kategori!", 201);
        } catch (\Exception $e) {
            Log::error("error : " . $e->getMessage());
            return $this->error($e->getMessage(), "Request gagal");
        }
    }
}
