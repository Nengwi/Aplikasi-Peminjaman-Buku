<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Books/Index', [
            'books' => \App\Models\Book::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Books/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required',
            'penulis' => 'required',
            'penerbit' => 'required',
            'tahun_terbit' => 'required|numeric',
            'stok' => 'required|numeric',
        ]);

        Book::create($request->all());

        return redirect()->route('books.index')->with('message', 'Buku berhasil ditambahkan!');
    }

    // Menampilkan halaman form edit
    public function edit(Book $book)
    {
        return Inertia::render('Admin/Books/Edit', [
            'book' => $book
        ]);
    }

    // Memproses perubahan data
    public function update(Request $request, Book $book)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'penulis' => 'required|string|max:255',
            'penerbit' => 'required|string|max:255',
            'tahun_terbit' => 'required|numeric',
            'stok' => 'required|numeric',
        ]);

        $book->update($request->all());

        return redirect()->route('books.index')->with('message', 'Data buku berhasil diperbarui!');
    }

    // Menghapus data buku
    public function destroy(Book $book)
    {
        $book->delete();

        return redirect()->route('books.index')->with('message', 'Buku telah dihapus dari koleksi.');
    }
}
