<h1>Daftar Buku</h1>
<a href="{{ route('books.create') }}">Tambah Buku</a>
<table border="1">
    <tr>
        <th>Judul</th>
        <th>Penulis</th>
        <th>Stok</th>
    </tr>
    @foreach($books as $book)
    <tr>
        <td>{{ $book->judul }}</td>
        <td>{{ $book->penulis }}</td>
        <td>{{ $book->stok }}</td>
    </tr>
    @endforeach
</table>