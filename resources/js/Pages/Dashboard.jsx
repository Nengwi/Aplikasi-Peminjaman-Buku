import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Book, BookmarkCheck, BookOpen, Users, TrendingUp } from 'lucide-react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-black text-3xl text-blue-900 tracking-tight">Panel Utama</h2>}
        >
            <Head title="Dashboard" />

            {/* Background utama kita kasih warna biru muda yang segar, bukan putih */}
            <div className="py-10 bg-blue-50/50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Banner Utama: Gradient Biru ke Ungu */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 rounded-[2.5rem] p-12 mb-10 shadow-2xl shadow-blue-300/50 border-b-4 border-blue-800">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center text-white">
                            <div className="text-center md:text-left">
                                <span className="bg-yellow-400 text-blue-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter mb-4 inline-block shadow-lg">
                                    Sistem Perpustakaan v2.0
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

                    {/* Grid Card Berwarna (Bukan Putih) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                        {/* Card 1: Biru Solid ke Cyan */}
                        <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-8 rounded-[2rem] shadow-xl shadow-blue-200 text-white hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest opacity-80">Total Koleksi</p>
                                    <h4 className="text-5xl font-black mt-2">1,240</h4>
                                    <p className="mt-4 text-sm font-bold bg-white/20 inline-block px-3 py-1 rounded-lg italic">+12 Minggu ini</p>
                                </div>
                                <Book size={40} className="opacity-40 group-hover:rotate-12 transition-transform" />
                            </div>
                            <div className="absolute -right-4 -bottom-4 bg-white/10 p-10 rounded-full"></div>
                        </div>

                        {/* Card 2: Indigo ke Pink/Violet */}
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-8 rounded-[2rem] shadow-xl shadow-indigo-200 text-white hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest opacity-80">Sedang Dipinjam</p>
                                    <h4 className="text-5xl font-black mt-2">42</h4>
                                    <p className="mt-4 text-sm font-bold bg-white/20 inline-block px-3 py-1 rounded-lg italic text-yellow-200 font-bold underline">8 Perlu kembali</p>
                                </div>
                                <BookmarkCheck size={40} className="opacity-40 group-hover:scale-125 transition-transform" />
                            </div>
                            <div className="absolute -right-4 -bottom-4 bg-white/10 p-10 rounded-full"></div>
                        </div>

                        {/* Card 3: Emerald ke Teal (Hijau Biru) */}
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-8 rounded-[2rem] shadow-xl shadow-emerald-200 text-white hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest opacity-80">Anggota Aktif</p>
                                    <h4 className="text-5xl font-black mt-2">850</h4>
                                    <p className="mt-4 text-sm font-bold bg-white/20 inline-block px-3 py-1 rounded-lg italic">Siswa Terdaftar</p>
                                </div>
                                <Users size={40} className="opacity-40 group-hover:-rotate-12 transition-transform" />
                            </div>
                            <div className="absolute -right-4 -bottom-4 bg-white/10 p-10 rounded-full"></div>
                        </div>

                    </div>

                    {/* Tambahan Section: Aktivitas Terbaru (Warna Soft Blue) */}
                    <div className="mt-10 bg-blue-900/5 p-8 rounded-[2.5rem] border border-blue-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-200">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <h5 className="font-bold text-blue-900">Statistik Perpustakaan meningkat 15%</h5>
                                <p className="text-sm text-blue-600 font-medium">Banyak siswa yang mulai gemar membaca bulan ini.</p>
                            </div>
                        </div>
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                            Lihat Laporan
                        </button>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}