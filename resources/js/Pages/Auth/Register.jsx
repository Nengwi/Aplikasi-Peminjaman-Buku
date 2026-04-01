import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-white">Buat Akun Baru</h1>
                <p className="text-gray-400 text-sm mt-1">Daftar untuk mulai meminjam buku</p>
            </div>

            <form onSubmit={submit}>
                {/* NAME */}
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" className="text-gray-300 font-bold" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full bg-slate-800/50 border-white/10 text-white focus:border-blue-500 focus:ring-blue-500 rounded-xl py-3"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* EMAIL */}
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" className="text-gray-300 font-bold" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-slate-800/50 border-white/10 text-white focus:border-blue-500 focus:ring-blue-500 rounded-xl py-3"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* PASSWORD */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Kata Sandi" className="text-gray-300 font-bold" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-slate-800/50 border-white/10 text-white focus:border-blue-500 focus:ring-blue-500 rounded-xl py-3"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Konfirmasi Kata Sandi" className="text-gray-300 font-bold" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full bg-slate-800/50 border-white/10 text-white focus:border-blue-500 focus:ring-blue-500 rounded-xl py-3"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-8 flex flex-col gap-4">
                    <PrimaryButton className="w-full justify-center bg-blue-600 hover:bg-blue-500 py-4 rounded-xl shadow-lg shadow-blue-500/20 text-white font-black" disabled={processing}>
                        DAFTAR SEKARANG
                    </PrimaryButton>

                    <Link
                        href={route('login')}
                        className="text-center text-sm text-gray-400 hover:text-white transition"
                    >
                        Sudah punya akun? <span className="text-blue-400 font-bold">Login di sini</span>
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}