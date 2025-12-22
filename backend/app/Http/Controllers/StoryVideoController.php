<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StoryVideo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StoryVideoController extends Controller
{
    public function index(): JsonResponse
    {
        $entries = StoryVideo::query()->latest()->get()->map(function (StoryVideo $story) {
            $product = Product::query()->find($story->product_id);

            return [
                'id' => (string) $story->_id,
                'video_url' => $story->video_url,
                'product' => $product ? [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'image' => $product->image,
                    'description' => $product->description,
                    'colors' => $product->colors,
                    'sizes' => $product->sizes,
                    'sex' => $product->sex,
                    'stock' => $product->stock,
                    'category' => $product->category,
                ] : null,
            ];
        });

        return response()->json($entries);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_id' => ['required', 'string'],
            'video' => ['required', 'file', 'mimetypes:video/mp4,video/quicktime,video/webm'],
        ]);

        $product = Product::query()->find($validated['product_id']);

        if (! $product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $payload = ['product_id' => $product->id];

        try {
            $upload = cloudinaryUpload($request->file('video'), 'story_videos');
            $payload['video_url'] = $upload['secure_url'] ?? null;
            $payload['video_public_id'] = $upload['public_id'] ?? null;
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Video upload failed'], 422);
        }

        $story = StoryVideo::query()->create($payload);

        return response()->json([
            'id' => (string) $story->_id,
            'video_url' => $story->video_url,
            'product_id' => $product->id,
        ], 201);
    }

    public function destroy(string $id): JsonResponse
    {
        $story = StoryVideo::query()->find($id);

        if (! $story) {
            return response()->json(['message' => 'Story video not found'], 404);
        }

        if ($story->video_public_id) {
            cloudinaryDestroy($story->video_public_id);
        }

        $story->delete();

        return response()->json([], 204);
    }
}
