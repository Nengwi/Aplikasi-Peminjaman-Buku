<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    /**
     
     */
    protected $fillable = [
        'judul',
        'penulis',
        'penerbit',
        'tahun_terbit',
        'stok',
        'kategori,'
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