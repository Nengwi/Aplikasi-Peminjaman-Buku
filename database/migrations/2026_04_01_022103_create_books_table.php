<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();

            /** * 1. PENAMBAHAN RELASI KATEGORI
             * foreignId('category_id') -> Membuat kolom integer untuk ID kategori
             * constrained() -> Memberitahu Laravel ini tersambung ke tabel 'categories'
             * onDelete('cascade') -> Jika kategori dihapus, buku di dalamnya ikut terhapus
             */
            $table->foreignId('category_id')->constrained()->onDelete('cascade');

            $table->string('judul');
            $table->string('penulis');
            $table->string('penerbit');
            $table->integer('tahun_terbit');
            $table->integer('stok')->default(0);

            /**
             * 2. PENAMBAHAN KOLOM RAK (Opsional)
             * Menambahkan kolom rak agar sesuai dengan form yang kita buat tadi
             */
            $table->string('rak')->nullable(); 

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Sebelum drop tabel, ada baiknya mematikan foreign key check (opsional di MySQL)
        Schema::dropIfExists('books');
    }
};