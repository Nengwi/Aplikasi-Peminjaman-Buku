import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Users, UserPlus, Trash2, Search, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Index({ auth, users, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [isSearching, setIsSearching] = useState(false);

    const { data, setData, post, reset, processing, errors } = useForm({
        name: '', 
        email: '', 
        password: 'password123' 
    });

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search !== (filters.search || '')) {
                setIsSearching(true);
                router.get(route('users.index'), { search: search }, { 
                    preserveState: true, 
                    replace: true,
                    onFinish: () => setIsSearching(false) 
                });
            }
        }, 400);
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const submit = (e) => {
        e.preventDefault();
        post(route('users.store'), { 
            onSuccess: () => {
                reset();
                Swal.fire('Berhasil!', 'Anggota baru telah ditambahkan.', 'success');
            },
            preserveScroll: true
        });
    };

    const handleDelete = (user) => {
        Swal.fire({
            title: 'Hapus Anggota?',
            text: `Data ${user.name} akan dihapus permanen!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Ya, Hapus!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('users.destroy', user.id));
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-black text-4xl text-white tracking-tight">Kelola Anggota</h2>}>
            <Head title="Manajemen Anggota" />
            <div className="py-12 px-4 max-w-7xl mx-auto">
                <div className="mb-8 relative max-w-xl">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-400">
                        {isSearching ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
                    </div>
                    <input type="text" placeholder="Cari nama atau email..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-500 transition-all" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] h-fit sticky top-24">
                        <h3 className="text-white font-black text-xl mb-6 flex items-center gap-2"><UserPlus className="text-blue-400" /> Tambah Siswa</h3>
                        <form onSubmit={submit} className="space-y-4">
                            <input type="text" placeholder="Nama Lengkap" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white" value={data.name} onChange={e => setData('name', e.target.value)} />
                            <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white" value={data.email} onChange={e => setData('email', e.target.value)} />
                            <button disabled={processing} className="w-full bg-blue-600 text-white font-black py-3 rounded-2xl hover:bg-blue-500 transition">
                                {processing ? 'MENYIMPAN...' : 'SIMPAN ANGGOTA'}
                            </button>
                        </form>
                    </div>

                    <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-blue-400 text-xs font-black uppercase tracking-widest">
                                <tr><th className="p-6">Nama & Email</th><th className="p-6 text-right">Aksi</th></tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-gray-300">
                                {users.map(user => (
                                    <tr key={user.id} className="hover:bg-white/5 transition group">
                                        <td className="p-6">
                                            <div className="font-bold text-white">{user.name}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </td>
                                        <td className="p-6 text-right">
                                            {auth.user.id !== user.id && (
                                                <button onClick={() => handleDelete(user)} className="text-red-400 hover:text-white hover:bg-red-600 p-2 rounded-xl transition"><Trash2 size={18} /></button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}