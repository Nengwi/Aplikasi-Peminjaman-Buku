import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, ArrowLeft, User, Book, Calendar } from 'lucide-react';

export default function Create({ auth, users, books }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        book_id: '',
        tanggal_pinjam: new Date().toISOString().split('T')[0], // Default hari ini
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('transactions.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-black text-4xl text-white tracking-tight">Pinjam Buku</h2>
                    <Link href={route('transactions.index')} className="text-gray-400 hover:text-white flex items-center gap-2 transition">
                        <ArrowLeft size={20} /> Kembali
                    </Link>
                </div>
            }
        >
            <Head title="Tambah Peminjaman" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

                        <div className="space-y-8">
                            {/* PILIH USER */}
                            <div>
                                <label className="flex items-center gap-2 text-blue-400 font-black uppercase text-xs tracking-widest mb-3">
                                    <User size={14} /> Pilih Peminjam
                                </label>
                                <select 
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:ring-2 focus:ring-blue-500/50 appearance-none"
                                    value={data.user_id}
                                    onChange={e => setData('user_id', e.target.value)}
                                >
                                    <option value="" className="bg-slate-900">-- Pilih Siswa --</option>
                                    {users.map(user => (
                                        <option key={user.id} value={user.id} className="bg-slate-900">{user.name}</option>
                                    ))}
                                </select>
                                {errors.user_id && <div className="text-red-500 text-xs mt-2 font-bold">{errors.user_id}</div>}
                            </div>

                            {/* PILIH BUKU */}
                            <div>
                                <label className="flex items-center gap-2 text-blue-400 font-black uppercase text-xs tracking-widest mb-3">
                                    <Book size={14} /> Pilih Buku
                                </label>
                                <select 
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:ring-2 focus:ring-blue-500/50 appearance-none"
                                    value={data.book_id}
                                    onChange={e => setData('book_id', e.target.value)}
                                >
                                    <option value="" className="bg-slate-900">-- Pilih Judul Buku --</option>
                                    {books.map(book => (
                                        <option key={book.id} value={book.id} className="bg-slate-900">{book.judul} (Stok: {book.stok})</option>
                                    ))}
                                </select>
                                {errors.book_id && <div className="text-red-500 text-xs mt-2 font-bold">{errors.book_id}</div>}
                            </div>

                            {/* TANGGAL PINJAM */}
                            <div>
                                <label className="flex items-center gap-2 text-blue-400 font-black uppercase text-xs tracking-widest mb-3">
                                    <Calendar size={14} /> Tanggal Pinjam
                                </label>
                                <input 
                                    type="date"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:ring-2 focus:ring-blue-500/50"
                                    value={data.tanggal_pinjam}
                                    onChange={e => setData('tanggal_pinjam', e.target.value)}
                                />
                            </div>

                            {/* BUTTON SUBMIT */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 rounded-2xl transition shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 active:scale-[0.98]"
                            >
                                <Save size={20} /> {processing ? 'MEMPROSES...' : 'SIMPAN TRANSAKSI'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}