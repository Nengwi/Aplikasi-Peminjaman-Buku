import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { BookPlus, ArrowLeft, Save, Tags, MapPin } from 'lucide-react';

export default function Create({ auth }) {
    /** * 1. HOOK USEFORM 
     * Digunakan untuk mengelola state input form, menangani error, 
     * dan melakukan proses pengiriman data (POST) ke server.
     */
    const { data, setData, post, processing, errors } = useForm({
        judul: '',
        penulis: '',
        penerbit: '',
        tahun_terbit: '',
        stok: '',
        kategori: '', 
        rak: '', // Field baru untuk menyimpan informasi lokasi fisik buku
    });

    /** * 2. FUNCTION HANDLESUBMIT
     * Dipanggil saat tombol 'Simpan' diklik.
     * post(route(...)) akan mengirim data ke controller di Laravel.
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Mencegah halaman refresh saat form dikirim
        post(route('books.store')); // Mengirim data ke route 'books.store'
    };

    // Daftar pilihan kategori untuk dropdown
    const categories = ['Horor', 'Romance', 'Fiksi', 'Edukasi', 'Komik'];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                /* HEADER: Berisi judul halaman dan tombol kembali */
                <div className="flex items-center gap-4 text-white">
                    <Link href={route('books.index')} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition">
                        <ArrowLeft size={24} />
                    </Link>
                    <h2 className="font-black text-3xl tracking-tight text-white uppercase">
                        Tambah Koleksi <span className="text-blue-500">Baru</span>
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Buku" />

            <div className="py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    
                    {/* 3. CARD FORM UTAMA 
                        Menggunakan backdrop-blur (efek kaca) dan border tipis (border-white/10)
                    */}
                    <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[2.5rem] overflow-hidden p-8 md:p-12">
                        
                        {/* Efek Cahaya Biru (Glow) di pojok kartu agar terlihat estetik */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] -mr-20 -mt-20"></div>
                        
                        <form onSubmit={handleSubmit} className="relative z-10 space-y-7">
                            
                            {/* INPUT: JUDUL BUKU */}
                            <div className="space-y-2">
                                <label className="block text-gray-400 font-black mb-1 ml-1 text-[10px] uppercase tracking-[0.2em]">Judul Buku</label>
                                <input
                                    type="text"
                                    placeholder="Masukkan judul buku..."
                                    className="w-full bg-slate-950/50 border-white/10 rounded-2xl py-4 px-6 text-white placeholder-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 transition shadow-inner"
                                    value={data.judul}
                                    onChange={(e) => setData('judul', e.target.value)} // Update state judul
                                />
                                {/* Menampilkan pesan error dari Laravel jika validasi gagal */}
                                {errors.judul && <div className="text-red-400 text-[10px] mt-2 ml-1 font-bold italic uppercase tracking-wider">{errors.judul}</div>}
                            </div>

                            {/* GRID: Membagi kolom menjadi 2 untuk Penulis dan Kategori */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* INPUT: PENULIS */}
                                <div className="space-y-2">
                                    <label className="block text-gray-400 font-black mb-1 ml-1 text-[10px] uppercase tracking-[0.2em]">Penulis</label>
                                    <input
                                        type="text"
                                        placeholder="Nama penulis..."
                                        className="w-full bg-slate-950/50 border-white/10 rounded-2xl py-4 px-6 text-white placeholder-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 transition shadow-inner"
                                        value={data.penulis}
                                        onChange={(e) => setData('penulis', e.target.value)}
                                    />
                                    {errors.penulis && <div className="text-red-400 text-[10px] mt-2 ml-1 font-bold italic uppercase tracking-wider">{errors.penulis}</div>}
                                </div>

                                {/* INPUT: KATEGORI (Dropdown Select) */}
                                <div className="space-y-2">
                                    <label className="block text-gray-400 font-black mb-1 ml-1 text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Tags size={12} className="text-blue-400" /> Kategori
                                    </label>
                                    <select
                                        className="w-full bg-slate-950/50 border-white/10 rounded-2xl py-4 px-6 text-white focus:border-blue-500/50 focus:ring-blue-500/20 transition shadow-inner appearance-none cursor-pointer"
                                        value={data.kategori}
                                        onChange={(e) => setData('kategori', e.target.value)}
                                    >
                                        <option value="" className="bg-slate-900 text-gray-500">Pilih Kategori...</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat} className="bg-slate-900 text-white uppercase text-xs font-bold">{cat}</option>
                                        ))}
                                    </select>
                                    {errors.kategori && <div className="text-red-400 text-[10px] mt-2 ml-1 font-bold italic uppercase tracking-wider">{errors.kategori}</div>}
                                </div>
                            </div>

                            {/* 4. INPUT: LOKASI RAK (Fitur yang kamu tambahkan)
                                Diberi background berbeda (bg-blue-500/5) agar terlihat sebagai fitur penting/baru
                            */}
                            <div className="space-y-2 p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl">
                                <label className="block text-blue-400 font-black mb-1 ml-1 text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                                    <MapPin size={12} /> Penempatan Lokasi Rak
                                </label>
                                <input
                                    type="text"
                                    placeholder="Contoh: RAK-01, LANTAI 2, RAK-A3..."
                                    className="w-full bg-slate-950/50 border-blue-500/20 rounded-2xl py-4 px-6 text-white placeholder-slate-700 focus:border-blue-400 focus:ring-blue-400/10 transition shadow-inner font-mono text-sm"
                                    value={data.rak}
                                    onChange={(e) => setData('rak', e.target.value)}
                                />
                                <p className="text-[9px] text-slate-500 italic mt-2 ml-1 tracking-tight font-medium">
                                    * Lokasi ini akan tampil pada katalog siswa untuk memudahkan pencarian fisik buku.
                                </p>
                            </div>

                            {/* INPUT: PENERBIT & TAHUN TERBIT */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-gray-400 font-black mb-1 ml-1 text-[10px] uppercase tracking-[0.2em]">Penerbit</label>
                                    <input
                                        type="text"
                                        placeholder="Nama penerbit..."
                                        className="w-full bg-slate-950/50 border-white/10 rounded-2xl py-4 px-6 text-white placeholder-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 transition shadow-inner"
                                        value={data.penerbit}
                                        onChange={(e) => setData('penerbit', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-gray-400 font-black mb-1 ml-1 text-[10px] uppercase tracking-[0.2em]">Tahun Terbit</label>
                                    <input
                                        type="number"
                                        placeholder="2024"
                                        className="w-full bg-slate-950/50 border-white/10 rounded-2xl py-4 px-6 text-white placeholder-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 transition shadow-inner"
                                        value={data.tahun_terbit}
                                        onChange={(e) => setData('tahun_terbit', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* INPUT: JUMLAH STOK */}
                            <div className="md:w-1/3 space-y-2">
                                <label className="block text-gray-400 font-black mb-1 ml-1 text-[10px] uppercase tracking-[0.2em]">Jumlah Stok</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    className="w-full bg-slate-950/50 border-white/10 rounded-2xl py-4 px-6 text-white placeholder-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 transition shadow-inner"
                                    value={data.stok}
                                    onChange={(e) => setData('stok', e.target.value)}
                                />
                                {errors.stok && <div className="text-red-400 text-[10px] mt-2 ml-1 font-bold italic uppercase tracking-wider">{errors.stok}</div>}
                            </div>

                            {/* 5. ACTION BUTTONS 
                                Simpan (Submit) dan Batal (Kembali)
                            */}
                            <div className="pt-8 flex flex-col sm:flex-row items-center gap-4 border-t border-white/5">
                                <button
                                    type="submit"
                                    disabled={processing} // Tombol mati otomatis saat sedang loading
                                    className="w-full sm:flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 uppercase tracking-[0.15em] text-xs"
                                >
                                    {processing ? (
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <Save size={18} />
                                    )}
                                    {processing ? 'Menyimpan...' : 'Simpan Koleksi'}
                                </button>
                                
                                <Link 
                                    href={route('books.index')} 
                                    className="w-full sm:w-auto px-10 py-5 bg-white/5 text-slate-400 font-black rounded-[1.5rem] hover:bg-white/10 transition-all text-center text-xs uppercase tracking-[0.15em] border border-white/5"
                                >
                                    Batal
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* 6. HINT SECTION (Penjelasan tambahan di bawah form) */}
                    <div className="mt-8 p-6 bg-slate-900/50 border border-white/5 rounded-[2rem] flex items-start gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400">
                             <BookPlus size={20} />
                        </div>
                        <div>
                            <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-1">Tips Input</h4>
                            <p className="text-slate-500 text-[11px] leading-relaxed italic">
                                Masukkan kode rak yang spesifik (contoh: R-01) agar memudahkan siswa menemukan buku...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}