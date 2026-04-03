import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Search, Book as BookIcon, Info } from 'lucide-react';

export default function Index({ auth, books }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-black text-2xl text-white tracking-tighter uppercase">📚 Koleksi Perpustakaan</h2>}
        >
            <Head title="Katalog Buku" />

            {/* Background Gelap Pekat */}
            <div className="py-12 bg-[#020617] min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Search Bar matching the theme */}
                    <div className="relative mb-12">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <Search className="h-5 w-5 text-blue-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Cari buku..."
                            style={{ boxShadow: '0 0 15px rgba(37, 99, 235, 0.3)' }}
                            className="block w-full rounded-2xl border-2 border-blue-600/30 bg-slate-900/80 py-4 pl-12 text-white outline-none focus:border-blue-500 transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {books && books.length > 0 ? (
                            books.map((book) => (
                                <div 
                                    key={book.id} 
                                    className="group relative rounded-[32px] transition-all duration-500 hover:-translate-y-3"
                                    /* WARNA SESUAI LOGO PERPUSPRO (Royal Blue) */
                                    style={{ 
                                        backgroundColor: '#2563eb', // Biru Utama PerpusPro
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        boxShadow: '0 10px 30px rgba(37, 99, 235, 0.4)', 
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow = '0 0 40px rgba(37, 99, 235, 0.8)';
                                        e.currentTarget.style.backgroundColor = '#3b82f6'; // Sedikit lebih terang saat hover
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(37, 99, 235, 0.4)';
                                        e.currentTarget.style.backgroundColor = '#2563eb';
                                    }}
                                >
                                    <div className="p-8 relative overflow-hidden">
                                        {/* Pantulan Cahaya Soft di dalam kartu */}
                                        <div className="absolute -top-16 -right-16 w-40 h-40 bg-white/10 blur-[40px] rounded-full"></div>

                                        <div className="mb-6 flex justify-between items-center relative z-10">
                                            <div className="p-4 bg-white/10 rounded-2xl text-white border border-white/20 shadow-lg">
                                                <BookIcon size={28} />
                                            </div>
                                            <span 
                                                className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest border-2 border-white/30 text-white ${book.stok > 0 ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}
                                            >
                                                {book.stok > 0 ? 'READY' : 'EMPTY'}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-black text-white mb-2 leading-tight uppercase relative z-10 drop-shadow-lg">
                                            {book.judul}
                                        </h3>
                                        <p className="text-blue-100 font-bold mb-6 italic tracking-wide relative z-10">By {book.penulis}</p>

                                        <div className="grid grid-cols-2 gap-4 py-5 border-y border-white/10 text-xs relative z-10">
                                            <div className="flex flex-col">
                                                <span className="text-blue-200/60 font-black mb-1 uppercase tracking-tighter text-[9px]">Penerbit</span>
                                                <span className="text-white font-bold">{book.penerbit}</span>
                                            </div>
                                            <div className="flex flex-col text-right">
                                                <span className="text-blue-200/60 font-black mb-1 uppercase tracking-tighter text-[9px]">Tahun</span>
                                                <span className="text-white font-bold">{book.tahun_terbit}</span>
                                            </div>
                                        </div>

                                        <button 
                                            className="w-full mt-8 py-4 bg-white rounded-2xl text-blue-700 font-black text-xs tracking-[0.3em] uppercase transition-all hover:bg-slate-100 hover:scale-[1.02] shadow-xl active:scale-95"
                                        >
                                            Detail Buku
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-white text-center col-span-full font-bold">Buku belum tersedia...</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}