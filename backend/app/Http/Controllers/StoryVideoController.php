<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StoryVideo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StoryVideoController extends Controller
{
    public function index(): JsonResponse
    {
        $entries = StoryVideo::query()->latest()->get()->map(function (StoryVideo $story) {
            $product = Product::query()->find($story->product_id);

            $image = null;

            if ($product && $product->image) {
                $value = $product->image;

                if (str_starts_with($value, 'http://') || str_starts_with($value, 'https://')) {
                    $image = $value;
                } else {
                    $path = $value;

                    if (str_starts_with($value, '/storage/')) {
                        $path = ltrim(substr($value, 9), '/');
                    }

                    $image = Storage::disk('public')->url($path);
                }
            }

            return [
                'id' => (string) $story->_id,
                'video_url' => Storage::disk('public')->url($story->video_path),
                'product' => $product ? [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'image' => $image,
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

        $path = $request->file('video')->store('story_videos', 'public');

        $story = StoryVideo::query()->create([
            'product_id' => $product->id,
            'video_path' => $path,
        ]);

        return response()->json([
            'id' => (string) $story->_id,
            'video_url' => Storage::disk('public')->url($story->video_path),
            'product_id' => $product->id,
        ], 201);
    }

    public function destroy(string $id): JsonResponse
    {
        $story = StoryVideo::query()->find($id);

        if (! $story) {
            return response()->json(['message' => 'Story video not found'], 404);
        }

        if ($story->video_path) {
            Storage::disk('public')->delete($story->video_path);
        }

        $story->delete();

        return response()->json([], 204);
    }
}
