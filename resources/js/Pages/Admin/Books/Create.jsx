import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { BookPlus, ArrowLeft, Save } from 'lucide-react';

export default function Create({ auth }) {
    // Inisialisasi Form Hook dari Inertia
    const { data, setData, post, processing, errors } = useForm({
        judul: '',
        penulis: '',
        penerbit: '',
        tahun_terbit: '',
        stok: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('books.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4 text-white">
                    <Link href={route('books.index')} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition">
                        <ArrowLeft size={24} />
                    </Link>
                    <h2 className="font-black text-3xl tracking-tight">Tambah Koleksi Baru</h2>
                </div>
            }
        >
            <Head title="Tambah Buku" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* CARD FORM - GLASSMORPHISM STYLE */}
                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[2.5rem] overflow-hidden p-10 relative">
                        {/* Glow Effect Inside Card */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                        
                        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                            
                            {/* JUDUL BUKU */}
                            <div>
                                <label className="block text-gray-300 font-bold mb-2 ml-1 text-sm uppercase tracking-widest">Judul Buku</label>
                                <input
                                    type="text"
                                    placeholder="Masukkan judul buku..."
                                    className="w-full bg-slate-900/50 border-white/10 rounded-2xl py-4 px-6 text-white focus:border-blue-500 focus:ring-blue-500 transition shadow-inner"
                                    value={data.judul}
                                    onChange={(e) => setData('judul', e.target.value)}
                                />
                                {errors.judul && <div className="text-red-400 text-xs mt-2 ml-1 font-bold italic">{errors.judul}</div>}
                            </div>

                            {/* PENULIS */}
                            <div>
                                <label className="block text-gray-300 font-bold mb-2 ml-1 text-sm uppercase tracking-widest">Penulis / Pengarang</label>
                                <input
                                    type="text"
                                    placeholder="Nama penulis..."
                                    className="w-full bg-slate-900/50 border-white/10 rounded-2xl py-4 px-6 text-white focus:border-blue-500 focus:ring-blue-500 transition shadow-inner"
                                    value={data.penulis}
                                    onChange={(e) => setData('penulis', e.target.value)}
                                />
                                {errors.penulis && <div className="text-red-400 text-xs mt-2 ml-1 font-bold italic">{errors.penulis}</div>}
                            </div>

                            {/* PENERBIT & TAHUN TERBIT (GRID) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-300 font-bold mb-2 ml-1 text-sm uppercase tracking-widest">Penerbit</label>
                                    <input
                                        type="text"
                                        placeholder="Nama penerbit..."
                                        className="w-full bg-slate-900/50 border-white/10 rounded-2xl py-4 px-6 text-white focus:border-blue-500 focus:ring-blue-500 transition"
                                        value={data.penerbit}
                                        onChange={(e) => setData('penerbit', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 font-bold mb-2 ml-1 text-sm uppercase tracking-widest">Tahun Terbit</label>
                                    <input
                                        type="number"
                                        placeholder="Contoh: 2024"
                                        className="w-full bg-slate-900/50 border-white/10 rounded-2xl py-4 px-6 text-white focus:border-blue-500 focus:ring-blue-500 transition"
                                        value={data.tahun_terbit}
                                        onChange={(e) => setData('tahun_terbit', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* STOK BUKU */}
                            <div className="md:w-1/2">
                                <label className="block text-gray-300 font-bold mb-2 ml-1 text-sm uppercase tracking-widest">Stok Buku</label>
                                <input
                                    type="number"
                                    placeholder="Jumlah stok..."
                                    className="w-full bg-slate-900/50 border-white/10 rounded-2xl py-4 px-6 text-white focus:border-blue-500 focus:ring-blue-500 transition"
                                    value={data.stok}
                                    onChange={(e) => setData('stok', e.target.value)}
                                />
                                {errors.stok && <div className="text-red-400 text-xs mt-2 ml-1 font-bold italic">{errors.stok}</div>}
                            </div>

                            {/* BUTTON ACTION */}
                            <div className="pt-6 flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    <Save size={20} />
                                    {processing ? 'SEDANG MENYIMPAN...' : 'SIMPAN DATA BUKU'}
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

                    {/* TIPS CARD */}
                    <div className="mt-8 p-6 bg-blue-600/10 border border-blue-500/20 rounded-[2rem] flex items-center gap-4 text-blue-300 italic text-sm">
                        <BookPlus className="text-blue-400" />
                        <span>Pastikan data buku (Judul & Penulis) sudah sesuai dengan fisik buku untuk memudahkan pencarian siswa.</span>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}