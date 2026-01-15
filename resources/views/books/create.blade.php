<form action="{{ route('books.store') }}" method="POST">
    @csrf
    <input type="text" name="judul" placeholder="Judul Buku">
    <input type="text" name="penulis" placeholder="Penulis">
    <input type="number" name="stok" placeholder="Jumlah Stok">
    <button type="submit">Simpan</button>
</form>