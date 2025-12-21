<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Golden Gown',
                'price' => 1200,
                'image' => '/images/gown.jpg',
                'description' => 'Luxury evening gown',
                'colors' => ['Gold', 'Black'],
                'sizes' => ['S', 'M', 'L'],
                'sex' => 'female',
                'stock' => 0,
                'category' => 'Dress',
                'is_featured' => true,
            ],
            [
                'name' => 'Classic-Shirt',
                'price' => 800,
                'image' => '/images/shirt.jpg',
                'description' => 'Classic white shirt',
                'colors' => ['White'],
                'sizes' => ['S', 'M', 'L'],
                'sex' => 'male',
                'stock' => 5,
                'category' => 'Shirt',
                'is_featured' => true,
            ],
            [
                'name' => 'Elegant-Pants',
                'price' => 1000,
                'image' => '/images/pants.jpg',
                'description' => 'Elegant black pants',
                'colors' => ['Black'],
                'sizes' => ['S', 'M', 'L'],
                'sex' => 'male',
                'stock' => 3,
                'category' => 'Pants',
                'is_featured' => true,
            ],
            [
                'name' => 'Stylish-Skirt',
                'price' => 900,
                'image' => '/images/skirt.jpg',
                'description' => 'Stylish pink skirt',
                'colors' => ['Pink'],
                'sizes' => ['S', 'M', 'L', 'XL'],
                'sex' => 'female',
                'stock' => 2,
                'category' => 'Skirt',
                'is_featured' => true,
            ],
        ];

        foreach ($products as $data) {
            Product::query()->updateOrCreate(
                ['name' => $data['name']],
                $data
            );
        }
    }
}
