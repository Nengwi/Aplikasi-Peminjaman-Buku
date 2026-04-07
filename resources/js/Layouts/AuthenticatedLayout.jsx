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
    Users,
    Menu,
    X,
    FileText,
    Clock 
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // Cek apakah admin sesuai database kamu
    const isAdmin = user.role === 'admin' || user.email === 'admin@gmail.com';

    return (
        <div className="min-h-screen bg-[#020617] font-sans text-slate-200 relative overflow-x-hidden">
            
            {/* BACKGROUND GLOW */}
            <div className="pointer-events-none fixed top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
            </div>
            
            {/* NAVBAR */}
            <nav className="relative z-[100] border-b border-white/5 bg-slate-900/80 backdrop-blur-xl sticky top-0 shadow-2xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 justify-between items-center">
                        
                        <div className="flex items-center gap-10">
                            {/* LOGO */}
                            <Link href="/" className="flex items-center gap-2 group">
                                <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/50 group-hover:rotate-6 transition-transform duration-300">
                                    <BookOpen size={24} />
                                </div>
                                <span className="font-black text-2xl tracking-tighter text-white uppercase">
                                    PERPUS<span className="text-blue-400">PRO</span>
                                </span>
                            </Link>

                            {/* NAVIGASI DESKTOP */}
                            <div className="hidden space-x-4 sm:flex sm:ms-4">
                                {isAdmin && (
                                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                        <div className="flex items-center gap-2">
                                            <LayoutDashboard size={18} /> <span>Dashboard</span>
                                        </div>
                                    </NavLink>
                                )}

                                <NavLink href={route('books.index')} active={route().current('books.*')}>
                                    <div className="flex items-center gap-2">
                                        <Book size={18} /> 
                                        <span>{isAdmin ? 'Kelola Buku' : 'Katalog Buku'}</span>
                                    </div>
                                </NavLink>

                                {/* MENU KHUSUS SISWA (RIWAYAT) */}
                                {!isAdmin && (
                                    <NavLink 
                                        href={route('transactions.history')} 
                                        active={route().current('transactions.history')}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Clock size={18} /> <span>Riwayat Pinjam</span>
                                        </div>
                                    </NavLink>
                                )}

                                {/* MENU KHUSUS ADMIN */}
                                {isAdmin && (
                                    <>
                                        <NavLink href={route('transactions.index')} active={route().current('transactions.*')}>
                                            <div className="flex items-center gap-2">
                                                <BookmarkCheck size={18} /> <span>Transaksi</span>
                                            </div>
                                        </NavLink>
                                        
                                        <NavLink href={route('users.index')} active={route().current('users.*')}>
                                            <div className="flex items-center gap-2">
                                                <Users size={18} /> <span>Pengguna</span>
                                            </div>
                                        </NavLink>

                                        <NavLink href={route('reports.index')} active={route().current('reports.*')}>
                                            <div className="flex items-center gap-2">
                                                <FileText size={18} /> <span>Laporan</span>
                                            </div>
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* KANAN: USER INFO */}
                        <div className="hidden sm:flex sm:items-center gap-4">
                            <div className="flex flex-col items-end leading-none">
                                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                                    {isAdmin ? 'ADMINISTRATOR' : 'PENGGUNA'}
                                </span>
                            </div>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all active:scale-95">
                                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center font-black uppercase shadow-lg text-xs text-white">
                                            {user.name.charAt(0)}
                                        </div>
                                        <span className="font-bold text-sm tracking-tight">{user.name}</span>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content align="right" contentClasses="bg-slate-900 border border-white/10 py-2">
                                    <Dropdown.Link href={route('profile.edit')}>Profil Saya</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button" className="text-red-400 font-bold w-full text-left">
                                        Keluar
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* MOBILE MENU BUTTON */}
                        <div className="sm:hidden">
                            <button onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)} className="text-gray-400 p-2 hover:bg-white/5 rounded-lg transition-colors">
                                {showingNavigationDropdown ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* MOBILE NAV */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-slate-900 border-t border-white/5'}>
                    <div className="pt-2 pb-3 space-y-1 px-4">
                        {isAdmin && <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</ResponsiveNavLink>}
                        <ResponsiveNavLink href={route('books.index')} active={route().current('books.*')}>{isAdmin ? 'Kelola Buku' : 'Katalog Buku'}</ResponsiveNavLink>
                        
                        {!isAdmin && (
                            <ResponsiveNavLink href={route('transactions.history')} active={route().current('transactions.history')}>
                                Riwayat Pinjam
                            </ResponsiveNavLink>
                        )}

                        {isAdmin && (
                            <>
                                <ResponsiveNavLink href={route('transactions.index')} active={route().current('transactions.*')}>Transaksi</ResponsiveNavLink>
                                <ResponsiveNavLink href={route('users.index')} active={route().current('users.*')}>Pengguna</ResponsiveNavLink>
                                <ResponsiveNavLink href={route('reports.index')} active={route().current('reports.*')}>Laporan</ResponsiveNavLink>
                            </>
                        )}
                        <div className="pt-4 pb-1 border-t border-white/10 mt-4">
                            <div className="font-bold text-white px-3">{user.name}</div>
                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('logout')} method="post" as="button" className="text-red-400 w-full text-left">Keluar</ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* HEADER */}
            {header && (
                <header className="relative z-10 mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
                    <div className="text-2xl font-black text-white uppercase tracking-tighter border-l-4 border-blue-500 pl-4 italic">
                        {header}
                    </div>
                </header>
            )}

            {/* MAIN CONTENT */}
            <main className="relative z-20">
                {children}
            </main>
        </div>
    );
}