import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { BookOpen, User as UserIcon, LogOut } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const isAdmin = user.roles.includes('admin');

    return (
        // BACKGROUND UTAMA: Biru sangat gelap dengan efek gradient halus
        <div className="min-h-screen bg-[#0f172a] relative overflow-hidden">
            
            {/* EFEK CAHAYA (GLOW) DI BACKGROUND */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -z-10"></div>

            {/* NAVIGASI */}
            <nav className="border-b border-white/5 bg-white/5 backdrop-blur-xl sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 justify-between items-center">
                        <div className="flex items-center gap-10">
                            <Link href="/" className="flex items-center gap-2 group">
                                <div className="p-2 bg-blue-500 rounded-xl text-white shadow-lg shadow-blue-500/50">
                                    <BookOpen size={24} />
                                </div>
                                <span className="font-black text-2xl tracking-tighter text-white">
                                    PERPUS<span className="text-blue-400">PRO</span>
                                </span>
                            </Link>

                            <div className="hidden space-x-6 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')} className="text-gray-400 hover:text-white">
                                    Dashboard
                                </NavLink>
                                {isAdmin && (
                                    <NavLink href={route('books.index')} active={route().current('books.*')} className="text-gray-400 hover:text-white">
                                        Kelola Buku
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-sm">
                                            {user.name.charAt(0)}
                                        </div>
                                        <span className="font-bold text-sm">{user.name}</span>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content align="right" contentClasses="bg-slate-900 border border-white/10 text-white">
                                    <Dropdown.Link href={route('profile.edit')} className="text-gray-300 hover:bg-white/5">Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button" className="text-red-400 hover:bg-white/5">Log Out</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>

            {/* HEADER AREA: Teks Putih agar kontras */}
            {header && (
                <header className="relative z-10">
                    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                        <div className="text-white drop-shadow-md">
                            {header}
                        </div>
                    </div>
                </header>
            )}

            {/* CONTENT AREA */}
            <main className="relative z-10 pb-20">
                {children}
            </main>
        </div>
    );
}