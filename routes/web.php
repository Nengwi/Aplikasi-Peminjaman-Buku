<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BookController; 
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Models\Book;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
// Import Spatie Models untuk Route Perbaikan
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Grup Route untuk User yang sudah Login
Route::middleware(['auth', 'verified'])->group(function () {
    
    // DASHBOARD DENGAN STATISTIK
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'stats' => [
                'total_buku'    => Book::sum('stok'),
                'pinjam_aktif'  => Transaction::where('status', 'pinjam')->count(),
                'total_siswa'   => User::count(), 
                'total_denda'   => Transaction::sum('denda') ?? 0,
            ],
            'recent_transactions' => Transaction::with(['user', 'book'])->latest()->limit(5)->get()
        ]);
    })->name('dashboard');

    // PROFILE
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // RESOURCE ROUTES
    Route::resource('books', BookController::class);
    Route::resource('transactions', TransactionController::class);
    Route::resource('users', UserController::class);
    
    // ROUTE LAPORAN
    Route::get('/reports', [TransactionController::class, 'report'])->name('reports.index');
});

// ============================================================
// ROUTE PERBAIKAN DATABASE (Jalankan sekali di browser)
// ============================================================
Route::get('/fix-permission', function () {
    // 1. Pastikan Role Admin & User ada
    $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
    Role::firstOrCreate(['name' => 'user', 'guard_name' => 'web']);

    // 2. Daftar kunci (permissions) yang wajib ada
    $permissions = ['kelola buku', 'transaksi', 'kelola anggota', 'laporan'];

    foreach ($permissions as $p) {
        Permission::firstOrCreate(['name' => $p, 'guard_name' => 'web']);
    }

    // 3. Kasih SEMUA kunci ke Admin
    $adminRole->syncPermissions(Permission::all());

    // 4. Tempelkan role ke user kamu
    $user = User::where('name', 'dwi admin')->first();
    if ($user) {
        $user->assignRole($adminRole);
        return "Mantap Dwi! Tabel permissions sudah terisi. Logout & Login lagi ya!";
    }

    return "User 'dwi admin' gak ketemu di database, cek namanya!";
});

require __DIR__.'/auth.php';