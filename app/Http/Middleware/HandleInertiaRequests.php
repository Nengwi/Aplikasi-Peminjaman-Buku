<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root view that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            
            // Data Authenticated User
            'auth' => [
                'user' => $request->user() ? [
                    'id'    => $request->user()->id,
                    'name'  => $request->user()->name,
                    'email' => $request->user()->email,
                    'role'  => $request->user()->role, // Role string manual (misal: 'admin', 'user')
                    
                    // Jika kamu pakai Spatie Laravel Permission
                    'roles' => method_exists($request->user(), 'getRoleNames') 
                               ? $request->user()->getRoleNames() 
                               : [], 
                    'permissions' => method_exists($request->user(), 'getAllPermissions')
                                     ? $request->user()->getAllPermissions()->pluck('name')
                                     : [],
                ] : null,
            ],

            // Flash Messages (Pesan Kilat)
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'success' => fn () => $request->session()->get('success'),
                'error'   => fn () => $request->session()->get('error'),
                'warning' => fn () => $request->session()->get('warning'),
            ],

            // Ziggy (Opsional: Jika kamu ingin menggunakan route() di React)
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}