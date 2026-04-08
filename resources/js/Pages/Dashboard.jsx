import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Book, BookmarkCheck, BookOpen, Users, TrendingUp, Wallet } from 'lucide-react';

export default function Dashboard({ auth, stats }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-black text-3xl text-blue-900 tracking-tight">Panel Utama</h2>}
        >
            <Head title="Dashboard" />

            {/* Background utama biru muda segar */}
            <div className="py-10 bg-blue-50/50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Banner Utama: Gradient Biru ke Ungu */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 rounded-[2.5rem] p-12 mb-10 shadow-2xl shadow-blue-300/50 border-b-4 border-blue-800">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center text-white">
                            <div className="text-center md:text-left">
                                <span className="bg-yellow-400 text-blue-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter mb-4 inline-block shadow-lg">
                                    Sistem Perpustakaan
                                </span>
                                <h3 className="text-5xl font-black mb-2 leading-tight">Halo, {auth.user.name}! 🚀</h3>
                                <p className="text-blue-100 text-lg font-medium opacity-90 max-w-md">
                                    Siap mengelola literasi hari ini? Semua data perpustakaan ada dalam genggamanmu.
                                </p>
                            </div>
                            <div className="hidden md:block scale-110">
                                <div className="bg-white/10 p-8 rounded-full backdrop-blur-3xl border border-white/20 shadow-inner">
                                    <BookOpen size={120} color="white" strokeWidth={1.5} />
                                </div>
                            </div>
                        </div>
                        {/* Dekorasi Abstract */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -ml-20 -mb-20"></div>
                    </div>

                    {/* Grid Card Berwarna (Menggunakan Data Real-time) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        
                        {/* Card 1: Total Koleksi */}
                        <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-8 rounded-[2rem] shadow-xl shadow-blue-200 text-white hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest opacity-80">Total Koleksi</p>
                                    <h4 className="text-4xl font-black mt-2">{stats.total_buku}</h4>
                                    <p className="mt-4 text-sm font-bold bg-white/20 inline-block px-3 py-1 rounded-lg italic">Buku Tersedia</p>
                                </div>
                                <Book size={40} className="opacity-40 group-hover:rotate-12 transition-transform" />
                            </div>
                            <div className="absolute -right-4 -bottom-4 bg-white/10 p-10 rounded-full"></div>
                        </div>

                        {/* Card 2: Sedang Dipinjam */}
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-8 rounded-[2rem] shadow-xl shadow-indigo-200 text-white hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest opacity-80">Sedang Dipinjam</p>
                                    <h4 className="text-4xl font-black mt-2">{stats.pinjam_aktif}</h4>
                                    <p className="mt-4 text-sm font-bold bg-white/20 inline-block px-3 py-1 rounded-lg italic text-yellow-200">Pinjaman Aktif</p>
                                </div>
                                <BookmarkCheck size={40} className="opacity-40 group-hover:scale-125 transition-transform" />
                            </div>
                            <div className="absolute -right-4 -bottom-4 bg-white/10 p-10 rounded-full"></div>
                        </div>

                        {/* Card 3: Anggota Aktif */}
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-8 rounded-[2rem] shadow-xl shadow-emerald-200 text-white hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest opacity-80">Anggota Aktif</p>
                                    <h4 className="text-4xl font-black mt-2">{stats.total_siswa}</h4>
                                    <p className="mt-4 text-sm font-bold bg-white/20 inline-block px-3 py-1 rounded-lg italic text-white">Siswa Terdaftar</p>
                                </div>
                                <Users size={40} className="opacity-40 group-hover:-rotate-12 transition-transform" />
                            </div>
                            <div className="absolute -right-4 -bottom-4 bg-white/10 p-10 rounded-full"></div>
                        </div>

                        {/* Card 4: Total Denda (FITUR BARU) */}
                        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-8 rounded-[2rem] shadow-xl shadow-orange-200 text-white hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest opacity-80">Kas Denda</p>
                                    <h4 className="text-3xl font-black mt-2">Rp {stats.total_denda.toLocaleString()}</h4>
                                    <p className="mt-4 text-sm font-bold bg-white/20 inline-block px-3 py-1 rounded-lg italic text-white">Total Terkumpul</p>
                                </div>
                                <Wallet size={40} className="opacity-40 group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="absolute -right-4 -bottom-4 bg-white/10 p-10 rounded-full"></div>
                        </div>

                    </div>

                    {/* Tambahan Section: Navigasi Cepat ke Laporan */}
                    <div className="mt-10 bg-blue-900/5 p-8 rounded-[2.5rem] border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-200">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <h5 className="font-bold text-blue-900 uppercase text-xs tracking-widest">Aktivitas Sistem</h5>
                                <p className="text-lg text-blue-600 font-black">Lihat laporan transaksi lengkap bulan ini</p>
                            </div>
                        </div>
                        <a href={route('reports.index')} className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition shadow-xl shadow-blue-200 active:scale-95">
                            BUKA LAPORAN
                        </a>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}