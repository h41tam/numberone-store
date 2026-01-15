<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\StoryVideoController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\SettingsController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json([
        'status' => 'ok',
        'app' => config('app.name'),
    ]);
});

Route::get('/db-test', function () {
    try {
        DB::connection('mongodb')->command(['ping' => 1]);

        return response()->json([
            'status' => 'ok',
            'connection' => 'mongodb',
            'time' => now()->toIso8601String(),
        ]);
    } catch (\Throwable $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage(),
        ], 500);
    }
});

Route::get('/debug-config', function () {
    $config = config('database.connections.mongodb');
    // Hide credentials
    if (isset($config['dsn'])) {
        $config['dsn'] = 'HIDDEN';
    }
    
    // Get all env keys (not values) for debugging
    $envKeys = array_keys($_ENV);
    $serverKeys = array_keys($_SERVER);
    $allKeys = array_unique(array_merge($envKeys, $serverKeys));
    sort($allKeys);

    return response()->json([
        'config' => $config,
        'env_vars_set' => [
            'DB_HOST' => !empty(env('DB_HOST')),
            'DB_URI' => !empty(env('DB_URI')),
            'MONGODB_URI' => !empty(env('MONGODB_URI')),
            'DB_CONNECTION' => env('DB_CONNECTION'),
            'CLOUDINARY_CLOUD_NAME' => !empty(env('CLOUDINARY_CLOUD_NAME')),
            'CLOUDINARY_API_KEY' => !empty(env('CLOUDINARY_API_KEY')),
            'CLOUDINARY_API_SECRET' => !empty(env('CLOUDINARY_API_SECRET')),
            'CLOUDINARY_NAME' => !empty(env('CLOUDINARY_NAME')),
            'CLOUDINARY_KEY' => !empty(env('CLOUDINARY_KEY')),
            'CLOUDINARY_SECRET' => !empty(env('CLOUDINARY_SECRET')),
        ],
        'getenv_check' => [
            'DB_HOST' => getenv('DB_HOST'),
            'DB_CONNECTION' => getenv('DB_CONNECTION'),
            'CLOUDINARY_CLOUD_NAME' => getenv('CLOUDINARY_CLOUD_NAME'),
            'CLOUDINARY_API_KEY' => getenv('CLOUDINARY_API_KEY'),
            'CLOUDINARY_NAME' => getenv('CLOUDINARY_NAME'),
            'CLOUDINARY_KEY' => getenv('CLOUDINARY_KEY'),
            'CLOUDINARY_SECRET' => getenv('CLOUDINARY_SECRET'),
        ],
        'available_env_keys' => $allKeys,
    ]);
});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/featured', [ProductController::class, 'featured']);
Route::get('/products/latest', [ProductController::class, 'latest']);
Route::get('/products/filters', [ProductController::class, 'filters']);
Route::get('/products/{id}', [ProductController::class, 'show']);

Route::get('/story-videos', [StoryVideoController::class, 'index']);

Route::post('/checkout', [CheckoutController::class, 'checkout']);

Route::get('/settings', [SettingsController::class, 'publicSettings']);

Route::get('/debug-products', function () {
    $db = config('database.connections.mongodb.database');
    $envDb = env('DB_DATABASE');
    $count = \App\Models\Product::query()->count();
    return response()->json([
        'database_config' => $db,
        'database_env' => $envDb,
        'product_count' => $count,
    ]);
});

Route::middleware('admin')->group(function () {
    Route::get('/admin/ping', function () {
        return response()->json(['ok' => true]);
    });

    Route::get('/admin/settings', [SettingsController::class, 'show']);
    Route::put('/admin/settings', [SettingsController::class, 'update']);

    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    Route::post('/products/featured-set', [ProductController::class, 'setFeatured']);

    Route::post('/story-videos', [StoryVideoController::class, 'store']);
    Route::delete('/story-videos/{id}', [StoryVideoController::class, 'destroy']);
});
