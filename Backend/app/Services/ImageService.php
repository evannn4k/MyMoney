<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageService
{
    protected $dir = "images/";
    /**
     * Create a new class instance.
     */
    public function save($image, $path)
    {
        $extension = $image->getClientOriginalExtension();
        $filename = time() . Str::random(6) . "." . $extension;

        $image->storeAs($this->dir . $path, $filename);

        return $filename;
    }

    public function update($oldImage, $image, $path)
    {
        Storage::delete($this->dir . $path . $oldImage);

        $extension = $image->extension();
        $filename = time() . Str::random(6) . "." . $extension;

        $image->storeAs($this->dir . $path, $filename);

        return $filename;
    }

    public function delete($oldImage, $path)
    {
        Storage::delete($this->dir . $path . $oldImage);
    }
}
