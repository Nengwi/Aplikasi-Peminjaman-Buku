<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BookController; 
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Models\Book;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::middleware(['auth', 'verified'])->group(function () {
    
    // ==========================================
    // DASHBOARD (Pemisah Admin & Siswa)
    // ==========================================
    Route::get('/dashboard', function () {
        $user = Auth::user();
        $isAdmin = $user->role === 'admin' || $user->email === 'admin@gmail.com';

        if ($isAdmin) {
            return Inertia::render('Dashboard', [
                'stats' => [
                    'total_buku'    => (int) Book::sum('stok'),
                    'pinjam_aktif'  => Transaction::where('status', 'pinjam')->count(),
                    'total_siswa'   => User::where('role', '!=', 'admin')->count(), 
                    'total_denda'   => (int) Transaction::where('status', 'kembali')->sum('denda'),
                ],
                'recent_transactions' => Transaction::with(['user', 'book'])->latest()->limit(5)->get()
            ]);
        }

        // HALAMAN HOME SISWA (File: User/Index.jsx)
        return Inertia::render('User/Index', [
            'user' => $user,
            'my_stats' => [
                'sedang_pinjam' => Transaction::where('user_id', $user->id)->where('status', 'pinjam')->count(),
            ]
        ]);
    })->name('dashboard');

    // ==========================================
    // BOOKS (Katalog & CRUD)
    // ==========================================
    Route::resource('books', BookController::class);

    // ==========================================
    // TRANSAKSI & LAPORAN
    // ==========================================
    
    // Route untuk Siswa
    Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');
    Route::get('/my-history', [TransactionController::class, 'userHistory'])->name('transactions.history');
    
    // Route untuk Admin
    Route::get('/admin/transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::patch('/transactions/{transaction}', [TransactionController::class, 'update'])->name('transactions.update');
    
    // INI YANG TADI KURANG: Route Laporan untuk Admin
    Route::get('/reports', [TransactionController::class, 'report'])->name('reports.index');

    // ==========================================
    // PROFILE & USERS MANAGEMENT
    // ==========================================
    Route::resource('users', UserController::class);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';