import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Printer, FileText, Wallet } from 'lucide-react';

export default function Index({ auth, reports, total_pendapatan }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-black text-3xl text-white tracking-tight text-blue-900">Laporan Pengembalian</h2>
                    <Link href={route('dashboard')} className="text-blue-600 hover:underline flex items-center gap-2 font-bold">
                        <ArrowLeft size={18} /> Kembali ke Panel
                    </Link>
                </div>
            }
        >
            <Head title="Laporan Transaksi" />

            <div className="py-12 bg-blue-50/30 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Ringkasan Laporan */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-blue-100 mb-8 border border-blue-100 flex justify-between items-center">
                        <div className="flex items-center gap-6">
                            <div className="bg-emerald-500 p-4 rounded-2xl text-white shadow-lg">
                                <Wallet size={32} />
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Total Kas Denda</p>
                                <h3 className="text-3xl font-black text-slate-800">Rp {total_pendapatan.toLocaleString()}</h3>
                            </div>
                        </div>
                        <button 
                            onClick={() => window.print()} 
                            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-slate-800 transition shadow-lg active:scale-95"
                        >
                            <Printer size={20} /> CETAK LAPORAN
                        </button>
                    </div>

                    {/* Tabel Laporan */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-100 overflow-hidden border border-blue-100">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-400 text-xs font-black uppercase tracking-widest border-b">
                                    <th className="p-8">Siswa & Buku</th>
                                    <th className="p-8">Tgl Pinjam</th>
                                    <th className="p-8">Tgl Kembali</th>
                                    <th className="p-8 text-right">Denda</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {reports.length > 0 ? reports.map((item) => (
                                    <tr key={item.id} className="hover:bg-blue-50/50 transition-all">
                                        <td className="p-8">
                                            <div className="font-black text-slate-800">{item.user?.name}</div>
                                            <div className="text-sm text-blue-600 font-medium italic">{item.book?.judul}</div>
                                        </td>
                                        <td className="p-8 text-slate-600 font-bold">{item.tanggal_pinjam}</td>
                                        <td className="p-8 text-slate-600 font-bold">{item.tanggal_kembali}</td>
                                        <td className="p-8 text-right font-black text-red-500">
                                            {item.denda > 0 ? `Rp ${item.denda.toLocaleString()}` : '-'}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="p-20 text-center text-slate-400 font-bold italic">Belum ada data pengembalian.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}