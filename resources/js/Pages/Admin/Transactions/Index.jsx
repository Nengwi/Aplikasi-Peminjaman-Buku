import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { User as UserIcon, Book as BookIcon, Search, CheckCircle, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Index({ auth, transactions, filters = {} }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters?.search || '');

    // Logic Search Otomatis (Debounce)
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

    // Fungsi Handle Pengembalian
    const handleReturn = (id, judul, nama) => {
        Swal.fire({
            title: 'Proses Pengembalian?',
            text: `Konfirmasi pengembalian buku "${judul}" oleh ${nama}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#10b981', // Emerald 500
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, Sudah Kembali!',
            cancelButtonText: 'Batal',
            background: '#0f172a',
            color: '#fff'
        }).then((result) => {
            if (result.isConfirmed) {
                router.patch(route('transactions.update', id));
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="font-black text-3xl text-white tracking-tight uppercase">Riwayat Pinjam</h2>
                        <p className="text-blue-400 font-medium mt-2">Pantau sirkulasi buku perpustakaan</p>
                    </div>
                </div>
            }
        >
            <Head title="Transaksi Peminjaman" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* FLASH MESSAGE */}
                    {(flash.message || flash.error) && (
                        <div className={`mb-8 p-5 ${flash.error ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'} border rounded-2xl font-bold backdrop-blur-md flex items-center gap-3 animate-pulse`}>
                            <div className={`w-2 h-2 ${flash.error ? 'bg-red-500' : 'bg-emerald-500'} rounded-full animate-ping`}></div>
                            {flash.message || flash.error}
                        </div>
                    )}

                    {/* SEARCH BAR */}
                    <div className="mb-6 flex justify-end">
                        <div className="relative w-full md:w-80 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400" size={18} />
                            <input
                                type="text"
                                placeholder="Cari nama peminjam..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-white text-sm focus:ring-2 focus:ring-blue-500/50 transition-all"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* TABLE CONTAINER */}
                    <div className="bg-[#0f172a] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500"></div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 text-blue-400 uppercase text-[12px] font-black tracking-[0.2em]">
                                        <th className="p-6">Peminjam & Buku</th>
                                        <th className="p-6 text-center">Tanggal Pinjam</th>
                                        <th className="p-6 text-center">Tanggal Kembali</th>
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

                                            {/* TANGGAL PINJAM */}
                                            <td className="p-6 text-center">
                                                <span className="text-sm font-medium text-gray-400">{trx.tanggal_pinjam}</span>
                                            </td>

                                            {/* TANGGAL KEMBALI (YANG BARU) */}
                                            <td className="p-6 text-center">
                                                {trx.tanggal_kembali ? (
                                                    <span className="text-sm font-bold text-emerald-400">
                                                        {trx.tanggal_kembali}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-gray-600 italic font-medium">Masih Dipinjam</span>
                                                )}
                                            </td>

                                            <td className="p-6 text-center">
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-1 w-fit mx-auto ${trx.status === 'pinjam'
                                                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                                                        : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                                    }`}>
                                                    {trx.status === 'pinjam' ? <Clock size={10} /> : <CheckCircle size={10} />}
                                                    {trx.status}
                                                </span>
                                            </td>

                                            <td className="p-6 text-right">
                                                {trx.status === 'pinjam' ? (
                                                    <button
                                                        onClick={() => handleReturn(trx.id, trx.book?.judul, trx.user?.name)}
                                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black rounded-lg transition-all active:scale-95 uppercase tracking-tighter"
                                                    >
                                                        Konfirmasi Kembali
                                                    </button>
                                                ) : (
                                                    <div className="text-[10px] text-gray-500 font-bold uppercase">
                                                        Denda: <span className={trx.denda > 0 ? 'text-red-400' : 'text-emerald-400'}>
                                                            Rp {trx.denda ? trx.denda.toLocaleString('id-ID') : 0}
                                                        </span>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="p-20 text-center text-gray-600 font-bold italic">
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