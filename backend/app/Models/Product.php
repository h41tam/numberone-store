<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Product extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'products';

    protected $fillable = [
        'name',
        'price',
        'image',
        'image_public_id',
        'description',
        'colors',
        'sizes',
        'sex',
        'stock',
        'category',
        'is_featured',
    ];

    protected $casts = [
        'price' => 'int',
        'stock' => 'int',
        'colors' => 'array',
        'sizes' => 'array',
        'is_featured' => 'bool',
    ];

    protected $hidden = ['_id'];

    protected $appends = ['id'];

    public function getIdAttribute($value = null)
    {
        if ($value !== null) {
            return (string) $value;
        }

        $raw = $this->getAttribute('_id');

        if ($raw === null) {
            return null;
        }

        return (string) $raw;
    }
}
