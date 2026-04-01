import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Edit3, ArrowLeft, Save } from 'lucide-react';

export default function Edit({ auth, book }) {
    const { data, setData, put, processing, errors } = useForm({
        judul: book.judul || '',
        penulis: book.penulis || '',
        penerbit: book.penerbit || '',
        tahun_terbit: book.tahun_terbit || '',
        stok: book.stok || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('books.update', book.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4 text-white font-black">
                    <Link href={route('books.index')} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition">
                        <ArrowLeft size={24} />
                    </Link>
                    <h2 className="text-3xl tracking-tight">Edit Data Buku</h2>
                </div>
            }
        >
            <Head title="Edit Buku" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[2.5rem] p-10 relative overflow-hidden">
                        
                        <form onSubmit={handleSubmit} className="relative z-10 space-y-6 text-white">
                            <div>
                                <label className="block text-gray-400 font-bold mb-2 ml-1 text-xs uppercase">Judul Buku</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-900/50 border-white/10 rounded-2xl py-4 px-6 focus:border-blue-500 focus:ring-blue-500"
                                    value={data.judul}
                                    onChange={(e) => setData('judul', e.target.value)}
                                />
                                {errors.judul && <div className="text-red-400 text-xs mt-2">{errors.judul}</div>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-400 font-bold mb-2 ml-1 text-xs uppercase">Penerbit</label>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-900/50 border-white/10 rounded-2xl py-4 px-6"
                                        value={data.penerbit}
                                        onChange={(e) => setData('penerbit', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 font-bold mb-2 ml-1 text-xs uppercase">Stok</label>
                                    <input
                                        type="number"
                                        className="w-full bg-slate-900/50 border-white/10 rounded-2xl py-4 px-6"
                                        value={data.stok}
                                        onChange={(e) => setData('stok', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="pt-6 flex gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black py-5 rounded-2xl shadow-xl transition hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                                >
                                    <Save size={20} /> UPDATE DATA
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}