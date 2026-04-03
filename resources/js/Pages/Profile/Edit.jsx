import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { User, ShieldCheck, Trash2 } from 'lucide-react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-black text-3xl text-white tracking-tight uppercase">Pengaturan Profil</h2>}
        >
            <Head title="Profile" />

            <div className="py-12 bg-[#020617] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-10">
                    
                    {/* Update Info Profil */}
                    <div className="p-8 bg-slate-900/50 border-2 border-white/5 rounded-[32px] backdrop-blur-xl relative overflow-hidden group hover:border-blue-500/30 transition-all">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-400">
                                <User size={24} />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-wider">Informasi Akun</h3>
                        </div>
                        <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
                    </div>

                    {/* Update Password */}
                    <div className="p-8 bg-slate-900/50 border-2 border-white/5 rounded-[32px] backdrop-blur-xl relative overflow-hidden group hover:border-indigo-500/30 transition-all">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-indigo-500/20 rounded-2xl text-indigo-400">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase tracking-wider">Keamanan Kata Sandi</h3>
                        </div>
                        <UpdatePasswordForm />
                    </div>

                    {/* Delete Account */}
                    <div className="p-8 bg-red-500/5 border-2 border-red-500/10 rounded-[32px] backdrop-blur-xl relative overflow-hidden group hover:border-red-500/30 transition-all">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-red-500/20 rounded-2xl text-red-400">
                                <Trash2 size={24} />
                            </div>
                            <h3 className="text-xl font-black text-red-400 uppercase tracking-wider">Hapus Akun</h3>
                        </div>
                        <DeleteUserForm />
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}