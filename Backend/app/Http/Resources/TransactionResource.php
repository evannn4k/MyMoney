<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "user_id" => $this->user_id,
            "wallet_id" => $this->wallet->id,
            "wallet" => $this->wallet->name,
            "category_id" => $this->category->id,
            "category" => $this->category->name,
            "category_type" => $this->category->type,
            "notes" => $this->notes,
            "date" => $this->date,
            "amount" => $this->amount,
            "receipt_image" => $this->receipt_image,
        ];
    }
}
