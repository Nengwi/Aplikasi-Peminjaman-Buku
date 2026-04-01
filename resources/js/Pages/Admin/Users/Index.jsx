import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Users, UserPlus, Trash2, Mail, Search } from 'lucide-react';
import { useState } from 'react';

export default function Index({ auth, users, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const { data, setData, post, reset, processing, errors } = useForm({
        name: '', email: '', password: 'password123' // password default
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('users.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-black text-4xl text-white tracking-tight">Kelola Anggota</h2>}
        >
            <Head title="Manajemen Anggota" />

            <div className="py-12 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* FORM TAMBAH ANGGOTA */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem]">
                    <h3 className="text-white font-black text-xl mb-6 flex items-center gap-2">
                        <UserPlus className="text-blue-400" /> Tambah Siswa
                    </h3>
                    <form onSubmit={submit} className="space-y-4">
                        <input 
                            type="text" placeholder="Nama Lengkap"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white"
                            value={data.name} onChange={e => setData('name', e.target.value)}
                        />
                        <input 
                            type="email" placeholder="Email (untuk login)"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white"
                            value={data.email} onChange={e => setData('email', e.target.value)}
                        />
                        <button className="w-full bg-blue-600 text-white font-black py-3 rounded-2xl hover:bg-blue-500 transition">
                            SIMPAN ANGGOTA
                        </button>
                    </form>
                </div>

                {/* DAFTAR TABEL ANGGOTA */}
                <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-blue-400 text-xs font-black uppercase tracking-widest">
                            <tr>
                                <th className="p-6">Nama & Email</th>
                                <th className="p-6 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-300">
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-white/5 transition">
                                    <td className="p-6">
                                        <div className="font-bold text-white">{user.name}</div>
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </td>
                                    <td className="p-6 text-right">
                                        <button 
                                            onClick={() => confirm('Hapus anggota ini?') && router.delete(route('users.destroy', user.id))}
                                            className="text-red-400 hover:text-red-600 p-2"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}