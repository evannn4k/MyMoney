<?php

namespace App\Http\Requests\Transaction;

use Illuminate\Foundation\Http\FormRequest;

class CreateTransctionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "wallet_id" => "required|integer",
            "category_id" => "required|integer",
            "notes" => "nullable|string",
            "date" => "nullable|date",
            "amount" => "required|numeric|min:0",
            "receipt_image" => "nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048",
        ];
    }
}
