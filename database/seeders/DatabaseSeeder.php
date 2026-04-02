<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat Role Admin & User
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $userRole = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'web']);

        // 2. Buat Daftar Permission (Kunci akses)
        $permissions = [
            'kelola buku',
            'transaksi',
            'kelola anggota',
            'laporan'
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        // 3. Kasih semua Permission ke Role Admin
        $adminRole->syncPermissions(Permission::all());

        // 4. Update atau Buat User Admin
        $admin = User::updateOrCreate(
            ['email' => 'admin@gmail.com'], // Ganti dengan email login kamu jika beda
            [
                'name' => 'dwi admin',
                'password' => Hash::make('password'), // password default
                'role' => 'admin', // Ini untuk jaga-jaga kalau kodinganmu baca kolom role
            ]
        );

        // 5. Hubungkan User ke Role Admin (Spatie)
        $admin->assignRole($adminRole);

        $this->command->info('Berhasil! Roles dan Permissions sudah masuk ke database.');
    }
}