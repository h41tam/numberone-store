<?php

use Cloudinary\Cloudinary;

function cloudinaryUpload($file, $folder = 'products')
{
    $cloudinary = new Cloudinary([
        'cloud' => [
            'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
            'api_key' => env('CLOUDINARY_API_KEY'),
            'api_secret' => env('CLOUDINARY_API_SECRET'),
        ],
        'url' => ['secure' => true],
    ]);

    return $cloudinary->uploadApi()->upload(
        $file->getRealPath(),
        [
            'folder' => $folder,
            'resource_type' => 'auto',
        ]
    );
}

function cloudinaryDestroy($publicId)
{
    $cloudinary = new Cloudinary([
        'cloud' => [
            'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
            'api_key' => env('CLOUDINARY_API_KEY'),
            'api_secret' => env('CLOUDINARY_API_SECRET'),
        ],
        'url' => ['secure' => true],
    ]);
    return $cloudinary->uploadApi()->destroy($publicId, ['invalidate' => true]);
}
