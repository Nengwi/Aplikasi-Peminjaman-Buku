import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { 
    BookOpen, 
    LayoutDashboard, 
    Book, 
    BookmarkCheck, 
    User as UserIcon, 
    Users, 
    LogOut,
    Menu,
    X,
    FileText
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // LOGIKA PENGECEKAN ADMIN (Sesuai dengan database yang sudah dibersihkan)
    // Sekarang mengunci ke email admin@gmail.com agar tidak tertukar lagi
    const isAdmin = user.email === 'admin@gmail.com' || user.name === 'dwi admin' || user.role === 'admin';

    return (
        <div className="min-h-screen bg-[#0f172a] relative z-0 overflow-hidden font-sans text-slate-200">
            
            {/* BACKGROUND GLOW DEKORATIF */}
            <div className="pointer-events-none absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
            <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -z-10"></div>

            {/* NAVBAR UTAMA */}
            <nav className="relative z-[100] border-b border-white/5 bg-slate-900/80 backdrop-blur-xl sticky top-0 shadow-2xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 justify-between items-center">
                        
                        <div className="flex items-center gap-10">
                            {/* LOGO PERPUSPRO */}
                            <Link href="/" className="flex items-center gap-2 group relative z-[110]">
                                <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/50 group-hover:rotate-6 transition-transform duration-300">
                                    <BookOpen size={24} />
                                </div>
                                <span className="font-black text-2xl tracking-tighter text-white">
                                    PERPUS<span className="text-blue-400">PRO</span>
                                </span>
                            </Link>

                            {/* NAVIGASI DESKTOP */}
                            <div className="hidden space-x-6 sm:flex sm:ms-4 relative z-[110]">
                                <NavLink 
                                    href={route('dashboard')} 
                                    active={route().current('dashboard')}
                                    className="text-gray-400 hover:text-white transition-all duration-300 font-bold"
                                >
                                    <div className="flex items-center gap-2">
                                        <LayoutDashboard size={18} />
                                        <span>Dashboard</span>
                                    </div>
                                </NavLink>

                                {/* MENU BERDASARKAN ROLE */}
                                {isAdmin ? (
                                    <>
                                        <NavLink 
                                            href={route('books.index')} 
                                            active={route().current('books.*')}
                                            className="text-gray-400 hover:text-white transition-all duration-300 font-bold"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Book size={18} />
                                                <span>Kelola Buku</span>
                                            </div>
                                        </NavLink>

                                        <NavLink 
                                            href={route('transactions.index')} 
                                            active={route().current('transactions.*')}
                                            className="text-gray-400 hover:text-white transition-all duration-300 font-bold"
                                        >
                                            <div className="flex items-center gap-2">
                                                <BookmarkCheck size={18} />
                                                <span>Transaksi</span>
                                            </div>
                                        </NavLink>

                                        <NavLink 
                                            href={route('users.index')} 
                                            active={route().current('users.*')}
                                            className="text-gray-400 hover:text-white transition-all duration-300 font-bold"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Users size={18} />
                                                <span>Kelola Anggota</span>
                                            </div>
                                        </NavLink>

                                        <NavLink 
                                            href={route('reports.index')} 
                                            active={route().current('reports.*')}
                                            className="text-gray-400 hover:text-white transition-all duration-300 font-bold"
                                        >
                                            <div className="flex items-center gap-2">
                                                <FileText size={18} />
                                                <span>Laporan</span>
                                            </div>
                                        </NavLink>
                                    </>
                                ) : (
                                    <NavLink 
                                        href={route('books.index')} 
                                        active={route().current('books.*')}
                                        className="text-gray-400 hover:text-white transition-all duration-300 font-bold"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Book size={18} />
                                            <span>Katalog Buku</span>
                                        </div>
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        {/* KANAN: USER DROPDOWN */}
                        <div className="hidden sm:flex sm:items-center relative z-[110]">
                            <div className="flex flex-col items-end mr-4">
                                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">
                                    {isAdmin ? 'ADMINISTRATOR' : 'ANGGOTA PERPUS'}
                                </span>
                            </div>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all duration-300 shadow-inner">
                                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center font-black text-sm shadow-lg uppercase text-white">
                                            {user.name.charAt(0)}
                                        </div>
                                        <span className="font-bold text-sm tracking-tight">{user.name}</span>
                                        <svg className="ms-1 h-4 w-4 fill-current opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content align="right" contentClasses="bg-slate-900 border border-white/10 shadow-2xl py-2 overflow-hidden">
                                    <Dropdown.Link href={route('profile.edit')} className="flex items-center gap-2 text-gray-300 hover:bg-blue-600 hover:text-white transition-colors py-3 px-4">
                                        <UserIcon size={16} /> Profil Saya
                                    </Dropdown.Link>
                                    <div className="border-t border-white/5 my-1"></div>
                                    <Dropdown.Link href={route('logout')} method="post" as="button" className="flex items-center gap-2 text-red-400 hover:bg-red-600/10 transition-colors py-3 px-4 w-full text-left">
                                        <LogOut size={16} /> Keluar Aplikasi
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* MOBILE MENU BUTTON */}
                        <div className="-me-2 flex items-center sm:hidden relative z-[110]">
                            <button
                                onClick={() => setShowingNavigationDropdown((p) => !p)}
                                className="inline-flex items-center justify-center rounded-xl p-2.5 text-gray-400 bg-white/5 hover:text-white transition duration-150 ease-in-out"
                            >
                                {showingNavigationDropdown ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* RESPONSIVE MENU (MOBILE VIEW) */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-slate-900 border-t border-white/5 transition-all duration-300'}>
                    <div className="space-y-1 pb-3 pt-2 px-2">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</ResponsiveNavLink>
                        
                        {isAdmin ? (
                            <>
                                <ResponsiveNavLink href={route('books.index')} active={route().current('books.*')}>Kelola Buku</ResponsiveNavLink>
                                <ResponsiveNavLink href={route('transactions.index')} active={route().current('transactions.*')}>Transaksi</ResponsiveNavLink>
                                <ResponsiveNavLink href={route('users.index')} active={route().current('users.*')}>Kelola Anggota</ResponsiveNavLink>
                                <ResponsiveNavLink href={route('reports.index')} active={route().current('reports.*')}>Laporan</ResponsiveNavLink>
                            </>
                        ) : (
                            <ResponsiveNavLink href={route('books.index')} active={route().current('books.*')}>Katalog Buku</ResponsiveNavLink>
                        )}
                    </div>

                    {/* MOBILE USER INFO */}
                    <div className="border-t border-white/5 pb-1 pt-4 px-4">
                        <div className="text-base font-bold text-white">{user.name}</div>
                        <div className="text-sm font-medium text-gray-500">{user.email}</div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profil Saya</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">Keluar</ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* AREA HEADER DINAMIS */}
            {header && (
                <header className="relative z-10">
                    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
                        <div className="font-black text-4xl tracking-tight text-white drop-shadow-sm">
                            {header}
                        </div>
                    </div>
                </header>
            )}

            {/* AREA KONTEN UTAMA */}
            <main className="relative z-10 pb-20">
                {children}
            </main>

            {/* FOOTER */}
            <footer className="relative z-10 py-10 text-center text-gray-600 text-[10px] font-black uppercase tracking-[0.5em]">
                &copy; 2026 PERPUSPRO DIGITAL SYSTEM • DEVELOPED BY DWI
            </footer>
        </div>
    );
}