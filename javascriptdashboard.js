// 1. FITUR PENCARIAN (SEARCH) REAL-TIME
// Menangkap input pencarian dan baris tabel
const searchInput = document.querySelector('.header-search input');
const tableRows = document.querySelectorAll('.admin-table tbody tr');

searchInput.addEventListener('keyup', function(event) {
    const searchText = event.target.value.toLowerCase();

    tableRows.forEach(row => {
        // Mengambil teks dari kolom "Nama Calon Santri" (kolom ke-2) dan "No. Daftar" (kolom ke-1)
        const noDaftar = row.cells[0].textContent.toLowerCase();
        const nama = row.cells[1].textContent.toLowerCase();

        // Jika teks pencarian cocok, tampilkan baris; jika tidak, sembunyikan
        if (noDaftar.includes(searchText) || nama.includes(searchText)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});


// 2. FITUR NAVIGASI & PERPINDAHAN MODUL (SPA ROUTING)
const sidebarLinks = document.querySelectorAll('.sidebar-menu li a');
const allModules = document.querySelectorAll('.modul-content');

sidebarLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Mencegah reload halaman
        
        // 1. Hapus kelas 'active' dari semua li (sorotan menu sidebar)
        document.querySelectorAll('.sidebar-menu li').forEach(li => {
            li.classList.remove('active');
        });
        
        // 2. Tambahkan kelas 'active' ke menu yang sedang diklik (li induknya)
        this.parentElement.classList.add('active');

        // 3. LOGIKA PERPINDAHAN MODUL
        // Ambil nama target dari atribut data-target (contoh: "modul-berita")
        const targetModulId = this.getAttribute('data-target');

        // Sembunyikan semua konten modul
        allModules.forEach(modul => {
            modul.classList.remove('active');
        });

        // Tampilkan hanya konten modul yang sesuai dengan data-target
        const targetModul = document.getElementById(targetModulId);
        if (targetModul) {
            targetModul.classList.add('active');
        }
    });
});


// 3. FITUR TOMBOL EXPORT EXCEL
// Simulasi proses export data
const exportBtn = document.querySelector('.btn-export');

exportBtn.addEventListener('click', function() {
    alert('Data Pendaftar Berhasil di-Export ke Excel (.xlsx)!');
    // Di aplikasi nyata, bagian ini akan memanggil API atau fungsi library untuk mengunduh file
});


// 4. FITUR AKSI TABEL (VERIFIKASI & LIHAT)
// Menambahkan interaksi pada tombol di dalam tabel
const actionButtons = document.querySelectorAll('.btn-action');

actionButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Cek jenis tombol berdasarkan kelasnya atau teksnya
        if (this.textContent === 'Verifikasi') {
            
            // Ubah teks tombol
            this.textContent = 'Lihat';
            this.classList.add('btn-view');
            
            // Cari elemen badge status di baris yang sama dan ubah menjadi "Lengkap"
            const row = this.closest('tr'); // Mencari elemen tr induk
            const statusBadge = row.querySelector('.status-badge');
            
            statusBadge.className = 'status-badge status-success';
            statusBadge.textContent = 'Lengkap';
            
            // Tampilkan notifikasi
            const namaSantri = row.cells[1].textContent;
            alert(`Berkas atas nama ${namaSantri} berhasil diverifikasi!`);
            
        } else if (this.textContent === 'Lihat') {
            const row = this.closest('tr');
            const namaSantri = row.cells[1].textContent;
            alert(`Menampilkan detail lengkap biodata ${namaSantri}... (Modul Detail akan terbuka di sini)`);
        }
    });
});