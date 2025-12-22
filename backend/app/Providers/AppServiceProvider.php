<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Force set MongoDB config from env if missing in config
        if (config('database.connections.mongodb.driver') === 'mongodb') {
            $host = env('DB_HOST');
            if ($host && !config('database.connections.mongodb.dsn')) {
                 config(['database.connections.mongodb.dsn' => $host]);
            }
        }
    }
}
