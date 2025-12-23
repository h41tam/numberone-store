<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        $products = Product::query()->get()->map(function (Product $product) {
            return [
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
                'is_featured' => $product->is_featured,
            ];
        });

        return response()->json($products);
    }

    public function featured(): JsonResponse
    {
        $products = Product::query()
            ->where('is_featured', true)
            ->limit(4)
            ->get()
            ->map(function (Product $product) {
                return [
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
                    'is_featured' => $product->is_featured,
                ];
            });

        return response()->json($products);
    }

    public function latest(): JsonResponse
    {
        $products = Product::query()
            ->where('is_featured', '!=', true)
            ->orderBy('_id', 'desc')
            ->limit(4)
            ->get()
            ->map(function (Product $product) {
                return [
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
                    'is_featured' => $product->is_featured,
                ];
            });

        return response()->json($products);
    }

    public function show(string $id): JsonResponse
    {
        $product = Product::query()->find($id);

        if (! $product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json([
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
            'is_featured' => $product->is_featured,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'image' => 'required|file|mimetypes:image/*',
            'description' => 'nullable|string',
            'colors' => 'nullable|string',
            'sizes' => 'nullable|string',
            'sex' => 'nullable|string',
            'stock' => 'nullable|integer|min:0',
            'category' => 'nullable|string',
            'is_featured' => 'nullable|boolean',
        ]);
        $data = $request->only([
            'name',
            'price',
            'description',
            'colors',
            'sizes',
            'sex',
            'stock',
            'category',
            'is_featured',
        ]);

        if ($request->hasFile('image')) {
            try {
                $upload = cloudinaryUpload($request->file('image'), 'products', 'image');
                $data['image'] = $upload['secure_url'];
                if (isset($upload['public_id'])) {
                    $data['image_public_id'] = $upload['public_id'];
                }
            } catch (\Throwable $e) {
                return response()->json(['message' => 'Image upload failed'], 422);
            }
        }

        if (isset($data['colors']) && is_string($data['colors'])) {
            $data['colors'] = array_values(array_filter(array_map('trim', explode(',', $data['colors']))));
        }

        if (isset($data['sizes']) && is_string($data['sizes'])) {
            $data['sizes'] = array_values(array_filter(array_map('trim', explode(',', $data['sizes']))));
        }

        $product = Product::query()->create($data);

        return response()->json([
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
            'is_featured' => $product->is_featured,
        ], 201);
    }

    public function filters(): JsonResponse
    {
        $categories = Product::query()
            ->pluck('category')
            ->filter()
            ->unique()
            ->values()
            ->all();

        $sexes = Product::query()
            ->pluck('sex')
            ->filter()
            ->unique()
            ->values()
            ->all();

        return response()->json([
            'categories' => $categories,
            'sexes' => $sexes,
        ]);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $product = Product::query()->find($id);

        if (! $product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $request->validate([
            'name' => 'nullable|string|max:255',
            'price' => 'nullable|numeric|min:0',
            'image' => 'nullable|file|mimetypes:image/*',
            'description' => 'nullable|string',
            'colors' => 'nullable|string',
            'sizes' => 'nullable|string',
            'sex' => 'nullable|string',
            'stock' => 'nullable|integer|min:0',
            'category' => 'nullable|string',
            'is_featured' => 'nullable|boolean',
        ]);
        $data = $request->only([
            'name',
            'price',
            'description',
            'colors',
            'sizes',
            'sex',
            'stock',
            'category',
            'is_featured',
        ]);

        if ($request->hasFile('image')) {
            try {
                $upload = cloudinaryUpload($request->file('image'), 'products', 'image');
                $data['image'] = $upload['secure_url'];
                if (isset($upload['public_id'])) {
                    $data['image_public_id'] = $upload['public_id'];
                }
            } catch (\Throwable $e) {
                return response()->json(['message' => 'Image upload failed'], 422);
            }
        }

        if (isset($data['colors']) && is_string($data['colors'])) {
            $data['colors'] = array_values(array_filter(array_map('trim', explode(' ', $data['colors']))));
        }

        if (isset($data['sizes']) && is_string($data['sizes'])) {
            $data['sizes'] = array_values(array_filter(array_map('trim', explode(' ', $data['sizes']))));
        }

        $product->fill($data);
        $product->save();

        return response()->json([
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
            'is_featured' => $product->is_featured,
        ]);
    }

    public function destroy(string $id): JsonResponse
    {
        $product = Product::query()->find($id);

        if (! $product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        if ($product->image_public_id) {
            cloudinaryDestroy($product->image_public_id);
        }

        $product->delete();

        return response()->json([], 204);
    }
}
