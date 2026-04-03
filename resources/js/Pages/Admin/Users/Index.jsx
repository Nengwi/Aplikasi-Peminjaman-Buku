import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { UserPlus, Trash2, User as UserIcon, Search, X } from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function Index({ auth, users }) {
    const [showModal, setShowModal] = useState(false);

    // Gunakan delete dari useForm (alias 'destroy')
    const { data, setData, post, delete: destroy, processing, reset, errors } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const handleDelete = (id, name) => {
        Swal.fire({
            title: 'Hapus Pengguna?',
            text: `Data ${name} bakal hilang selamanya, Dwi!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('users.destroy', id), {
                    onSuccess: () => Swal.fire('Terhapus!', 'Pengguna berhasil dibuang.', 'success')
                });
            }
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('users.store'), {
            onSuccess: () => {
                setShowModal(false);
                reset();
                Swal.fire('Berhasil!', 'Pengguna baru sudah terdaftar.', 'success');
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-black text-2xl text-white tracking-tighter uppercase">👥 Kelola Pengguna</h2>}
        >
            <Head title="Kelola Pengguna" />

            <div className="py-12 bg-[#020617] min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Header & Search */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 h-5 w-5" />
                            <input 
                                type="text" 
                                placeholder="Cari nama atau email..."
                                className="w-full bg-slate-900 border-2 border-blue-500/20 rounded-2xl py-3 pl-12 text-white focus:border-blue-500 transition-all outline-none"
                            />
                        </div>
                        
                        <button 
                            onClick={() => setShowModal(true)}
                            className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95"
                        >
                            <UserPlus size={20} />
                            TAMBAH PENGGUNA
                        </button>
                    </div>

                    {/* Grid Daftar Pengguna */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {users.map((user) => (
                            <div key={user.id} className="group bg-slate-900 border-2 border-white/5 p-6 rounded-[32px] hover:border-blue-500/50 transition-all duration-300 relative overflow-hidden">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-4 bg-blue-600/20 rounded-2xl text-blue-400 border border-blue-500/20">
                                        <UserIcon size={24} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <h3 className="text-white font-black text-lg truncate uppercase">{user.name}</h3>
                                        <p className="text-slate-500 text-xs font-bold truncate italic tracking-tight underline">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-white/5 text-white">
                                     <span className="text-[10px] font-black tracking-widest text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full uppercase">
                                        Pengguna Aktif
                                    </span>
                                    {user.email !== auth.user.email && (
                                        <button onClick={() => handleDelete(user.id, user.name)} className="p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
                                            <Trash2 size={20} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* MODAL FORM TAMBAH */}
                    {showModal && (
                        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                            <div className="bg-slate-900 border-2 border-blue-500/30 w-full max-w-md rounded-[32px] p-8 relative shadow-[0_0_50px_rgba(37,99,235,0.2)]">
                                <button onClick={() => setShowModal(false)} className="absolute right-6 top-6 text-slate-500 hover:text-white">
                                    <X size={24} />
                                </button>
                                <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">Tambah Pengguna Baru</h3>
                                
                                <form onSubmit={submit} className="space-y-4">
                                    <div>
                                        <label className="block text-blue-400 text-[10px] font-black mb-1 ml-1 uppercase">Nama Lengkap</label>
                                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full bg-slate-800 border-none rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-blue-500 transition-all" required />
                                        {errors.name && <p className="text-red-500 text-xs mt-1 font-bold">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-blue-400 text-[10px] font-black mb-1 ml-1 uppercase">Email Address</label>
                                        <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full bg-slate-800 border-none rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-blue-500 transition-all" required />
                                        {errors.email && <p className="text-red-500 text-xs mt-1 font-bold">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-blue-400 text-[10px] font-black mb-1 ml-1 uppercase">Password</label>
                                        <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} className="w-full bg-slate-800 border-none rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-blue-500 transition-all" required />
                                        {errors.password && <p className="text-red-500 text-xs mt-1 font-bold">{errors.password}</p>}
                                    </div>
                                    <button disabled={processing} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl mt-4 transition-all shadow-lg active:scale-95">
                                        {processing ? 'MENYIMPAN...' : 'SIMPAN PENGGUNA'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}