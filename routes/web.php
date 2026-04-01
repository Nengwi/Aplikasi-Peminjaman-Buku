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
                'total_siswa'   => User::count(), // Sesuaikan jika nanti ada logic role
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
    
    // ROUTE LAPORAN (Tambahkan ini agar menu laporan bisa diakses)
    Route::get('/reports', [TransactionController::class, 'report'])->name('reports.index');
});

require __DIR__.'/auth.php';