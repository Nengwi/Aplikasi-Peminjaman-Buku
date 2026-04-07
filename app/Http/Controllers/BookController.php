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
        
        // Cek Role Admin (Spatie atau Email khusus)
        $isAdmin = $user && ($user->hasRole('admin') || $user->email === 'admin@gmail.com');

        // Logika Pencarian: Bisa mencari judul atau penulis
        $books = Book::query()
            ->when($request->search, function ($query, $search) {
                $query->where(function($q) use ($search) {
                    $q->where('judul', 'like', "%{$search}%")
                      ->orWhere('penulis', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->get();

        // Data yang selalu dikirim ke kedua tampilan
        $commonData = [
            'books' => $books,
            'filters' => $request->only(['search']), // Penting: agar input search di React tidak reset
            'flash' => [
                'message' => session('message'),
                'error' => session('error'),
            ],
        ];

        // 1. Tampilan untuk ADMIN (Tabel)
        if ($isAdmin) {
            return Inertia::render('Admin/Books/Index', $commonData);
        }

        // 2. Tampilan untuk USER/SISWA (Katalog Kartu)
        return Inertia::render('User/Books/Index', $commonData);
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
            'stok' => 'required|numeric|min:0',
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

        return Inertia::render('Admin/Books/Edit', ['book' => $book]);
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
            'stok' => 'required|numeric|min:0',
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
        return redirect()->route('books.index')->with('message', 'Buku telah dihapus.');
    }
}