<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Transactions/Index', [
            'transactions' => Transaction::with(['user', 'book'])->latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $book = Book::find($request->id);
        if ($book->stok <= 0) {
            return back()->with('error', 'Stok buku habis!');
        }

        Transaction::create([
            'user_id' => $request->user_id,
            'book_id' => $request->book_id,
            'tanggal_pinjam' => now(),
            'status' => 'pinjam'
        ]);

        $book->decrement('stok'); // Kurangi stok otomatis

        return redirect()->route('transactions.index')->with('message', 'Peminjaman berhasil dicatat!');
    }
}