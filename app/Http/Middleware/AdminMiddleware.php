<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth; // Pastikan ini di-import

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // Gunakan Auth::user() dan tambahkan pengecekan null untuk keamanan
        $user = Auth::user();

        if (!$user || $user->role !== 'admin') {
            return redirect('/dashboard')->with('error', 'Akses ditolak!');
        }

        return $next($request);
    }
}