// API Configuration
const API_BASE_URL = '/rest';

// Tab Management
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');

    // Load data if data tab is selected
    if (tabName === 'data') {
        loadAllData();
    }
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Show result in form
function showResult(elementId, message, type) {
    const resultDiv = document.getElementById(elementId);
    resultDiv.textContent = message;
    resultDiv.className = `result ${type}`;
    
    setTimeout(() => {
        resultDiv.style.display = 'none';
    }, 5000);
}

// Absensi Form Handler
document.getElementById('absensiForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const key = document.getElementById('absensiKey').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/absensi`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ key: key })
        });

        const data = await response.json();
        
        if (response.ok) {
            showResult('absensiResult', data.keterangan || 'Absensi berhasil!', 'success');
            showNotification(data.keterangan || 'Absensi berhasil!', 'success');
            document.getElementById('absensiForm').reset();
        } else {
            showResult('absensiResult', data.keterangan || 'Terjadi kesalahan', 'error');
            showNotification('Gagal melakukan absensi', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showResult('absensiResult', 'Terjadi kesalahan koneksi', 'error');
        showNotification('Terjadi kesalahan koneksi', 'error');
    }
});

// Tambah Anggota Form Handler
document.getElementById('tambahAnggotaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        key: document.getElementById('tambahKey').value,
        nama: document.getElementById('tambahNama').value,
        kelas: document.getElementById('tambahKelas').value,
        idDivisi: parseInt(document.getElementById('tambahDivisi').value)
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/tambahanggota`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (response.ok) {
            showResult('tambahAnggotaResult', data.keterangan || 'Anggota berhasil ditambahkan!', 'success');
            showNotification('Anggota berhasil ditambahkan!', 'success');
            document.getElementById('tambahAnggotaForm').reset();
        } else {
            showResult('tambahAnggotaResult', data.keterangan || 'Terjadi kesalahan', 'error');
            showNotification('Gagal menambahkan anggota', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showResult('tambahAnggotaResult', 'Terjadi kesalahan koneksi', 'error');
        showNotification('Terjadi kesalahan koneksi', 'error');
    }
});

// Update Anggota Form Handler
document.getElementById('updateAnggotaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        key: document.getElementById('updateKey').value,
        nama: document.getElementById('updateNama').value,
        kelas: document.getElementById('updateKelas').value,
        idDivisi: parseInt(document.getElementById('updateDivisi').value)
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/updateanggota`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (response.ok) {
            showResult('updateAnggotaResult', data.keterangan || 'Anggota berhasil diupdate!', 'success');
            showNotification('Anggota berhasil diupdate!', 'success');
            document.getElementById('updateAnggotaForm').reset();
        } else {
            showResult('updateAnggotaResult', data.keterangan || 'Terjadi kesalahan', 'error');
            showNotification('Gagal mengupdate anggota', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showResult('updateAnggotaResult', 'Terjadi kesalahan koneksi', 'error');
        showNotification('Terjadi kesalahan koneksi', 'error');
    }
});

// Load All Data
async function loadAllData() {
    const dataTableDiv = document.getElementById('dataTable');
    dataTableDiv.innerHTML = '<div class="loading">Memuat data...</div>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/`);
        const data = await response.json();
        
        if (response.ok && data && data.length > 0) {
            let tableHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NIM/Key</th>
                            <th>Nama</th>
                            <th>Value</th>
                            <th>Waktu Input</th>
                            <th>Rand</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            data.forEach(item => {
                const waktu = item.waktu_input ? new Date(item.waktu_input).toLocaleString('id-ID') : '-';
                tableHTML += `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.key || '-'}</td>
                        <td>${item.nama || '-'}</td>
                        <td>${item.value || '-'}</td>
                        <td>${waktu}</td>
                        <td>${item.rand || '-'}</td>
                        <td>
                            <button class="btn btn-danger" onclick="deleteData(${item.id})">Hapus</button>
                        </td>
                    </tr>
                `;
            });
            
            tableHTML += `
                    </tbody>
                </table>
            `;
            
            dataTableDiv.innerHTML = tableHTML;
        } else {
            dataTableDiv.innerHTML = `
                <div class="empty-state">
                    <h3>Tidak ada data</h3>
                    <p>Belum ada data absensi yang tersimpan</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
        dataTableDiv.innerHTML = `
            <div class="empty-state">
                <h3>Terjadi Kesalahan</h3>
                <p>Tidak dapat memuat data. Pastikan server berjalan.</p>
            </div>
        `;
        showNotification('Gagal memuat data', 'error');
    }
}

// Delete Data
async function deleteData(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/deletedata`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id })
        });

        const data = await response.json();
        
        if (response.ok) {
            showNotification(data.keterangan || 'Data berhasil dihapus!', 'success');
            loadAllData(); // Reload the data
        } else {
            showNotification('Gagal menghapus data', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Terjadi kesalahan koneksi', 'error');
    }
}

// Initialize - Load data on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Aplikasi Absensi Ruangan TU siap digunakan!');
});
