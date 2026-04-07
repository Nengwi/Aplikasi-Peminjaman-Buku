import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function History({ auth, history }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Riwayat Peminjaman" />
            <div className="py-10 px-6 max-w-7xl mx-auto">
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-white uppercase tracking-widest">Riwayat Peminjaman</h2>
                    <p className="text-cyan-400 mt-1">Pantau status buku yang Anda pinjam di sini.</p>
                </div>

                <div className="bg-slate-900/50 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-md">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-cyan-400 font-bold uppercase text-xs tracking-widest">
                                <th className="p-6">Buku</th>
                                <th className="p-6">Tgl Pinjam</th>
                                <th className="p-6">Tgl Kembali</th>
                                <th className="p-6">Status</th>
                                <th className="p-6 text-right">Denda</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-300 divide-y divide-white/5">
                            {history.length > 0 ? history.map((item) => (
                                <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="p-6">
                                        <div className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                                            {item.book.judul}
                                        </div>
                                        <div className="text-[10px] text-slate-500 uppercase">{item.book.penulis}</div>
                                    </td>
                                    <td className="p-6 text-sm">{item.tanggal_pinjam}</td>
                                    <td className="p-6 text-sm">{item.tanggal_kembali || '-'}</td>
                                    <td className="p-6">
                                        {item.status === 'pinjam' ? (
                                            <span className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase bg-amber-400/10 px-3 py-1 rounded-full w-fit">
                                                <Clock size={12} /> Masih Dipinjam
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase bg-emerald-400/10 px-3 py-1 rounded-full w-fit">
                                                <CheckCircle2 size={12} /> Sudah Kembali
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-6 text-right font-mono font-bold text-white">
                                        {item.denda > 0 ? (
                                            <span className="text-red-500">Rp {item.denda.toLocaleString()}</span>
                                        ) : (
                                            <span className="text-slate-600">-</span>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="p-20 text-center text-slate-500 italic uppercase tracking-widest font-bold">
                                        Belum ada riwayat peminjaman.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}