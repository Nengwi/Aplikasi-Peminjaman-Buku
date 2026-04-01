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
            'books' => Book::all()
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
}