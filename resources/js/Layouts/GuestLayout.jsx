import { Link } from '@inertiajs/react';
import { BookOpen } from 'lucide-react';

export default function Guest({ children }) {
    return (
        // BACKGROUND DARK BLUE DENGAN EFEK GLOW
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#0f172a] relative overflow-hidden">
            
            {/* EFEK CAHAYA (GLOW) */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>

            {/* LOGO */}
            <div className="mb-8 relative z-10 text-center">
                <Link href="/" className="flex flex-col items-center gap-3 group">
                    <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-2xl shadow-blue-500/50 group-hover:rotate-12 transition-transform duration-500">
                        <BookOpen size={40} />
                    </div>
                    <span className="text-3xl font-black tracking-tighter text-white">
                        PERPUS<span className="text-blue-400">PRO</span>
                    </span>
                </Link>
            </div>

            {/* CARD FORM (GLASSMORPHISM) */}
            <div className="w-full sm:max-w-md mt-2 px-8 py-10 bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden sm:rounded-[2.5rem] relative z-10">
                <div className="text-white">
                    {children}
                </div>
            </div>

            {/* FOOTER KECIL */}
            <p className="mt-8 text-gray-500 text-sm font-medium relative z-10">
                &copy; 2026 PerpusPro Digital • Kelola Ilmu Lebih Mudah
            </p>
        </div>
    );
}