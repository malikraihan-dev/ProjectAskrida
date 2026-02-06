const URL_API_DASAR = 'http://localhost:8181/rest';

function tampilkanHalaman(namaHalaman) {
    const semuaHalaman = document.querySelectorAll('.panel-halaman');
    const semuaTombol = document.querySelectorAll('.tombol-menu');
    
    semuaHalaman.forEach(halaman => {
        halaman.classList.add('tersembunyi');
    });
    
    semuaTombol.forEach(tombol => {
        tombol.classList.remove('aktif');
    });
    
    const halamanTarget = document.getElementById(`halaman-${namaHalaman}`);
    if (halamanTarget) {
        halamanTarget.classList.remove('tersembunyi');
    }
    
    event.target.classList.add('aktif');
    
    if (namaHalaman === 'beranda') {
        muatStatistikBeranda();
    }
}

async function muatStatistikBeranda() {
    try {
        const respons = await fetch(`${URL_API_DASAR}/`);
        const dataSemua = await respons.json();
        
        document.getElementById('total-absen-hari-ini').textContent = dataSemua.length;
        
        const dataUnik = new Set(dataSemua.map(item => item.key));
        document.getElementById('total-anggota').textContent = dataUnik.size;
    } catch (kesalahan) {
        console.error('Gagal memuat statistik:', kesalahan);
    }
}

async function prosesAbsensi(event) {
    event.preventDefault();
    
    const nimInput = document.getElementById('nim-absensi');
    const nimNilai = nimInput.value.trim();
    const kotakHasil = document.getElementById('hasil-absensi');
    
    if (!nimNilai) {
        tampilkanPesan(kotakHasil, 'NIM tidak boleh kosong!', false);
        return;
    }
    
    try {
        const payload = {
            key: nimNilai
        };
        
        const respons = await fetch(`${URL_API_DASAR}/absensi`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        const hasil = await respons.json();
        
        if (respons.ok) {
            tampilkanPesan(kotakHasil, 
                `✅ ${hasil.keterangan || 'Absensi berhasil diproses'}<br>` +
                `Nama: ${hasil.nama || '-'}<br>` +
                `Ruangan: ${hasil.value || '-'}`, 
                true
            );
            nimInput.value = '';
        } else {
            tampilkanPesan(kotakHasil, 
                `❌ ${hasil.keterangan || 'Terjadi kesalahan saat memproses absensi'}`, 
                false
            );
        }
    } catch (kesalahan) {
        console.error('Error absensi:', kesalahan);
        tampilkanPesan(kotakHasil, 
            '❌ Koneksi ke server gagal. Pastikan server berjalan di port 8181.', 
            false
        );
    }
}

async function tambahAnggotaBaru(event) {
    event.preventDefault();
    
    const nimBaru = document.getElementById('nim-baru').value.trim();
    const namaBaru = document.getElementById('nama-baru').value.trim();
    const kelasBaru = document.getElementById('kelas-baru').value.trim();
    const divisiBaru = document.getElementById('divisi-baru').value;
    const kotakHasil = document.getElementById('hasil-anggota');
    
    if (!nimBaru || !namaBaru) {
        tampilkanPesan(kotakHasil, 'NIM dan Nama harus diisi!', false);
        return;
    }
    
    try {
        const payload = {
            key: nimBaru,
            nama: namaBaru,
            kelas: kelasBaru,
            idDivisi: parseInt(divisiBaru)
        };
        
        const respons = await fetch(`${URL_API_DASAR}/tambahanggota`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        const hasil = await respons.json();
        
        if (respons.ok) {
            tampilkanPesan(kotakHasil, 
                `✅ ${hasil.keterangan || 'Anggota berhasil ditambahkan'}<br>` +
                `NIM: ${hasil.key}<br>` +
                `Nama: ${hasil.nama}`, 
                true
            );
            
            document.getElementById('form-tambah-anggota').reset();
        } else {
            tampilkanPesan(kotakHasil, 
                `❌ ${hasil.keterangan || 'Gagal menambahkan anggota'}`, 
                false
            );
        }
    } catch (kesalahan) {
        console.error('Error tambah anggota:', kesalahan);
        tampilkanPesan(kotakHasil, 
            '❌ Koneksi ke server gagal. Pastikan server berjalan.', 
            false
        );
    }
}

async function muatRiwayat() {
    const isiTabel = document.getElementById('isi-tabel-riwayat');
    isiTabel.innerHTML = '<tr><td colspan="5" class="teks-tengah">Memuat data...</td></tr>';
    
    try {
        const respons = await fetch(`${URL_API_DASAR}/`);
        const dataRiwayat = await respons.json();
        
        if (dataRiwayat && dataRiwayat.length > 0) {
            let htmlBaris = '';
            
            dataRiwayat.forEach(item => {
                const waktuTampil = formatWaktu(item.waktu_input);
                htmlBaris += `
                    <tr>
                        <td>${item.id || '-'}</td>
                        <td>${item.key || '-'}</td>
                        <td>${item.nama || '-'}</td>
                        <td>${item.value || '-'}</td>
                        <td>${waktuTampil}</td>
                    </tr>
                `;
            });
            
            isiTabel.innerHTML = htmlBaris;
        } else {
            isiTabel.innerHTML = '<tr><td colspan="5" class="teks-tengah">Belum ada data riwayat</td></tr>';
        }
    } catch (kesalahan) {
        console.error('Error muat riwayat:', kesalahan);
        isiTabel.innerHTML = '<tr><td colspan="5" class="teks-tengah">Gagal memuat data. Pastikan server berjalan.</td></tr>';
    }
}

function tampilkanPesan(elemen, pesan, sukses) {
    elemen.innerHTML = pesan;
    elemen.className = 'kotak-hasil ' + (sukses ? 'sukses' : 'gagal');
    elemen.style.display = 'block';
    
    setTimeout(() => {
        elemen.style.display = 'none';
    }, 5000);
}

function formatWaktu(waktuString) {
    if (!waktuString) return '-';
    
    try {
        const tanggal = new Date(waktuString);
        const hari = String(tanggal.getDate()).padStart(2, '0');
        const bulan = String(tanggal.getMonth() + 1).padStart(2, '0');
        const tahun = tanggal.getFullYear();
        const jam = String(tanggal.getHours()).padStart(2, '0');
        const menit = String(tanggal.getMinutes()).padStart(2, '0');
        
        return `${hari}/${bulan}/${tahun} ${jam}:${menit}`;
    } catch (e) {
        return waktuString;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    muatStatistikBeranda();
});
