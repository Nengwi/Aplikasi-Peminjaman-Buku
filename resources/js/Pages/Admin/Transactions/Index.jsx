import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Plus, BookmarkCheck, User as UserIcon, Book as BookIcon, Search, X, Calendar, ArrowRightLeft } from 'lucide-react';
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
                        <h2 className="font-black text-4xl text-white tracking-tight">Riwayat Pinjam</h2>
                        <p className="text-blue-400 font-medium mt-1">Pantau sirkulasi buku perpustakaan</p>
                    </div>
                    <Link
                        href={route('transactions.create')}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-black transition shadow-xl shadow-indigo-500/30 active:scale-95 hover:-translate-y-1"
                    >
                        <Plus size={20} /> PINJAM BUKU BARU
                    </Link>
                </div>
            }
        >
            <Head title="Transaksi Peminjaman" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* FLASH MESSAGE */}
                    {flash.message && (
                        <div className="mb-8 p-5 bg-emerald-500/20 border border-emerald-500/50 rounded-[2rem] text-emerald-400 font-bold backdrop-blur-md flex items-center gap-3">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                            {flash.message}
                        </div>
                    )}

                    {/* SEARCH BAR */}
                    <div className="mb-6 flex justify-end">
                        <div className="relative w-full md:w-1/3 group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                                <Search size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="Cari nama peminjam atau judul..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all backdrop-blur-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {search && (
                                <button onClick={() => setSearch('')} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500">
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* TABLE CONTAINER */}
                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500"></div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 text-blue-400 uppercase text-xs font-black tracking-[0.2em]">
                                        <th className="p-8">Peminjam & Buku</th>
                                        <th className="p-8 text-center">Tanggal Pinjam</th>
                                        <th className="p-8 text-center">Status</th>
                                        <th className="p-8 text-right">Opsi</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-300 divide-y divide-white/5">
                                    {transactions.length > 0 ? transactions.map((trx) => (
                                        <tr key={trx.id} className="hover:bg-white/10 transition-all group">
                                            <td className="p-8">
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                                                            <UserIcon size={16} />
                                                        </div>
                                                        <span className="text-white font-black text-lg">{trx.user?.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 ml-1">
                                                        <div className="w-px h-4 bg-white/20 ml-4"></div>
                                                        <BookIcon size={14} className="text-gray-500" />
                                                        <span className="text-sm text-gray-400 font-medium italic">{trx.book?.judul}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-8 text-center">
                                                <div className="flex flex-col items-center gap-1">
                                                    <Calendar size={16} className="text-indigo-400" />
                                                    <span className="font-bold text-white">{trx.tanggal_pinjam}</span>
                                                </div>
                                            </td>
                                            <td className="p-8 text-center">
                                                <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                                    trx.status === 'pinjam' 
                                                    ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
                                                    : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                                }`}>
                                                    {trx.status}
                                                </span>
                                            </td>
                                            <td className="p-8 text-right">
                                                {trx.status === 'pinjam' && (
                                                    <button 
                                                        className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-lg flex items-center gap-2 ml-auto font-black text-xs"
                                                        onClick={() => { if(confirm('Buku sudah dikembalikan?')) router.put(route('transactions.update', trx.id)) }}
                                                    >
                                                        <ArrowRightLeft size={16} /> KEMBALIKAN
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="p-32 text-center text-gray-600 font-bold">
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