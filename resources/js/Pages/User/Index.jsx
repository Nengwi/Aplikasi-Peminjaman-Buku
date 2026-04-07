import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="py-12 text-center">
                <h1 className="text-white text-4xl font-black">HALO, {auth.user.name.toUpperCase()}!</h1>
                <p className="text-gray-400 mt-2">Selamat datang di Perpustakaan Digital.</p>

                {/* Tombol untuk pergi ke Katalog Buku */}
                <Link
                    href={route('books.index')}
                    className="inline-block mt-6 bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-500 transition-all"
                >
                    LIHAT KATALOG BUKU
                </Link>
            </div>
        </AuthenticatedLayout>
    );
}