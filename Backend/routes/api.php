<?php

use App\Http\Controllers\Auth\SessionController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\WalletController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::post("/logout", [SessionController::class, "logout"]);

    Route::apiResource("/wallet", WalletController::class);
    Route::apiResource("/category", CategoryController::class);
    Route::apiResource("/transaction", TransactionController::class);
});

Route::controller(SessionController::class)->group(function () {
    Route::post("/verify", "verify");
    Route::post("/register", "register");
});
