<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\StoryVideoController;
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
    return response()->json([
        'config' => $config,
        'env_db_host_set' => !empty(env('DB_HOST')),
        'env_db_uri_set' => !empty(env('DB_URI')),
    ]);
});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/featured', [ProductController::class, 'featured']);
Route::get('/products/filters', [ProductController::class, 'filters']);
Route::get('/products/{id}', [ProductController::class, 'show']);

Route::get('/story-videos', [StoryVideoController::class, 'index']);

Route::middleware('admin')->group(function () {
    Route::get('/admin/ping', function () {
        return response()->json(['ok' => true]);
    });

    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    Route::post('/story-videos', [StoryVideoController::class, 'store']);
    Route::delete('/story-videos/{id}', [StoryVideoController::class, 'destroy']);
});
