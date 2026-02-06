# ProjectAskrida - Sistem Absensi Ruangan TU

Sistem manajemen absensi berbasis web untuk Ruangan TU dengan backend Spring Boot dan frontend modern.

## Fitur Utama

### Frontend (Web Interface)
- ✅ **Dashboard Beranda**: Statistik absensi dan anggota
- ✅ **Absensi**: Proses check-in/check-out otomatis
- ✅ **Kelola Anggota**: Tambah anggota baru dengan validasi
- ✅ **Riwayat**: Tampilan riwayat absensi lengkap

### Backend API Endpoints
- `POST /rest/absensi` - Proses absensi (masuk/keluar otomatis)
- `POST /rest/tambahanggota` - Tambah anggota baru
- `POST /rest/tambahanggotabatch` - Tambah banyak anggota sekaligus
- `POST /rest/updateanggota` - Update data anggota
- `GET /rest/` - Ambil semua data absensi
- `GET /rest/{id}` - Ambil data absensi by ID
- `POST /rest/cekabsensibatch` - Cek status absensi batch

## Model & Fungsi Tambahan

### Rest Model
File: `src/main/java/com/askrida/web/service/model/Rest.java`

Fungsi-fungsi custom:
- `apakahDataLengkap()` - Validasi kelengkapan data
- `buatRingkasanData()` - Generate ringkasan informasi
- `verifikasiNIM()` - Validasi format NIM
- `bersihkanData()` - Sanitize dan bersihkan data input

### DataAnggota Model
File: `src/main/java/com/askrida/web/service/model/DataAnggota.java`

Fungsi-fungsi custom:
- `hitungKodePengaman()` - Generate kode keamanan unik
- `periksaStatusAktifitas()` - Cek status keaktifan anggota
- `buatNamaTampilan()` - Format nama untuk tampilan
- `bersihkanDanPersiapkan()` - Sanitize dan format data
- `tambahPoinKeaktifan()` - Sistem poin keaktifan
- `cetakKartuAnggota()` - Generate kartu anggota ASCII

### UnitDivisi Model
File: `src/main/java/com/askrida/web/service/model/UnitDivisi.java`

Fungsi-fungsi custom:
- `alihkanStatusOperasi()` - Toggle status operasional
- `generasiKodeUnitDenganChecksum()` - Generate kode unit dengan checksum
- `tambahInformasiMetadata()` - Kelola metadata unit
- `ringkasanInformasi()` - Tampilkan ringkasan info unit
- `validasiPersyaratanUnit()` - Validasi persyaratan unit
- `hitungRatingUnit()` - Hitung rating unit berdasarkan kriteria

## Teknologi

- **Backend**: Spring Boot 3.2.2, Java 17
- **Database**: PostgreSQL
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Build Tool**: Maven

## Cara Menjalankan

### Prerequisites
- Java 17+
- PostgreSQL
- Maven

### Database Setup
```sql
-- Sesuaikan dengan schema database Anda
-- Update connection string di src/main/resources/application.properties
```

### Build & Run
```bash
# Build project
mvn clean package -DskipTests

# Run aplikasi
mvn spring-boot:run
```

Aplikasi akan berjalan di: `http://localhost:8181`

## Struktur Frontend

```
src/main/resources/static/
├── index.html           # Halaman utama
├── css/
│   └── aplikasi.css    # Styling custom dengan gradient & animasi
└── js/
    └── aplikasi.js     # Logic frontend dengan fungsi custom
```

## API Usage Examples

### Proses Absensi
```javascript
POST /rest/absensi
Content-Type: application/json

{
  "key": "NIM12345"
}
```

### Tambah Anggota
```javascript
POST /rest/tambahanggota
Content-Type: application/json

{
  "key": "NIM12345",
  "nama": "Nama Lengkap",
  "kelas": "3A",
  "idDivisi": 1
}
```

## Konfigurasi CORS
File: `src/main/java/com/askrida/web/service/conf/PengaturanAksesSilang.java`
- Mengatur akses frontend-backend
- Mendukung semua origin untuk development
- Max age: 7200 detik

## Catatan Pengembangan

- Semua model dilengkapi dengan fungsi validasi dan sanitasi custom
- Frontend menggunakan naming convention Indonesia untuk kemudahan pemeliharaan
- Sistem absensi otomatis mendeteksi check-in/check-out berdasarkan status terakhir
- Gradient color scheme untuk UI yang modern dan menarik

## License

Dikembangkan untuk Askrida © 2026