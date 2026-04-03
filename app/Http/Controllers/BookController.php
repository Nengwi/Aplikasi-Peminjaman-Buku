<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class BookController extends Controller
{
    /**
     * Menampilkan daftar buku (Tabel untuk Admin, Grid untuk User)
     */
    public function index(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        
        // Logika Admin: Cek Role Spatie ATAU Email khusus
        $isAdmin = $user && ($user->hasRole('admin') || $user->email === 'admin@gmail.com');

        $books = Book::query()
            ->when($request->search, function ($query, $search) {
                $query->where('judul', 'like', "%{$search}%")
                    ->orWhere('penulis', 'like', "%{$search}%");
            })
            ->latest()
            ->get();

        // 1. Tampilan untuk ADMIN (Folder Admin - View Tabel)
        if ($isAdmin) {
            return Inertia::render('Admin/Books/Index', [
                'books' => $books,
                'filters' => $request->only(['search']),
                'can_manage' => true
            ]);
        }

        // 2. Tampilan untuk USER/SISWA (Folder User - View Kartu/Grid)
        return Inertia::render('User/Books/Index', [
            'books' => $books
        ]);
    }

    /**
     * Halaman Tambah Buku (Hanya Admin)
     */
    public function create()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!$user->hasRole('admin') && $user->email !== 'admin@gmail.com') {
            return redirect()->route('books.index');
        }

        return Inertia::render('Admin/Books/Create');
    }

    /**
     * Simpan Buku Baru (Hanya Admin)
     */
    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'penulis' => 'required|string|max:255',
            'penerbit' => 'required|string|max:255',
            'tahun_terbit' => 'required|numeric',
            'stok' => 'required|numeric',
        ]);

        Book::create($request->all());

        return redirect()->route('books.index')->with('message', 'Buku berhasil ditambahkan!');
    }

    /**
     * Halaman Edit Buku (Hanya Admin)
     */
    public function edit(Book $book)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!$user->hasRole('admin') && $user->email !== 'admin@gmail.com') {
            return redirect()->route('books.index');
        }

        return Inertia::render('Admin/Books/Edit', [
            'book' => $book
        ]);
    }

    /**
     * Update Data Buku (Hanya Admin)
     */
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

    /**
     * Hapus Buku (Hanya Admin)
     */
    public function destroy(Book $book)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!$user->hasRole('admin') && $user->email !== 'admin@gmail.com') {
            return redirect()->route('books.index');
        }

        $book->delete();

        return redirect()->route('books.index')->with('message', 'Buku telah dihapus dari koleksi.');
    }
}