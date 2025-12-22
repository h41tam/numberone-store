<?php

use Cloudinary\Cloudinary;

function cloudinaryUpload($file, $folder = 'products', $resourceType = 'auto')
{
    $cloudName = env('CLOUDINARY_CLOUD_NAME') ?: env('CLOUDINARY_NAME') ?: getenv('CLOUDINARY_CLOUD_NAME') ?: getenv('CLOUDINARY_NAME');
    $apiKey = env('CLOUDINARY_API_KEY') ?: env('CLOUDINARY_KEY') ?: getenv('CLOUDINARY_API_KEY') ?: getenv('CLOUDINARY_KEY');
    $apiSecret = env('CLOUDINARY_API_SECRET') ?: env('CLOUDINARY_SECRET') ?: getenv('CLOUDINARY_API_SECRET') ?: getenv('CLOUDINARY_SECRET');

    $cloudinary = new Cloudinary([
        'cloud' => [
            'cloud_name' => $cloudName,
            'api_key' => $apiKey,
            'api_secret' => $apiSecret,
        ],
        'url' => ['secure' => true],
    ]);

    return $cloudinary->uploadApi()->upload(
        $file->getRealPath(),
        [
            'folder' => $folder,
            'resource_type' => $resourceType,
        ]
    );
}

function cloudinaryDestroy($publicId)
{
    $cloudName = env('CLOUDINARY_CLOUD_NAME') ?: env('CLOUDINARY_NAME') ?: getenv('CLOUDINARY_CLOUD_NAME') ?: getenv('CLOUDINARY_NAME');
    $apiKey = env('CLOUDINARY_API_KEY') ?: env('CLOUDINARY_KEY') ?: getenv('CLOUDINARY_API_KEY') ?: getenv('CLOUDINARY_KEY');
    $apiSecret = env('CLOUDINARY_API_SECRET') ?: env('CLOUDINARY_SECRET') ?: getenv('CLOUDINARY_API_SECRET') ?: getenv('CLOUDINARY_SECRET');

    $cloudinary = new Cloudinary([
        'cloud' => [
            'cloud_name' => $cloudName,
            'api_key' => $apiKey,
            'api_secret' => $apiSecret,
        ],
        'url' => ['secure' => true],
    ]);
    return $cloudinary->uploadApi()->destroy($publicId, ['invalidate' => true]);
}
