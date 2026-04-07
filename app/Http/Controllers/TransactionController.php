<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Book;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TransactionController extends Controller
{
    /**
     * Menampilkan daftar transaksi untuk Admin
     */
    public function index(Request $request)
    {
        $transactions = Transaction::with(['user', 'book'])
            ->when($request->search, function ($query, $search) {
                $query->whereHas('user', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                })->orWhereHas('book', function ($q) use ($search) {
                    $q->where('judul', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->get();

        return Inertia::render('Admin/Transactions/Index', [
            'transactions' => $transactions,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Proses Simpan Peminjaman (Oleh User/Siswa)
     */
    public function store(Request $request)
    {
        // 1. Validasi Input
        $request->validate([
            'book_id' => 'required|exists:books,id',
        ]);

        try {
            $book = Book::findOrFail($request->book_id);
            $userId = Auth::id();

            // 2. Cek Login - Penting agar data tidak NULL
            if (!$userId) {
                return back()->withErrors(['error' => 'Sesi login habis, silakan login kembali.']);
            }

            // 3. Cek Stok
            if ($book->stok <= 0) {
                return back()->withErrors(['error' => 'Maaf, stok buku ini sedang habis.']);
            }

            // 4. Cek apakah user sedang meminjam buku yang sama & belum dikembalikan
            $isBorrowing = Transaction::where('user_id', $userId)
                ->where('book_id', $book->id)
                ->where('status', 'pinjam')
                ->exists();

            if ($isBorrowing) {
                return back()->withErrors(['error' => 'Kamu masih meminjam buku ini!']);
            }

            // 5. Eksekusi Simpan
            Transaction::create([
                'user_id'        => $userId,
                'book_id'        => $book->id,
                'tanggal_pinjam' => now()->format('Y-m-d'),
                'status'         => 'pinjam',
                'denda'          => 0
            ]);

            // 6. Kurangi stok buku
            $book->decrement('stok');

         return back()->with('message', "Berhasil meminjam buku {$book->judul}!");
            
        } catch (\Exception $e) {
            Log::error("Gagal Simpan Transaksi: " . $e->getMessage());
            return back()->withErrors(['error' => 'Gagal memproses peminjaman.']);
        }
    }

    /**
     * Proses Pengembalian Buku (Oleh Admin)
     */
    public function update(Transaction $transaction)
    {
        if ($transaction->status === 'kembali') {
            return back()->withErrors(['error' => 'Buku ini sudah berstatus kembali.']);
        }

        try {
            $tanggalPinjam = Carbon::parse($transaction->tanggal_pinjam);
            $hariIni = now()->startOfDay(); 
            $selisihHari = (int) $hariIni->diffInDays($tanggalPinjam);

            $denda = 0;
            $keterlambatan = 0;

            // Logika: Batas pinjam 7 hari, denda 1000/hari
            if ($selisihHari > 7) {
                $keterlambatan = $selisihHari - 7;
                $denda = $keterlambatan * 1000;
            }

            $transaction->update([
                'status' => 'kembali',
                'tanggal_kembali' => now()->format('Y-m-d'),
                'denda' => $denda
            ]);

            // Kembalikan stok buku
            $transaction->book()->increment('stok');

            $pesan = $denda > 0
                ? "Buku kembali! Terlambat {$keterlambatan} hari. Denda: Rp " . number_format($denda, 0, ',', '.')
                : "Buku kembali tepat waktu!";

            return back()->with('message', $pesan);

        } catch (\Exception $e) {
            Log::error("Gagal Update Transaksi: " . $e->getMessage());
            return back()->withErrors(['error' => 'Gagal memproses pengembalian.']);
        }
    }

    /**
     * Laporan Transaksi
     */
    public function report()
    {
        $reports = Transaction::with(['user', 'book'])
            ->where('status', 'kembali')
            ->latest()
            ->get();

        $total_pendapatan = Transaction::where('status', 'kembali')->sum('denda');

        return Inertia::render('Admin/Reports/Index', [
            'reports' => $reports,
            'total_pendapatan' => (int) $total_pendapatan
        ]);
    }

    /**
     * Riwayat Peminjaman User (Halaman User)
     */
    public function userHistory()
    {
        $history = Transaction::with(['book'])
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('User/Transactions/History', [
            'history' => $history
        ]);
    }
}