// =========================================================================
// BERKAS: javascriptdashboard.js
// DESKRIPSI: Logika frontend interaktif Dashboard Admin terhubung ke backend MySQL (XAMPP)
// =========================================================================
// KOMENTAR:
// File ini mengelola:
// 1. Mengambil data statistik & daftar pendaftar dari api_dashboard.php
// 2. Navigasi perpindahan antar-modul (SPA Switcher)
// 3. Pencarian real-time pendaftar ke server
// 4. Pengubahan status verifikasi berkas (Menunggu -> Lengkap / Ditolak)
// 5. Menampilkan modal detail lengkap biodata santri dan link berkas
// 6. Mengunduh data ke file Excel (.csv) secara riil
// =========================================================================

// Variabel untuk menyimpan ID pendaftar yang sedang dibuka pada modal detail
let activeDetailId = null;

// =========================================================================
// 1. INISIALISASI SAAT HALAMAN DASHBOARD DIMUAT
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // KOMENTAR: Memuat statistik angka dan data tabel saat dashboard dibuka
    loadDashboardStats();
    loadPendaftarTable();
    setupDashboardEvents();
});

// =========================================================================
// 2. FUNGSI MENGAMBIL STATISTIK DARI DATABASE (XAMPP)
// =========================================================================
async function loadDashboardStats() {
    try {
        const response = await fetch('api_dashboard.php?action=stats');
        const result = await response.json();

        if (result.status === 'success') {
            const data = result.data;
            document.getElementById('statTotal').textContent = Number(data.total).toLocaleString('id-ID');
            document.getElementById('statMenunggu').textContent = Number(data.menunggu).toLocaleString('id-ID');
            document.getElementById('statLolos').textContent = Number(data.lengkap).toLocaleString('id-ID');
            
            // Perbarui badge notifikasi di header atas
            const notifBadge = document.getElementById('notifBadge');
            if (notifBadge) {
                notifBadge.textContent = data.menunggu;
            }
        }
    } catch (error) {
        console.warn('Gagal memuat statistik dari api_dashboard.php. Pastikan XAMPP Apache & MySQL menyala.', error);
        document.getElementById('statTotal').textContent = '0';
        document.getElementById('statMenunggu').textContent = '0';
        document.getElementById('statLolos').textContent = '0';
    }
}

