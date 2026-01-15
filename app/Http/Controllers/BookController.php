<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = \App\Models\Book::all();
        return view('books.index', compact('books'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
{
    return view('books.create'); // Kita akan buat file ini setelah ini
}

public function store(Request $request)
{
    $request->validate([
        'judul' => 'required',
        'penulis' => 'required',
        'stok' => 'required|numeric',
    ]);

    \App\Models\Book::create($request->all());

    return redirect()->route('books.index')->with('success', 'Buku berhasil ditambah!');
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
