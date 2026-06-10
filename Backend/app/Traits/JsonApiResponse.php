<?php

namespace App\Traits;

trait JsonApiResponse
{
    public function success($data = [], $message = "", $code = 200) {
        return response()->json([
            "status" => "success",
            "data" => $data,
            "message" => $message,
        ], $code);
    }

    public function error($errors = [], $message = "", $code = 400) {
        return response()->json([
            "status" => "error",
            "message" => $message,
            "errors" => $errors,
        ], $code);
    }
}
