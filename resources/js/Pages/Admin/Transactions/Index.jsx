import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Plus, User as UserIcon, Book as BookIcon, Search, X, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Index({ auth, transactions, filters = {} }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters?.search || '');

    // Logic Search Otomatis
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search !== (filters?.search || '')) {
                router.get(route('transactions.index'), { search: search }, {
                    preserveState: true,
                    replace: true
                });
            }
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="font-black text-3xl text-white tracking-tight uppercase">Riwayat Pinjam</h2>
                        <p className="text-blue-400 font-medium text-sm">Pantau sirkulasi buku perpustakaan</p>
                    </div>
                    
                    {/* TOMBOL HEADER YANG SUDAH DIKECILIN */}
                    <Link
                        href={route('transactions.create')}
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-black rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(79,70,229,0.4)] active:scale-95"
                    >
                        <Plus size={18} /> PINJAM BUKU BARU
                    </Link>
                </div>
            }
        >
            <Head title="Transaksi Peminjaman" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* FLASH MESSAGE */}
                    {flash.message && (
                        <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-sm font-bold flex items-center gap-3">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                            {flash.message}
                        </div>
                    )}

                    {/* SEARCH BAR */}
                    <div className="mb-6 flex justify-end">
                        <div className="relative w-full md:w-80 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400" size={18} />
                            <input
                                type="text"
                                placeholder="Cari peminjam..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-white text-sm focus:ring-2 focus:ring-blue-500/50 transition-all"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* TABLE CONTAINER */}
                    <div className="bg-[#0f172a] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 text-blue-400 uppercase text-[10px] font-black tracking-[0.2em]">
                                        <th className="p-6">Peminjam & Buku</th>
                                        <th className="p-6 text-center">Tanggal Pinjam</th>
                                        <th className="p-6 text-center">Status</th>
                                        <th className="p-6 text-right">Opsi</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-300 divide-y divide-white/5">
                                    {transactions.length > 0 ? transactions.map((trx) => (
                                        <tr key={trx.id} className="hover:bg-white/[0.02] transition-all group">
                                            <td className="p-6">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <UserIcon size={14} className="text-blue-400" />
                                                        <span className="text-white font-bold">{trx.user?.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 italic">
                                                        <BookIcon size={12} />
                                                        <span>{trx.book?.judul}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6 text-center">
                                                <span className="text-sm font-medium text-gray-400">{trx.tanggal_pinjam}</span>
                                            </td>
                                            <td className="p-6 text-center">
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                    trx.status === 'pinjam' 
                                                    ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                                                    : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                                }`}>
                                                    {trx.status}
                                                </span>
                                            </td>
                                            <td className="p-6 text-right">
                                                {/* TOMBOL ACTION (MISALNYA KEMBALIKAN) */}
                                                <button className="text-[10px] font-black text-blue-400 hover:text-white transition-colors uppercase tracking-widest">
                                                    Detail
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="p-20 text-center text-gray-600 font-bold italic">
                                                Belum ada data transaksi ditemukan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}