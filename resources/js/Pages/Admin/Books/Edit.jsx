import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Edit3, ArrowLeft, Save, RefreshCw, Tags, Check, MapPin } from 'lucide-react';

export default function Edit({ auth, book }) {
    // 1. Inisialisasi form dengan tambahan field 'rak'
    const { data, setData, put, processing, errors } = useForm({
        judul: book.judul || '',
        penulis: book.penulis || '',
        kategori: book.kategori || '', 
        penerbit: book.penerbit || '',
        tahun_terbit: book.tahun_terbit || '',
        stok: book.stok || '',
        rak: book.rak || '', // <-- Tambahkan field rak di sini
    });

    // 2. Daftar kategori pilihan
    const categories = ['Horor', 'Romance', 'Fiksi', 'Edukasi', 'Komik', 'Action', 'Drama'];

    // 3. Fungsi Handle Checkbox (Multi-select)
    const handleCheckboxChange = (cat) => {
        let currentCategories = data.kategori ? data.kategori.split(', ').filter(Boolean) : [];
        
        if (currentCategories.includes(cat)) {
            currentCategories = currentCategories.filter(item => item !== cat);
        } else {
            currentCategories.push(cat);
        }
        
        setData('kategori', currentCategories.join(', '));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                    <h2 className="text-3xl tracking-tight uppercase">
                        Edit Koleksi: <span className="text-amber-400">{book.judul}</span>
                    </h2>
                </div>
            }
        >
            <Head title={`Edit - ${book.judul}`} />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[2.5rem] p-10 relative overflow-hidden">
                        {/* Glow Effect */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>
                        
                        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                            
                            {/* INPUT JUDUL */}
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

                            {/* INPUT PENULIS */}
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

                            {/* INPUT LOKASI RAK (FITUR BARU) */}
                            <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-[2rem] space-y-3">
                                <label className="block text-amber-500 font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                                    <MapPin size={14} />
                                    Atur Ulang Lokasi Rak
                                </label>
                                <input
                                    type="text"
                                    placeholder="Contoh: RAK-A1, LANTAI 2..."
                                    className="w-full bg-slate-950/50 border-amber-500/20 rounded-2xl py-4 px-6 text-white placeholder-slate-700 focus:border-amber-500 focus:ring-amber-500/20 transition shadow-inner font-mono"
                                    value={data.rak}
                                    onChange={(e) => setData('rak', e.target.value)}
                                />
                                {errors.rak && <div className="text-red-400 text-xs mt-1 font-bold italic">{errors.rak}</div>}
                            </div>

                            {/* INPUT KATEGORI (CHECKBOX MULTI-SELECT) */}
                            <div>
                                <label className="block text-gray-400 font-bold mb-4 ml-1 text-xs uppercase tracking-widest flex items-center gap-2">
                                    <Tags size={14} className="text-amber-500" />
                                    Kategori / Genre
                                </label>
                                
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-6 bg-slate-900/40 border border-white/5 rounded-[2rem]">
                                    {categories.map((cat) => {
                                        const isChecked = data.kategori ? data.kategori.split(', ').includes(cat) : false;
                                        return (
                                            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        className="peer hidden"
                                                        checked={isChecked}
                                                        onChange={() => handleCheckboxChange(cat)}
                                                    />
                                                    <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${isChecked ? 'bg-amber-600 border-amber-600 shadow-[0_0_10px_rgba(245,158,11,0.4)]' : 'border-white/20 bg-white/5'}`}>
                                                        {isChecked && <Check size={14} className="text-white" />}
                                                    </div>
                                                </div>
                                                <span className={`text-sm font-bold transition-colors ${isChecked ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                                    {cat}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                                {errors.kategori && <div className="text-red-400 text-xs mt-2 font-bold italic">{errors.kategori}</div>}
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
                                    <label className="block text-gray-400 font-bold mb-2 ml-1 text-xs uppercase tracking-widest">Tahun Terbit</label>
                                    <input
                                        type="number"
                                        className="w-full bg-slate-900/50 border-white/10 rounded-2xl py-4 px-6 text-white focus:border-amber-500 focus:ring-amber-500 transition shadow-inner"
                                        value={data.tahun_terbit}
                                        onChange={(e) => setData('tahun_terbit', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* INPUT STOK */}
                            <div className="md:w-1/2">
                                <label className="block text-gray-400 font-bold mb-2 ml-1 text-xs uppercase tracking-widest">Stok Tersedia</label>
                                <input
                                    type="number"
                                    className="w-full bg-slate-900/50 border-white/10 rounded-2xl py-4 px-6 text-white focus:border-amber-500 focus:ring-amber-500 transition shadow-inner"
                                    value={data.stok}
                                    onChange={(e) => setData('stok', e.target.value)}
                                />
                                {errors.stok && <div className="text-red-400 text-xs mt-2 font-bold italic">{errors.stok}</div>}
                            </div>

                            {/* TOMBOL AKSI */}
                            <div className="pt-6 flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-amber-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 uppercase tracking-widest text-xs"
                                >
                                    {processing ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
                                    {processing ? 'SEDANG MENYIMPAN...' : 'PERBARUI DATA BUKU'}
                                </button>
                                
                                <Link 
                                    href={route('books.index')} 
                                    className="px-8 py-5 bg-white/5 text-gray-400 font-bold rounded-2xl hover:bg-white/10 transition text-center text-xs uppercase tracking-widest border border-white/5"
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