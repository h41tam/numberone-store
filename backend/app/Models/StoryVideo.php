<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class StoryVideo extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'story_videos';

    protected $fillable = [
        'product_id',
        'video_url',
        'video_public_id',
    ];
}
