<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use App\Models\Wallet;
use App\Traits\JsonApiResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    use JsonApiResponse;
    protected object $user;

    public function __construct(protected Transaction $model)
    {
        $this->user = auth('sanctum')->user();
    }

    public function dashboard()
    {
        try {
            $monthlyExpenses = Transaction::whereHas('category', function ($query) {
                $query->where("type", "expense");
            })
                ->where('date', ">=", Carbon::now()->subMonth())
                ->where('user_id', "=", $this->user->id)
                ->sum('amount');

            $monthlyIncome = Transaction::whereHas('category', function ($query) {
                $query->where("type", "income");
            })
                ->where('date', ">=", Carbon::now()->subMonth())
                ->where('user_id', "=", $this->user->id)
                ->sum('amount');
            $totalBalance = Wallet::query()->where("user_id", $this->user->id)->sum('balance');
            $lastTenTransactions =  $this->model->query()->where("user_id", $this->user->id)->limit(10)->orderByDesc('date')->get();

            $data = [
                "monthlyExpenses" => $monthlyExpenses,
                "monthlyIncome" => $monthlyIncome,
                "totalBalance" => $totalBalance,
                "lastTenTransactions" => TransactionResource::collection($lastTenTransactions)->resolve(),
            ];

            return $this->success($data, "Berhasil mendapatkan data!");
        } catch (\Exception $e) {
            Log::error("error : " . $e->getMessage());
            return $this->error($e->getMessage(), "Request gagal");
        }
    }
}
