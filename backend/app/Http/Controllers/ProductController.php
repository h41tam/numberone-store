<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        $products = Product::query()->get()->map(function (Product $product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'image' => $this->imageUrl($product->image),
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
            ->get()
            ->map(function (Product $product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'image' => $this->imageUrl($product->image),
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
            'image' => $this->imageUrl($product->image),
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
        $data = $request->only([
            'name',
            'price',
            'image',
            'description',
            'colors',
            'sizes',
            'sex',
            'stock',
            'category',
            'is_featured',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $data['image'] = $path;
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
            'image' => $this->imageUrl($product->image),
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

        $data = $request->only([
            'name',
            'price',
            'image',
            'description',
            'colors',
            'sizes',
            'sex',
            'stock',
            'category',
            'is_featured',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $data['image'] = $path;
        }

        if (isset($data['colors']) && is_string($data['colors'])) {
            $data['colors'] = array_values(array_filter(array_map('trim', explode(',', $data['colors']))));
        }

        if (isset($data['sizes']) && is_string($data['sizes'])) {
            $data['sizes'] = array_values(array_filter(array_map('trim', explode(',', $data['sizes']))));
        }

        $product->fill($data);
        $product->save();

        return response()->json([
            'id' => $product->id,
            'name' => $product->name,
            'price' => $product->price,
            'image' => $this->imageUrl($product->image),
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

        $product->delete();

        return response()->json([], 204);
    }

    private function imageUrl(?string $value): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }

        if (str_starts_with($value, 'http://') || str_starts_with($value, 'https://')) {
            return $value;
        }

        $path = $value;

        if (str_starts_with($value, '/storage/')) {
            $path = ltrim(substr($value, 9), '/');
        }

        return Storage::disk('public')->url($path);
    }
}
