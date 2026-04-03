import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Book as BookIcon, Search, X } from 'lucide-react'; 
import { useState, useEffect } from 'react'; 

export default function Index({ auth, books, filters }) { 
    const { flash } = usePage().props;

    // State untuk pencarian
    const [search, setSearch] = useState(filters.search || '');

    // Logic pencarian otomatis (Debounce)
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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="font-black text-4xl text-white tracking-tight">Koleksi Buku</h2>
                        <p className="text-blue-400 font-medium mt-1">Kelola data buku perpustakaan Anda</p>
                    </div>
                    <Link
                        href={route('books.create')}
                        className="px-10 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] active:scale-95 w-fit"
                    >
                        <Plus size={16} />
                        TAMBAH BUKU BARU
                    </Link>
                </div>
            }
        >
            <Head title="Kelola Buku" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* NOTIFIKASI FLASH */}
                    {flash.message && (
                        <div className="mb-8 p-5 bg-emerald-500/20 border border-emerald-500/50 rounded-[2rem] text-emerald-400 font-bold backdrop-blur-md flex items-center gap-3 animate-bounce">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                            {flash.message}
                        </div>
                    )}

                    {/* SEARCH BAR - Pindahkan ke sini (di atas tabel) */}
                    <div className="mb-6 flex justify-end">
                        <div className="relative w-full md:w-1/3 group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                                <Search size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="Cari judul atau penulis..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all backdrop-blur-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* TABLE CONTAINER */}
                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 text-blue-400 uppercase text-xs font-black tracking-[0.2em]">
                                        <th className="p-8">Detail Buku</th>
                                        <th className="p-8">Penerbit</th>
                                        <th className="p-8 text-center">Tahun</th>
                                        <th className="p-8 text-center">Stok</th>
                                        <th className="p-8 text-right">Opsi</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-300 divide-y divide-white/5">
                                    {books.length > 0 ? books.map((book) => (
                                        <tr key={book.id} className="hover:bg-white/10 transition-all group">
                                            <td className="p-8">
                                                <div className="flex items-center gap-5">
                                                    <div className="p-4 bg-blue-500/10 rounded-[1.5rem] text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                                        <BookIcon size={28} />
                                                    </div>
                                                    <div>
                                                        <div className="text-white font-black text-xl tracking-tight">{book.judul}</div>
                                                        <div className="text-sm text-gray-500 font-medium">Oleh: <span className="text-blue-300">{book.penulis}</span></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-8 text-sm font-bold text-gray-400">{book.penerbit}</td>
                                            <td className="p-8 text-center">
                                                <span className="px-4 py-2 bg-white/5 rounded-xl font-black text-white border border-white/10">
                                                    {book.tahun_terbit}
                                                </span>
                                            </td>
                                            <td className="p-8 text-center">
                                                <div className="flex flex-col items-center">
                                                    <span className={`text-2xl font-black ${book.stok > 5 ? 'text-emerald-400' : 'text-red-400'}`}>
                                                        {book.stok}
                                                    </span>
                                                    <span className="text-[10px] uppercase font-bold tracking-tighter text-gray-600">Eksemplar</span>
                                                </div>
                                            </td>
                                            <td className="p-8">
                                                <div className="flex justify-end gap-3">
                                                    <Link
                                                        href={route('books.edit', book.id)}
                                                        className="p-3 bg-amber-500/10 text-amber-500 rounded-xl hover:bg-amber-500 hover:text-white transition-all shadow-lg"
                                                    >
                                                        <Edit size={20} />
                                                    </Link>
                                                    <button
                                                        onClick={() => {
                                                            if (confirm('Yakin ingin menghapus buku ini?')) {
                                                                router.delete(route('books.destroy', book.id))
                                                            }
                                                        }}
                                                        className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="p-32 text-center">
                                                <div className="flex flex-col items-center gap-6">
                                                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-dashed border-white/10">
                                                        <BookIcon size={48} className="opacity-20 text-white" />
                                                    </div>
                                                    <div className="max-w-xs text-center">
                                                        <p className="text-xl font-bold text-white">Data Tidak Ditemukan</p>
                                                        <p className="text-sm mt-2 text-gray-500">Coba gunakan kata kunci lain atau tambahkan koleksi baru.</p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between items-center text-gray-500 text-sm font-bold px-4 uppercase tracking-widest">
                        <span>Menampilkan {books.length} Buku</span>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                            <span>Sistem Siap Digunakan</span>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}