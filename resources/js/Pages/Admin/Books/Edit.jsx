import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Edit3, ArrowLeft, Save, RefreshCw } from 'lucide-react';

export default function Edit({ auth, book }) {
    // Inisialisasi form dengan data buku yang mau diedit
    const { data, setData, put, processing, errors } = useForm({
        judul: book.judul || '',
        penulis: book.penulis || '',
        penerbit: book.penerbit || '',
        tahun_terbit: book.tahun_terbit || '',
        stok: book.stok || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pakai method PUT untuk update data
        put(route('books.update', book.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4 text-white font-black">
                    <Link href={route('books.index')} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition">
                        <ArrowLeft size={24} />
                    </Link>
                    <h2 className="text-3xl tracking-tight uppercase">Edit Koleksi: <span className="text-blue-400">{book.judul}</span></h2>
                </div>
            }
        >
            <Head title={`Edit - ${book.judul}`} />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[2.5rem] p-10 relative overflow-hidden">
                        {/* Glow Decorative */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>
                        
                        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                            
                            {/* JUDUL */}
                            <div>
                                <label className="block text-gray-400 font-bold mb-2 ml-1 text-xs uppercase tracking-widest">Judul Buku</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-900/50 border-white/10 rounded-2xl py-4 px-6 text-white focus:border-amber-500 focus:ring-amber-500 transition shadow-inner"
                                    value={data.judul}
                                    onChange={(e) => setData('judul', e.target.value)}
                                />
                                {errors.judul && <div className="text-red-400 text-xs mt-2 font-bold italic">{errors.judul}</div>}
                            </div>

                            {/* PENULIS */}
                            <div>
                                <label className="block text-gray-400 font-bold mb-2 ml-1 text-xs uppercase tracking-widest">Penulis</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-900/50 border-white/10 rounded-2xl py-4 px-6 text-white focus:border-amber-500 focus:ring-amber-500 transition shadow-inner"
                                    value={data.penulis}
                                    onChange={(e) => setData('penulis', e.target.value)}
                                />
                                {errors.penulis && <div className="text-red-400 text-xs mt-2 font-bold italic">{errors.penulis}</div>}
                            </div>

                            {/* GRID PENERBIT & TAHUN */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-400 font-bold mb-2 ml-1 text-xs uppercase tracking-widest">Penerbit</label>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-900/50 border-white/10 rounded-2xl py-4 px-6 text-white focus:border-amber-500 focus:ring-amber-500 transition shadow-inner"
                                        value={data.penerbit}
                                        onChange={(e) => setData('penerbit', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 font-bold mb-2 ml-1 text-xs uppercase tracking-widest">Stok</label>
                                    <input
                                        type="number"
                                        className="w-full bg-slate-900/50 border-white/10 rounded-2xl py-4 px-6 text-white focus:border-amber-500 focus:ring-amber-500 transition shadow-inner"
                                        value={data.stok}
                                        onChange={(e) => setData('stok', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* BUTTON ACTION */}
                            <div className="pt-6 flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-amber-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {processing ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
                                    {processing ? 'SEDANG MENYIMPAN...' : 'PERBARUI DATA BUKU'}
                                </button>
                                
                                <Link 
                                    href={route('books.index')} 
                                    className="px-8 py-5 bg-white/5 text-gray-400 font-bold rounded-2xl hover:bg-white/10 transition"
                                >
                                    BATAL
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}