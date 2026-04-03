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
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

// Halaman depan (Welcome)
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
    
    /**
     * DASHBOARD DENGAN PROTEKSI
     * Hanya Admin yang bisa melihat statistik ini.
     * Siswa/User biasa akan otomatis ditendang ke halaman /books.
     */
    Route::get('/dashboard', function () {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // LOGIKA PROTEKSI: Jika bukan admin, arahkan ke daftar buku
        if ($user->email !== 'admin@gmail.com' && !$user->hasRole('admin')) {
            return redirect()->route('books.index');
        }

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

    /**
     * PROFILE
     * Bisa diakses oleh semua user (Admin & Siswa)
     */
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    /**
     * DATA BUKU
     * BookController sudah kita setting untuk menampilkan:
     * - Tabel (Admin)
     * - Katalog/Cards (User/Siswa)
     */
    Route::resource('books', BookController::class);

    /**
     * MENU KHUSUS ADMIN
     * Transaksi, Kelola User, dan Laporan hanya untuk admin.
     */
    Route::middleware(['role:admin'])->group(function () {
        Route::resource('transactions', TransactionController::class);
        Route::resource('users', UserController::class);
        Route::get('/reports', [TransactionController::class, 'report'])->name('reports.index');
    });
});

require __DIR__.'/auth.php';