<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class AppSetting extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'settings';

    protected $fillable = [
        'key',
        'value',
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

