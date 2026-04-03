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

    // LOGIKA ADMIN: Pastikan ini sesuai dengan cara kamu menentukan admin
    const isAdmin = user.role === 'admin' || user.email === 'admin@gmail.com';

    return (
        <div className="min-h-screen bg-[#0f172a] relative z-0 overflow-hidden font-sans text-slate-200">
            {/* BACKGROUND GLOW */}
            <div className="pointer-events-none absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
            
            {/* NAVBAR */}
            <nav className="relative z-[100] border-b border-white/5 bg-slate-900/80 backdrop-blur-xl sticky top-0 shadow-2xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 justify-between items-center">
                        
                        <div className="flex items-center gap-10">
                            {/* LOGO */}
                            <Link href="/" className="flex items-center gap-2 group relative z-[110]">
                                <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/50 group-hover:rotate-6 transition-transform duration-300">
                                    <BookOpen size={24} />
                                </div>
                                <span className="font-black text-2xl tracking-tighter text-white uppercase">
                                    PERPUS<span className="text-blue-400">PRO</span>
                                </span>
                            </Link>

                            {/* NAVIGASI DESKTOP */}
                            <div className="hidden space-x-4 sm:flex sm:ms-4 relative z-[110]">
                                {isAdmin && (
                                    <NavLink href={route('dashboard')} active={route().current('dashboard')} className="text-gray-400 hover:text-white transition-all font-bold">
                                        <div className="flex items-center gap-2">
                                            <LayoutDashboard size={18} /> <span>Dashboard</span>
                                        </div>
                                    </NavLink>
                                )}

                                {/* MENU BUKU (Teks Berbeda untuk Admin/User) */}
                                <NavLink href={route('books.index')} active={route().current('books.*')} className="text-gray-400 hover:text-white font-bold">
                                    <div className="flex items-center gap-2">
                                        <Book size={18} /> 
                                        <span>{isAdmin ? 'Kelola Buku' : 'Daftar Buku'}</span>
                                    </div>
                                </NavLink>

                                {isAdmin && (
                                    <>
                                        <NavLink href={route('transactions.index')} active={route().current('transactions.*')} className="text-gray-400 hover:text-white font-bold">
                                            <div className="flex items-center gap-2">
                                                <BookmarkCheck size={18} /> <span>Transaksi</span>
                                            </div>
                                        </NavLink>
                                        <NavLink href={route('users.index')} active={route().current('users.*')} className="text-gray-400 hover:text-white font-bold">
                                            <div className="flex items-center gap-2">
                                                <Users size={18} /> <span>Anggota</span>
                                            </div>
                                        </NavLink>
                                        {/* MENU LAPORAN YANG TADI ILANG */}
                                        <NavLink href={route('reports.index')} active={route().current('reports.*')} className="text-gray-400 hover:text-white font-bold">
                                            <div className="flex items-center gap-2">
                                                <FileText size={18} /> <span>Laporan</span>
                                            </div>
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* KANAN: USER INFO */}
                        <div className="hidden sm:flex sm:items-center">
                            <div className="flex flex-col items-end mr-4">
                                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">
                                    {isAdmin ? 'ADMINISTRATOR' : 'SISWA'}
                                </span>
                            </div>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all">
                                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center font-black uppercase shadow-lg">
                                            {user.name.charAt(0)}
                                        </div>
                                        <span className="font-bold text-sm tracking-tight">{user.name}</span>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content align="right" contentClasses="bg-slate-900 border border-white/10">
                                    <Dropdown.Link href={route('profile.edit')} className="text-gray-300">My Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button" className="text-red-400 font-bold">Log Out</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* MOBILE MENU BUTTON */}
                        <div className="sm:hidden">
                            <button onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)} className="text-gray-400 p-2">
                                {showingNavigationDropdown ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* MOBILE NAV */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-slate-900 border-t border-white/5'}>
                    <div className="pt-2 pb-3 space-y-1">
                        {isAdmin && <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</ResponsiveNavLink>}
                        <ResponsiveNavLink href={route('books.index')} active={route().current('books.*')}>{isAdmin ? 'Kelola Buku' : 'Daftar Buku'}</ResponsiveNavLink>
                        {isAdmin && (
                            <>
                                <ResponsiveNavLink href={route('transactions.index')} active={route().current('transactions.*')}>Transaksi</ResponsiveNavLink>
                                <ResponsiveNavLink href={route('users.index')} active={route().current('users.*')}>Anggota</ResponsiveNavLink>
                                <ResponsiveNavLink href={route('reports.index')} active={route().current('reports.*')}>Laporan</ResponsiveNavLink>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* HEADER DINAMIS */}
            {header && (
                <header className="relative z-10 mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
                    <div className="text-2xl font-black text-white">{header}</div>
                </header>
            )}

            {/* MAIN CONTENT */}
            <main className="relative z-10">{children}</main>
        </div>
    );
}