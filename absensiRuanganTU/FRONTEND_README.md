# Frontend - Sistem Absensi Ruangan TU

## Deskripsi
Interface web modern untuk sistem absensi ruangan TU (Tata Usaha). Aplikasi ini menyediakan antarmuka yang user-friendly untuk mengelola kehadiran dan data anggota.

## Fitur

### 1. **Tab Absensi**
- Form sederhana untuk submit absensi menggunakan NIM/ID
- Notifikasi real-time untuk feedback sukses/error
- Validasi input otomatis

### 2. **Tab Kelola Anggota**
- **Tambah Anggota Baru**: Form untuk mendaftarkan anggota baru dengan data:
  - NIM/ID
  - Nama
  - Kelas
  - ID Divisi
  
- **Update Anggota**: Form untuk memperbarui data anggota yang sudah ada

### 3. **Tab Lihat Data**
- Tabel data absensi lengkap
- Tombol Refresh untuk memuat ulang data
- Tombol Hapus untuk menghapus record tertentu
- Informasi lengkap: ID, NIM/Key, Nama, Value, Waktu Input, Rand

## Cara Menggunakan

### Prasyarat
1. Java 17 atau lebih tinggi
2. PostgreSQL database
3. Maven

### Langkah-langkah

1. **Setup Database**
   ```sql
   CREATE DATABASE ruanganTU;
   ```

2. **Konfigurasi Database**
   Edit file `src/main/resources/application.properties`:
   ```properties
   spring.datasource.jdbc-url=jdbc:postgresql://localhost:5432/ruanganTU
   spring.datasource.username=postgres
   spring.datasource.password=your_password
   ```

3. **Build Aplikasi**
   ```bash
   mvn clean package
   ```

4. **Jalankan Aplikasi**
   ```bash
   mvn spring-boot:run
   ```
   
   Atau:
   ```bash
   java -jar target/absensiRuanganTU-0.0.1.jar
   ```

5. **Akses Frontend**
   Buka browser dan navigasi ke:
   ```
   http://localhost:8181/
   ```

## Struktur File Frontend

```
src/main/resources/static/
├── index.html          # Struktur HTML utama
├── css/
│   └── style.css      # Styling dan responsive design
└── js/
    └── app.js         # Logika aplikasi dan integrasi API
```

## API Endpoints yang Digunakan

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/rest/absensi` | Submit absensi |
| POST | `/rest/tambahanggota` | Tambah anggota baru |
| POST | `/rest/updateanggota` | Update data anggota |
| POST | `/rest/deletedata` | Hapus record |
| GET | `/rest/` | Ambil semua data |

## Fitur Desain

- **Modern UI**: Gradient purple theme dengan shadow effects
- **Responsive**: Otomatis menyesuaikan dengan ukuran layar (desktop, tablet, mobile)
- **User-Friendly**: Interface intuitif dengan feedback visual
- **Notifikasi**: Toast notifications untuk semua aksi
- **Error Handling**: Pesan error yang informatif

## Browser Support

✅ Google Chrome (versi terbaru)
✅ Mozilla Firefox (versi terbaru)
✅ Safari (versi terbaru)
✅ Microsoft Edge (versi terbaru)
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Masalah: "Terjadi kesalahan koneksi"
- **Solusi**: Pastikan backend server berjalan di port 8181

### Masalah: "Tidak dapat memuat data"
- **Solusi**: 
  1. Periksa koneksi database
  2. Pastikan tabel `restexamplecrud` sudah dibuat
  3. Cek log aplikasi untuk error details

### Masalah: Data tidak muncul setelah submit
- **Solusi**: Klik tombol "Refresh Data" di tab Lihat Data

## Pengembangan Lebih Lanjut

Untuk melakukan modifikasi pada frontend:

1. **Mengubah tampilan**: Edit file `css/style.css`
2. **Menambah fitur**: Edit file `js/app.js`
3. **Mengubah struktur**: Edit file `index.html`

Setelah melakukan perubahan, cukup refresh browser (tidak perlu restart server).

## Keamanan

- Input forms menggunakan HTML5 validation
- API calls menggunakan proper error handling
- CORS handling oleh Spring Boot backend

**Catatan Penting**: Untuk production, pastikan:
- Gunakan HTTPS
- Implementasi authentication/authorization
- Simpan credentials di environment variables
- Enable CSRF protection

## Lisensi

Project ini menggunakan lisensi yang sama dengan repository utama.

## Kontributor

- Frontend Development: GitHub Copilot
- Backend: Existing Spring Boot application

## Support

Untuk pertanyaan atau issues, silakan buat issue di repository GitHub.
