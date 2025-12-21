<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        $username = (string) env('ADMIN_USERNAME', '');
        $password = (string) env('ADMIN_PASSWORD', '');

        if ($username === '' || $password === '') {
            return response()->json([
                'message' => 'Admin credentials are not configured.',
            ], 500);
        }

        $providedUser = $request->getUser();
        $providedPass = $request->getPassword();

        if ($providedUser !== $username || $providedPass !== $password) {
            return response('Unauthorized', 401, [
                'WWW-Authenticate' => 'Basic realm="Admin Area"',
            ]);
        }

        return $next($request);
    }
}