// =========================================================================
// 3. FUNGSI MERENDER TABEL PENDAFTAR SECARA DINAMIS DARI MYSQL
// =========================================================================
async function loadPendaftarTable(searchQuery = '') {
    const tbody = document.getElementById('tabelPendaftarBody');
    if (!tbody) return;

    try {
        const url = 'api_dashboard.php?action=list' + (searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : '');
        const response = await fetch(url);
        const result = await response.json();

        if (result.status === 'success') {
            const data = result.data;

            if (data.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="6" style="text-align: center; padding: 30px; color: var(--text-muted);">
                            <i class="fa-solid fa-folder-open" style="font-size: 1.5rem; margin-bottom: 8px; display: block;"></i>
                            Tidak ada data pendaftar yang cocok.
                        </td>
                    </tr>
                `;
                return;
            }

            // Bangun baris-baris tabel berdasarkan data riil dari database
            tbody.innerHTML = data.map(item => {
                let badgeClass = 'status-pending';
                if (item.status_berkas === 'Lengkap') badgeClass = 'status-success';
                if (item.status_berkas === 'Ditolak') badgeClass = 'status-danger';

                return `
                    <tr data-id="${item.id}">
                        <td><strong>${item.no_daftar}</strong></td>
                        <td><strong>${item.nama_lengkap}</strong></td>
                        <td>${item.unit_tujuan}</td>
                        <td>${item.tanggal_daftar}</td>
                        <td><span class="status-badge ${badgeClass}">${item.status_berkas}</span></td>
                        <td>
                            <div style="display: flex; gap: 8px;">
                                ${item.status_berkas === 'Menunggu' ? `
                                    <button class="btn-action" onclick="quickVerify(${item.id}, '${item.nama_lengkap}')" title="Verifikasi Langsung">
                                        <i class="fa-solid fa-check"></i> Verifikasi
                                    </button>
                                ` : ''}
                                <button class="btn-action btn-view" onclick="openDetailModal(${item.id})" title="Lihat Biodata Lengkap">
                                    <i class="fa-solid fa-eye"></i> Lihat
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        }
    } catch (error) {
        console.error('Gagal mengambil data pendaftar:', error);
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 25px; color: #ef4444;">
                    <i class="fa-solid fa-triangle-exclamation"></i> Gagal terhubung ke MySQL XAMPP. Buka file ini lewat http://localhost/website-pp-sw/ di browser.
                </td>
            </tr>
        `;
    }
}

// =========================================================================
// 4. FUNGSI VERIFIKASI CEPAT (DARI TOMBOL TABEL)
// =========================================================================
async function quickVerify(id, namaSantri) {
    if (!confirm(`Konfirmasi verifikasi kelengkapan berkas untuk santri ${namaSantri}?`)) {
        return;
    }

    await updateStatusPendaftar(id, 'Lengkap');
}

// =========================================================================
// 5. FUNGSI UPDATE STATUS KE DATABASE
// =========================================================================
async function updateStatusPendaftar(id, newStatus) {
    try {
        const formData = new FormData();
        formData.append('action', 'update_status');
        formData.append('id', id);
        formData.append('status', newStatus);

        const response = await fetch('api_dashboard.php', {
            method: 'POST',
            body: formData
        });
        const res = await response.json();

        if (res.status === 'success') {
            // Muat ulang angka statistik dan data tabel
            loadDashboardStats();
            loadPendaftarTable(document.getElementById('searchInput').value);
            
            // Jika modal detail sedang terbuka, tutup modal
            closeDetailModal();
        } else {
            alert('Gagal memperbarui status: ' + res.message);
        }
    } catch (error) {
        alert('Terjadi kesalahan jaringan saat mengupdate status ke database.');
    }
}

// =========================================================================
// 6. FUNGSI MEMBUKA MODAL DETAIL PENDAFTAR
// =========================================================================
async function openDetailModal(id) {
    activeDetailId = id;
    const modal = document.getElementById('modalDetailPendaftar');

    try {
        const response = await fetch(`api_dashboard.php?action=detail&id=${id}`);
        const result = await response.json();

        if (result.status === 'success') {
            const data = result.data;

            document.getElementById('detNoDaftar').textContent = data.no_daftar;
            document.getElementById('detNama').textContent = data.nama_lengkap;
            document.getElementById('detSekolah').textContent = data.sekolah;
            document.getElementById('detJurusan').textContent = data.jurusan ? data.jurusan : '-';
            document.getElementById('detNisn').textContent = data.nisn;
            document.getElementById('detNik').textContent = data.nik ? data.nik : '-';
            document.getElementById('detGender').textContent = data.jenis_kelamin;
            document.getElementById('detNoHp').textContent = data.no_hp;
            document.getElementById('detAlamat').textContent = data.alamat;

            // Update badge status modal
            const statusBadge = document.getElementById('detStatusBadge');
            statusBadge.textContent = data.status_berkas;
            statusBadge.className = 'status-badge';
            if (data.status_berkas === 'Lengkap') statusBadge.classList.add('status-success');
            else if (data.status_berkas === 'Ditolak') statusBadge.classList.add('status-danger');
            else statusBadge.classList.add('status-pending');

            // Atur link berkas transkrip dan ijazah
            const linkTranskrip = document.getElementById('detLinkTranskrip');
            const linkIjazah = document.getElementById('detLinkIjazah');

            if (data.berkas_transkrip) {
                linkTranskrip.href = `uploads/${data.berkas_transkrip}`;
                linkTranskrip.style.display = 'inline-flex';
            } else {
                linkTranskrip.style.display = 'none';
            }

            if (data.berkas_ijazah) {
                linkIjazah.href = `uploads/${data.berkas_ijazah}`;
                linkIjazah.style.display = 'inline-flex';
            } else {
                linkIjazah.style.display = 'none';
            }

            // Tampilkan modal
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
        }
    } catch (error) {
        alert('Gagal mengambil rincian data santri dari database.');
    }
}

function closeDetailModal() {
    const modal = document.getElementById('modalDetailPendaftar');
    if (modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    }
    activeDetailId = null;
}

// =========================================================================
// 7. SETUP EVENT LISTENERS DASHBOARD
// =========================================================================
function setupDashboardEvents() {
    // 1. Navigasi SPA Menu Sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar-menu li a');
    const allModules = document.querySelectorAll('.modul-content');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
            this.parentElement.classList.add('active');

            const targetModulId = this.getAttribute('data-target');
            allModules.forEach(modul => modul.classList.remove('active'));

            const targetModul = document.getElementById(targetModulId);
            if (targetModul) {
                targetModul.classList.add('active');
            }
        });
    });

    // 2. Pencarian Real-Time (Input Search)
    const searchInput = document.getElementById('searchInput');
    let searchTimeout = null;

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            // Debounce 300ms agar tidak spam request ke server
            searchTimeout = setTimeout(() => {
                loadPendaftarTable(query);
            }, 300);
        });
    }

    // 3. Tombol Refresh Data
    const btnRefresh = document.getElementById('btnRefresh');
    if (btnRefresh) {
        btnRefresh.addEventListener('click', () => {
            loadDashboardStats();
            loadPendaftarTable(searchInput.value.trim());
        });
    }

    // 4. Tombol Export Excel (Riil Download dari api_dashboard.php)
    const btnExport = document.getElementById('btnExport');
    if (btnExport) {
        btnExport.addEventListener('click', () => {
            window.location.href = 'api_dashboard.php?action=export_excel';
        });
    }

    // 5. Aksi di dalam Modal Detail (Setujui / Tolak / Tutup)
    const btnCloseDetail = document.getElementById('btnCloseDetail');
    const btnModalTutup = document.getElementById('btnModalTutup');
    const btnModalSetujui = document.getElementById('btnModalSetujui');
    const btnModalTolak = document.getElementById('btnModalTolak');

    if (btnCloseDetail) btnCloseDetail.addEventListener('click', closeDetailModal);
    if (btnModalTutup) btnModalTutup.addEventListener('click', closeDetailModal);

    if (btnModalSetujui) {
        btnModalSetujui.addEventListener('click', () => {
            if (activeDetailId) updateStatusPendaftar(activeDetailId, 'Lengkap');
        });
    }

    if (btnModalTolak) {
        btnModalTolak.addEventListener('click', () => {
            if (activeDetailId) updateStatusPendaftar(activeDetailId, 'Ditolak');
        });
    }

    // Tutup modal jika klik di luar box modal
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('modalDetailPendaftar');
        if (e.target === modal) {
            closeDetailModal();
        }
    });

    // Tombol ESC di keyboard untuk menutup modal
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeDetailModal();
        }
    });
}
