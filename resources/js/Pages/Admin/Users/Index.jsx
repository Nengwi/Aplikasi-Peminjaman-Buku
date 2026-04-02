import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Users, UserPlus, Trash2, Search, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Index({ auth, users, filters }) {
    // 1. State untuk pencarian
    const [search, setSearch] = useState(filters.search || '');
    const [isSearching, setIsSearching] = useState(false);

    const { data, setData, post, reset, processing, errors } = useForm({
        name: '', 
        email: '', 
        password: 'password123' // password default
    });

    // 2. Efek Debounce untuk Pencarian
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search !== (filters.search || '')) {
                setIsSearching(true);
                router.get(
                    route('users.index'),
                    { search: search },
                    { 
                        preserveState: true, 
                        replace: true,
                        onFinish: () => setIsSearching(false) 
                    }
                );
            }
        }, 400); // Tunggu 0.4 detik setelah user berhenti mengetik

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const submit = (e) => {
        e.preventDefault();
        post(route('users.store'), { 
            onSuccess: () => reset(),
            preserveScroll: true
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-black text-4xl text-white tracking-tight">Kelola Anggota</h2>}
        >
            <Head title="Manajemen Anggota" />

            <div className="py-12 px-4 max-w-7xl mx-auto">
                
                {/* BAGIAN ATAS: SEARCH BAR */}
                <div className="mb-8 relative max-w-xl">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-400">
                        {isSearching ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <Search size={20} />
                        )}
                    </div>
                    <input 
                        type="text"
                        placeholder="Cari nama atau email anggota..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-500 transition-all shadow-2xl backdrop-blur-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* FORM TAMBAH ANGGOTA */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] h-fit sticky top-24">
                        <h3 className="text-white font-black text-xl mb-6 flex items-center gap-2">
                            <UserPlus className="text-blue-400" /> Tambah Siswa
                        </h3>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <input 
                                    type="text" placeholder="Nama Lengkap"
                                    className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-2xl py-3 px-4 text-white focus:border-blue-500 transition`}
                                    value={data.name} onChange={e => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1 ml-2">{errors.name}</p>}
                            </div>

                            <div>
                                <input 
                                    type="email" placeholder="Email (untuk login)"
                                    className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-2xl py-3 px-4 text-white focus:border-blue-500 transition`}
                                    value={data.email} onChange={e => setData('email', e.target.value)}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1 ml-2">{errors.email}</p>}
                            </div>

                            <button 
                                disabled={processing}
                                className="w-full bg-blue-600 text-white font-black py-3 rounded-2xl hover:bg-blue-500 transition shadow-lg shadow-blue-600/20 disabled:opacity-50"
                            >
                                {processing ? 'MENYIMPAN...' : 'SIMPAN ANGGOTA'}
                            </button>
                        </form>
                    </div>

                    {/* DAFTAR TABEL ANGGOTA */}
                    <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <h3 className="text-white font-bold flex items-center gap-2">
                                <Users size={18} className="text-blue-400" /> 
                                Daftar Anggota ({users.length})
                            </h3>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-blue-400 text-xs font-black uppercase tracking-widest">
                                    <tr>
                                        <th className="p-6">Nama & Email</th>
                                        <th className="p-6 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-gray-300">
                                    {users.length > 0 ? (
                                        users.map(user => (
                                            <tr key={user.id} className="hover:bg-white/5 transition group">
                                                <td className="p-6">
                                                    <div className="font-bold text-white group-hover:text-blue-400 transition">{user.name}</div>
                                                    <div className="text-sm text-gray-500">{user.email}</div>
                                                </td>
                                                <td className="p-6 text-right">
                                                    {/* Admin tidak bisa hapus dirinya sendiri lewat sini (keamanan dasar) */}
                                                    {auth.user.id !== user.id && (
                                                        <button 
                                                            onClick={() => confirm(`Hapus anggota ${user.name}?`) && router.delete(route('users.destroy', user.id))}
                                                            className="text-red-400 hover:text-white hover:bg-red-600 p-2 rounded-xl transition"
                                                            title="Hapus Anggota"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2" className="p-10 text-center text-gray-500 italic">
                                                Data anggota tidak ditemukan...
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