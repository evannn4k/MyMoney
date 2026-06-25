<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AuthLoginRequest;
use App\Http\Requests\Auth\AuthRegisterRequest;
use App\Http\Requests\Auth\OtpRequest;
use App\Mail\SendOTPNotification;
use App\Models\OTP;
use App\Models\User;
use App\Traits\JsonApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

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
            $user = User::whereEmail($credentials["email"])->first();
            if ($user && $user->status === "pending") {
                $otp = OTP::query()->where("user_id", "=", $user->id)->first();
                $url = $otp->url;
                return $this->success(['url' => $url], "Registrasi berhasil! silahkan verifikasi email anda!", 200);
            }

            if ($user && $user->status === "active") {
                return $this->error("", "Email sudah dipakai");
            }

            $code = rand(100000, 999999);

            $p1 = Str::upper(Str::random(4));
            $p2 = Str::upper(Str::random(4));
            $p3 = Str::upper(Str::random(4));
            $p4 = Str::upper(Str::random(4));
            $p5 = Str::upper(Str::random(4));

            $url = "{$p1}-{$p2}-{$p3}-{$p4}-{$p5}";

            $user = User::create($credentials);
            // dd($user->id);
            $otp = OTP::create(['user_id' => $user->id, 'otp' => $code, 'url' => $url]);

            Mail::to($credentials["email"])->send(new SendOTPNotification($code));

            return $this->success(['url' => $url], "Registrasi berhasil! silahkan verifikasi email anda!", 200);
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

    public function otp(OtpRequest $request)
    {
        $credentials = $request->validated();

        try {
            $otp = OTP::query()->where('url', '=', $credentials['url'])->first();

            if (!$otp) {
                return $this->error('', "Code OTP tidak ditemukan", 404);
            }

            // dd($otp->otp . " - " . $credentials['otp']);

            if ($otp->otp != $credentials['otp']) {
                return $this->error('', "Code OTP salah", 404);
            }

            // return $this->error('', "error logika woiii", 404);

            $email = DB::transaction(function () use ($otp) {
                $user = User::findOrFail($otp->user_id);
                $user->update(['status' => 'active', 'email_verified_at' => now()]);

                $otp->delete();

                return $user->email;
            });

            return $this->success(['email' => $email], "Berhasil memverifikasi akun, silahkan login", 201);
        } catch (\Exception $e) {
            Log::error("error : " . $e->getMessage());
            return $this->error($e->getMessage(), "Request gagal");
        }
    }

    public function getOtpData($url)
    {
        try {
            $otp = OTP::query()->where('url', '=', $url)->first();

            if (!$otp) {
                return $this->error("", "Url tidak valid", 404);
            }

            $user = User::query()->where('id', '=', $otp->user_id)->first();

            return $this->success(["email" => $user->email], "Url valid", 200);
        } catch (\Exception $e) {
            Log::error("error : " . $e->getMessage());
            return $this->error($e->getMessage(), "Request gagal");
        }
    }
}
