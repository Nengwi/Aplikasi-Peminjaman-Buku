import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold">Selamat Datang Kembali!</h1>
                <p className="text-gray-400 text-sm mt-1">Silakan masuk ke akun Anda</p>
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-400">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email Address" className="text-gray-300" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-white/5 border-white/10 text-white focus:border-blue-500 focus:ring-blue-500 rounded-xl py-3"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="password" value="Password" className="text-gray-300" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-white/5 border-white/10 text-white focus:border-blue-500 focus:ring-blue-500 rounded-xl py-3"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="bg-white/5 border-white/20"
                        />
                        <span className="ms-2 text-sm text-gray-400">Ingat saya</span>
                    </label>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                    <PrimaryButton className="w-full justify-center bg-blue-600 hover:bg-blue-500 py-4 rounded-xl shadow-lg shadow-blue-500/20" disabled={processing}>
                        Masuk Sekarang
                    </PrimaryButton>

                    <div className="text-center">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-gray-400 hover:text-white transition"
                            >
                                Lupa password?
                            </Link>
                        )}
                    </div>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Belum punya akun?{' '}
                    <Link href={route('register')} className="text-blue-400 font-bold hover:underline">
                        Daftar Gratis
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}