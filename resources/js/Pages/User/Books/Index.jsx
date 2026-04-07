import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { ShoppingCart, BookOpen, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Index({ auth, books, filters = {} }) {
    // 1. Menggunakan data: { book_id: null } agar useForm tahu field apa yang akan dikirim
    const { data, setData, post, processing, reset } = useForm({
        book_id: '',
    });

    const [search, setSearch] = useState(filters.search || '');

    // Logic Debounce Pencarian
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

    const handleBorrow = (book) => {
        console.log("Mencoba meminjam buku:", book.judul);

        // Proteksi Role (Opsional jika sudah ada di middleware)
        const userRole = auth.user.role ? auth.user.role.toLowerCase() : '';
        if (userRole === 'admin') {
            Swal.fire({
                title: 'Akses Ditolak',
                text: 'Admin tidak dapat meminjam buku.',
                icon: 'warning',
                background: '#0f172a',
                color: '#fff',
                confirmButtonColor: '#ef4444',
            });
            return;
        }

        // Konfirmasi SweetAlert
        Swal.fire({
            title: 'Konfirmasi Pinjam',
            text: `Apakah Anda yakin ingin meminjam buku "${book.judul}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#22d3ee',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, Pinjam!',
            background: '#0f172a',
            color: '#fff'
        }).then((result) => {
            if (result.isConfirmed) {
                // MENGIRIM REQUEST
                // Kita gunakan router.post secara langsung agar lebih instan tanpa menunggu state setData
                router.post(route('transactions.store'), {
                    book_id: book.id 
                }, {
                    onStart: () => console.log("Mengirim data..."),
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Berhasil!',
                            text: 'Peminjaman Anda berhasil dicatat.',
                            icon: 'success',
                            background: '#0f172a',
                            color: '#fff'
                        });
                    },
                    onError: (err) => {
                        console.error("Detail Error:", err);
                        Swal.fire({
                            title: 'Gagal',
                            text: err.error || 'Terjadi kesalahan saat menyimpan data.',
                            icon: 'error',
                            background: '#0f172a',
                            color: '#fff'
                        });
                    }
                });
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Katalog Buku" />
            <div className="py-10 px-6 max-w-7xl mx-auto">
                
                {/* HEADER SECTION */}
                <div className="mb-12 text-center">
                    <h2 className="text-4xl font-black text-white uppercase tracking-widest">Katalog Buku</h2>
                    <p className="text-cyan-400 mt-2 italic font-medium">Pilih koleksi buku masa depan Anda di sini</p>
                    
                    <div className="mt-8 flex justify-center">
                        <div className="relative w-full max-w-lg group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-cyan-500/50 group-focus-within:text-cyan-400 transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Cari judul buku atau penulis..."
                                className="block w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 backdrop-blur-xl transition-all shadow-2xl"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* GRID BUKU */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {books && books.length > 0 ? (
                        books.map((book) => (
                            <div key={book.id} className="relative group mx-auto w-full max-w-[240px]">
                                <div className="absolute -inset-1 bg-cyan-500 rounded-[2.5rem] blur opacity-10 group-hover:opacity-40 transition duration-500"></div>
                                
                                <div className="relative bg-slate-900 border border-white/10 rounded-[2.5rem] p-6 h-full flex flex-col shadow-2xl transition-all duration-300 group-hover:-translate-y-2 group-hover:border-cyan-500/50">
                                    <div className="aspect-square bg-slate-800 rounded-3xl mb-5 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-500 shadow-inner">
                                        <BookOpen size={50} />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-white font-bold uppercase truncate text-sm" title={book.judul}>
                                            {book.judul}
                                        </h3>
                                        <p className="text-slate-500 text-[9px] font-bold tracking-widest mt-1 uppercase">
                                            {book.penulis || 'PENULIS ANONIM'}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                                        <div className="flex flex-col">
                                            <span className="text-[8px] text-slate-500 uppercase font-black tracking-tighter">Stok Tersedia</span>
                                            <span className={`text-sm font-black ${book.stok > 0 ? 'text-emerald-400' : 'text-red-500'}`}>
                                                {book.stok > 0 ? `${book.stok} Pcs` : 'HABIS'}
                                            </span>
                                        </div>
                                        
                                        <button
                                            type="button"
                                            onClick={() => handleBorrow(book)}
                                            disabled={processing || book.stok <= 0}
                                            className={`p-3 rounded-2xl transition-all active:scale-95 shadow-lg ${
                                                book.stok > 0 
                                                ? 'bg-cyan-500 hover:bg-white text-slate-950 cursor-pointer' 
                                                : 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                                            }`}
                                        >
                                            <ShoppingCart size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <Search size={48} className="mx-auto text-slate-700 mb-4 opacity-20" />
                            <p className="text-slate-500 font-bold italic uppercase tracking-widest">
                                Buku tidak ditemukan.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}