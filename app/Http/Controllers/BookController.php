<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        
        // Logika Admin: Cek Role Spatie ATAU Email Utama
        $canManage = $user && ($user->hasRole('admin') || $user->email === 'admin@gmail.com');

        return Inertia::render('Admin/Books/Index', [
            'books' => Book::query()
                ->when($request->search, function ($query, $search) {
                    $query->where('judul', 'like', "%{$search}%")
                        ->orWhere('penulis', 'like', "%{$search}%");
                })
                ->latest()
                ->get(),
            'filters' => $request->only(['search']),
            'can_manage' => $canManage 
        ]);
    }

    public function create()
    {
        $user = Auth::user();
        if (!$user || ($user->email !== 'admin@gmail.com' && !$user->hasRole('admin'))) {
            return redirect()->route('dashboard');
        }
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

    public function edit(Book $book)
    {
        $user = Auth::user();
        if (!$user || ($user->email !== 'admin@gmail.com' && !$user->hasRole('admin'))) {
            return redirect()->route('books.index');
        }
        return Inertia::render('Admin/Books/Edit', ['book' => $book]);
    }

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

    public function destroy(Book $book)
    {
        $user = Auth::user();
        if (!$user || ($user->email !== 'admin@gmail.com' && !$user->hasRole('admin'))) {
            return redirect()->route('books.index');
        }
        $book->delete();
        return redirect()->route('books.index')->with('message', 'Buku telah dihapus.');
    }
}