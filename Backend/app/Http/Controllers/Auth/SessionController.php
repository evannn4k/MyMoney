<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AuthLoginRequest;
use App\Http\Requests\Auth\AuthRegisterRequest;
use App\Models\User;
use App\Traits\JsonApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class SessionController extends Controller
{
    use JsonApiResponse;

    public function verify(AuthLoginRequest $request)
    {
        $credentials = $request->validated();

        try {
            if (Auth::attempt($credentials)) {
                if (Auth::user()->status === "active") {
                    $user = Auth::user();
                    $token = $user->createToken('token')->plainTextToken;

                    return $this->success(["name" => $user->name, "email" => $user->email, "token" => $token], "Berhasil login", 200);
                }
                return $this->error("login failed", "Email belum di verifikasi", 401);
            }
            return $this->error("login failed", "Email atau password salah!", 401);
        } catch (\Exception $e) {
            Log::error("error : " . $e->getMessage());
            return $this->error($e->getMessage(), "Login gagal");
        }
    }

    public function register(AuthRegisterRequest $request)
    {
        $credentials = $request->validated();
        try {
            $user = User::create($credentials);

            return $this->success("", "Registrasi berhasil! Silahkan silahkan masukan code OTP.", 200);
        } catch (\Exception $e) {
            Log::error("error : " . $e->getMessage());
            return $this->error($e->getMessage(), "Request gagal");
        }
    }


    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return $this->success("", "Berhasil log out");
        } catch (\Exception $e) {
            Log::error("error : " . $e->getMessage());
            return $this->error($e->getMessage(), "Request gagal");
        }
    }
}
