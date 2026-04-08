import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Book as BookIcon, Search, X, MapPin } from 'lucide-react'; 
import { useState, useEffect } from 'react'; 
import Swal from 'sweetalert2';

export default function Index({ auth, books, filters }) { 
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');

    // Debounce search function
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search !== (filters.search || '')) {
                router.get(route('books.index'), { search: search }, {
                    preserveState: true,
                    replace: true
                });
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const handleDelete = (id, judul) => {
        Swal.fire({
            title: 'Hapus Buku?',
            text: `Buku "${judul}" akan dihapus permanen dari sistem.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
            background: '#0f172a',
            color: '#fff'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('books.destroy', id), {
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Terhapus!',
                            text: 'Data buku berhasil dihilangkan.',
                            icon: 'success',
                            background: '#0f172a',
                            color: '#fff'
                        });
                    }
                });
            }
        });
    };

    const handlePinjam = (bookId, judul) => {
        Swal.fire({
            title: 'Pinjam Buku?',
            text: `Apakah kamu ingin meminjam buku "${judul}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, Pinjam!',
            cancelButtonText: 'Batal',
            background: '#0f172a',
            color: '#fff'
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route('transactions.store'), {
                    book_id: bookId
                }, {
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Berhasil!',
                            text: 'Buku berhasil dipinjam.',
                            icon: 'success',
                            background: '#0f172a',
                            color: '#fff'
                        });
                    }
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="font-black text-4xl text-white tracking-tight text-center md:text-left">Koleksi Buku</h2>
                        <p className="text-blue-400 font-medium mt-1 text-center md:text-left">Kelola data buku perpustakaan Anda</p>
                    </div>
                    <Link
                        href={route('books.create')}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] active:scale-95 w-full md:w-fit uppercase tracking-widest"
                    >
                        <Plus size={16} />
                        Tambah Buku Baru
                    </Link>
                </div>
            }
        >
            <Head title="Kelola Buku" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Flash Message */}
                    {(flash.message || flash.error) && (
                        <div className={`mb-8 p-5 ${flash.error ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'} border rounded-[2rem] font-bold backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-500`}>
                            <div className={`w-2 h-2 ${flash.error ? 'bg-red-500' : 'bg-emerald-500'} rounded-full animate-ping`}></div>
                            {flash.message || flash.error}
                        </div>
                    )}

                    {/* Search Bar */}
                    <div className="mb-6 flex justify-end">
                        <div className="relative w-full md:w-1/3 group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                                <Search size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="Cari judul atau penulis..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-10 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all backdrop-blur-sm placeholder-gray-600"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="bg-[#0f172a]/50 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse table-auto">
                                <thead>
                                    <tr className="bg-white/5 text-blue-400 uppercase text-[10px] font-black tracking-[0.2em]">
                                        <th className="p-6">Detail Buku</th>
                                        <th className="p-6">Penerbit</th>
                                        <th className="p-6">Kategori</th>
                                        <th className="p-6">Lokasi Rak</th>
                                        <th className="p-6 text-center">Tahun</th>
                                        <th className="p-6 text-center">Stok</th>
                                        <th className="p-6 text-right">Opsi</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-300 divide-y divide-white/5">
                                    {books.length > 0 ? books.map((book) => (
                                        <tr key={book.id} className="hover:bg-white/[0.03] transition-all group">
                                            {/* DETAIL BUKU SECTION - FIXED SPACE */}
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shrink-0">
                                                        <BookIcon size={22} />
                                                    </div>
                                                    <div className="max-w-[200px] md:max-w-[250px]">
                                                        <div className="text-white font-bold text-base tracking-tight leading-tight truncate" title={book.judul}>
                                                            {book.judul}
                                                        </div>
                                                        <div className="text-[11px] text-gray-500 font-medium mt-1">
                                                            Oleh: <span className="text-blue-300/80">{book.penulis}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-6 text-sm font-medium text-gray-400">{book.penerbit}</td>
                                            
                                            <td className="p-6 text-sm">
                                                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${book.kategori ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                                    {book.kategori || 'BELUM SET'}
                                                </span>
                                            </td>

                                            <td className="p-6">
                                                {book.rak ? (
                                                    <div className="flex items-center gap-2">
                                                        <MapPin size={12} className="text-blue-500" />
                                                        <span className="text-[11px] font-mono font-black text-white bg-white/5 px-2 py-1 rounded-md border border-white/10">
                                                            {book.rak}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-[10px] font-bold text-gray-600 italic uppercase">Kosong</span>
                                                )}
                                            </td>

                                            <td className="p-6 text-center">
                                                <span className="text-xs font-bold text-gray-300">
                                                    {book.tahun_terbit}
                                                </span>
                                            </td>

                                            <td className="p-6 text-center">
                                                <div className="flex flex-col items-center">
                                                    <span className={`text-lg font-black ${book.stok > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                                        {book.stok}
                                                    </span>
                                                    <span className="text-[9px] uppercase font-bold tracking-tighter text-gray-600">Pcs</span>
                                                </div>
                                            </td>

                                            <td className="p-6">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handlePinjam(book.id, book.judul)}
                                                        className="px-3 py-1.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-lg hover:bg-emerald-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-tighter"
                                                    >
                                                        Pinjam
                                                    </button>

                                                    <Link
                                                        href={route('books.edit', book.id)}
                                                        className="p-2 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-lg hover:bg-amber-500 hover:text-white transition-all"
                                                    >
                                                        <Edit size={16} />
                                                    </Link>

                                                    <button
                                                        onClick={() => handleDelete(book.id, book.judul)}
                                                        className="p-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="7" className="p-32 text-center">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="p-6 bg-white/5 rounded-full text-gray-600">
                                                        <Search size={48} />
                                                    </div>
                                                    <p className="text-gray-500 text-xl font-bold">Data Tidak Ditemukan</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-8 flex justify-between items-center text-gray-500 text-[10px] font-black px-4 uppercase tracking-[0.2em]">
                        <span>Showing {books.length} entries</span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span>System Active</span>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}