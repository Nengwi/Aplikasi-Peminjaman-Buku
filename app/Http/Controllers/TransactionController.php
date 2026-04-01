<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Book;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Admin/Transactions/Index', [
            'transactions' => Transaction::with(['user', 'book'])
                ->when($request->search, function ($query, $search) {
                    $query->whereHas('user', function($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    })->orWhereHas('book', function($q) use ($search) {
                        $q->where('judul', 'like', "%{$search}%");
                    });
                })
                ->latest()
                ->get(),
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Transactions/Create', [
            'users' => User::all(),
            'books' => Book::where('stok', '>', 0)->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'user_id' => 'required|exists:users,id',
            'tanggal_pinjam' => 'required|date',
        ]);

        // PERBAIKAN DI SINI: Pakai $request->book_id
        $book = Book::find($request->book_id);

        if ($book->stok <= 0) {
            return back()->with('error', 'Stok buku habis!');
        }

        Transaction::create([
            'user_id' => $request->user_id,
            'book_id' => $request->book_id,
            'tanggal_pinjam' => $request->tanggal_pinjam,
            'status' => 'pinjam'
        ]);

        $book->decrement('stok');

        return redirect()->route('transactions.index')->with('message', 'Peminjaman berhasil dicatat!');
    }

    // TAMBAHKAN INI: Untuk fitur KEMBALIKAN BUKU
    public function update(Transaction $transaction)
    {
        $transaction->update([
            'status' => 'kembali',
            'tanggal_kembali' => now()
        ]);

        // Tambah stok buku lagi
        $transaction->book->increment('stok');

        return back()->with('message', 'Buku telah dikembalikan!');
    }
}