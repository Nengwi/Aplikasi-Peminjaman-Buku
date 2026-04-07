<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    // Tambahkan 'denda' ke dalam array ini
    protected $fillable = [
        'user_id', 
        'book_id', 
        'tanggal_pinjam', 
        'tanggal_kembali', 
        'status', 
        'denda'
    ];

    /**
     * Relasi ke User (Siswa yang meminjam)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi ke Book (Buku yang dipinjam)
     */
    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}