import { Link, Head } from '@inertiajs/react';
import { BookOpen, ArrowRight, Library, GraduationCap, ShieldCheck } from 'lucide-react';

export default function Welcome({ auth }) {
    return (
        <div className="min-h-screen bg-[#0f172a] text-white selection:bg-blue-500 selection:text-white">
            <Head title="Selamat Datang di PerpusPro" />
            
            {/* EFEK GRADIENT BACKROUND */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-600/20 to-transparent -z-10"></div>

            {/* NAVBAR */}
            <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/50 group-hover:scale-110 transition">
                        <BookOpen size={24} />
                    </div>
                    <span className="text-2xl font-black tracking-tighter">
                        PERPUS<span className="text-blue-400">PRO</span>
                    </span>
                </div>
                <div className="flex items-center gap-6">
                    {auth.user ? (
                        <Link href={route('dashboard')} className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full font-bold transition backdrop-blur-md border border-white/10">
                            Ke Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="font-bold text-gray-400 hover:text-white transition">Log in</Link>
                            <Link href={route('register')} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-full font-bold transition shadow-lg shadow-blue-500/30">
                                Daftar
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* HERO SECTION */}
            <main className="max-w-7xl mx-auto px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* TEXT CONTENT */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-black uppercase tracking-widest">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Perpustakaan Digital Masa Kini
                        </div>
                        <h1 className="text-6xl lg:text-7xl font-black leading-tight italic">
                            Jendela Dunia <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Dalam Genggaman.</span>
                        </h1>
                        <p className="text-gray-400 text-xl leading-relaxed max-w-lg font-medium">
                            Akses ribuan koleksi buku, jurnal, dan karya ilmiah secara digital. Belajar lebih cerdas, lebih cepat, dan di mana saja.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link href={route('register')} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-lg flex items-center gap-2 shadow-2xl shadow-blue-500/40 transition hover:-translate-y-1">
                                Mulai Sekarang <ArrowRight size={20} />
                            </Link>
                            <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-black text-lg transition">
                                Lihat Koleksi
                            </button>
                        </div>
                    </div>

                    {/* FOTO BUKU - GRID STYLE */}
                    <div className="relative grid grid-cols-2 gap-4">
                        <div className="space-y-4 pt-12">
                            <img 
                                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=400" 
                                className="w-full h-64 object-cover rounded-[2rem] shadow-2xl border border-white/10 rotate-[-4deg] hover:rotate-0 transition-all duration-500" 
                                alt="Bookshelf"
                            />
                            <img 
                                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400" 
                                className="w-full h-48 object-cover rounded-[2rem] shadow-2xl border border-white/10 rotate-[2deg] hover:rotate-0 transition-all duration-500" 
                                alt="Library"
                            />
                        </div>
                        <div className="space-y-4">
                            <img 
                                src="https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=400" 
                                className="w-full h-48 object-cover rounded-[2rem] shadow-2xl border border-white/10 rotate-[4deg] hover:rotate-0 transition-all duration-500" 
                                alt="Open Book"
                            />
                            <img 
                                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400" 
                                className="w-full h-64 object-cover rounded-[2rem] shadow-2xl border border-white/10 rotate-[-2deg] hover:rotate-0 transition-all duration-500" 
                                alt="Stack of books"
                            />
                        </div>
                        {/* Glow Behind Images */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 blur-[100px] -z-10"></div>
                    </div>
                </div>

                {/* FEATURE CARDS */}
                <div className="grid md:grid-cols-3 gap-8 mt-32">
                    <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-6">
                            <Library size={24} />
                        </div>
                        <h4 className="text-xl font-bold mb-2">Koleksi Lengkap</h4>
                        <p className="text-gray-500">Ribuan buku dari berbagai genre tersedia untuk mendukung belajarmu.</p>
                    </div>
                    <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition">
                        <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 mb-6">
                            <GraduationCap size={24} />
                        </div>
                        <h4 className="text-xl font-bold mb-2">Akses Akademik</h4>
                        <p className="text-gray-500">Materi referensi terpercaya untuk kebutuhan tugas dan penelitian.</p>
                    </div>
                    <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-6">
                            <ShieldCheck size={24} />
                        </div>
                        <h4 className="text-xl font-bold mb-2">Keamanan Data</h4>
                        <p className="text-gray-500">Data peminjaman dan profil terjaga aman dengan sistem terenkripsi.</p>
                    </div>
                </div>
            </main>

            {/* FOOTER */}
            <footer className="border-t border-white/5 py-10 mt-20 text-center text-gray-600 font-medium">
                <p>&copy; 2026 PerpusPro Digital. All rights reserved.</p>
            </footer>
        </div>
    );
}