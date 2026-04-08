<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    /**
     * Atribut yang dapat diisi secara massal.
     * Ditambahkan 'rak' agar admin bisa mengatur lokasi buku.
     */
    protected $fillable = [
        'category_id',
        'judul',
        'penulis',
        'penerbit',
        'tahun_terbit',
        'stok',
        'kategori',
        'rak', 
    ];

    /**
     * Relasi ke model Transaction.
     * Satu buku bisa memiliki banyak transaksi peminjaman.
     */
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}