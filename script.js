// JAVASCRIPT SYUBBANUL WATHON WEBSITE

// Data Detail Jurusan / Lembaga (Deskripsi Lengkap Jurusan, Peminatan, & Keunggulan)
const dataJurusan = {
    'SMK': {
        title: 'SMK Syubbanul Wathon',
        subtitle: 'Pendidikan Vokasi & Keahlian Berbasis Industri',
        icon: '<img src="assets/logosekolah2/SMK-T.png" alt="Logo SMK" style="height: 50px; width: auto; object-fit: contain;">',
        foto: 'assets/fotosmk/IMG_0061-scaled.jpg',
        desc: 'SMK Syubbanul Wathon mencetak tenaga ahli vokasi yang siap kerja, berdaya saing tinggi, dan berakhlak mulia. Pilihan Jurusan/Program Keahlian unggulan:\n\n' +
              '• PPLG (Pengembangan Perangkat Lunak & Gim): Belajar koding web, aplikasi mobile (Flutter/Python), database, & UI/UX.\n' +
              '• TJKT (Teknik Jaringan Komputer & Telekomunikasi): Belajar server, fiber optik, Mikrotik/Cisco, & cybersecurity.\n' +
              '• DKV (Desain Komunikasi Visual): Belajar desain grafis, editing video, animasi 3D, & fotografi.\n' +
              '• TKRO (Teknik Kendaraan Ringan Otomotif): Belajar perawatan mesin mobil EFI, kelistrikan, & diagnosa scanner komputer.\n\n' +
              'Keunggulan: Fasilitas lab komputer & bengkel modern, sertifikasi kompetensi industri, serta penyaluran kerja & bimbingan teknopreneur.',
        prospects: [
            'Software Engineer & Web Developer',
            'Network Specialist & Cloud Admin',
            'Graphic Designer & Content Creator',
            'Teknisi Otomotif & Service Advisor',
            'Wirausaha Industri Kreatif / Startup'
        ]
    },
    'SMA': {
        title: 'SMA Syubbanul Wathon',
        subtitle: 'Persiapan Unggul Perguruan Tinggi & Sains Terpadu',
        icon: '<img src="assets/logosekolah2/SMA.png" alt="Logo SMA" style="height: 50px; width: auto; object-fit: contain;">',
        foto: 'assets/fotosmk/IMG_3537-2048x1365.jpg',
        desc: 'SMA Syubbanul Wathon berfokus pada penguatan akademik sains, teknologi, dan ilmu sosial yang terpadu dengan nilai-nilai pesantren. Pilihan Peminatan/Jurusan:\n\n' +
              '• Peminatan MIPA (Matematika & IPA): Fokus pada biologi, fisika, kimia, matematika lanjut, dan riset ilmiah.\n' +
              '• Peminatan IPS (Ilmu Pengetahuan Sosial): Fokus pada sosiologi, ekonomi, geografi, dan kewirausahaan sosial.\n\n' +
              'Keunggulan: Program bimbingan intensif UTBK-SNBT/Kedinasan, kelas bilingual (Bahasa Inggris & Arab), program ekstrakurikuler olimpiade sains, serta pendampingan karir perguruan tinggi negeri (PTN) & luar negeri.',
        prospects: [
            'Melanjutkan ke Perguruan Tinggi Negeri (PTN) / Kedinasan',
            'Kuliah di Universitas Luar Negeri',
            'Peneliti & Akademisi Sains / Sosial',
            'Praktisi Hukum, Ekonomi, & Sosial'
        ]
    },
    'SMP': {
        title: 'SMP Syubbanul Wathon',
        subtitle: 'Pendidikan Menengah Pertama Berbasis Sains & Tahfidz',
        icon: '<img src="assets/logosekolah2/SMP-T.png" alt="Logo SMP" style="height: 50px; width: auto; object-fit: contain;">',
        foto: 'assets/foto m/DSC04055-min-1024x683.jpg',
        desc: 'SMP Syubbanul Wathon menyelenggarakan pendidikan dasar menengah yang seimbang antara kurikulum nasional dan penguatan karakter islami santri. Program Keunggulan & Pembelajaran:\n\n' +
              '• Program Tahfidzul Qur\'an: Target hafalan Al-Qur\'an Juz 30 dan juz pilihan.\n' +
              '• Literasi Digital & Basic IT: Pengenalan dasar komputer, logika koding dasar, dan multimedia.\n' +
              '• Pengasuhan Karakter Rabbani: Kedisiplinan santri, pembiasaan ibadah yaumiyah, dan pembentukan akhlakul karimah 24 jam.\n\n' +
              'Keunggulan: Pengajar profesional, lingkungan asrama yang kondusif, serta kesiapan siswa berprestasi di tingkat SMA/SMK unggulan.',
        prospects: [
            'Lulusan Berkarakter Qur\'ani & Mandiri',
            'Persiapan Lanjut ke SMA / SMK Unggulan',
            'Penguasaan Dasar Bahasa & Sains'
        ]
    },
    
    'MA': {
        title: 'MA Syubbanul Wathon',
        subtitle: 'Madrasah Aliyah Keagamaan & Kajian Kitab Kuning',
        icon: '<img src="assets/logosekolah2/EM-MA.png" alt="Logo MA" style="height: 50px; width: auto; object-fit: contain;">',
        foto: 'assets/foto m/jurnalistik.jpg',
        desc: 'MA Syubbanul Wathon memberikan pendalaman keilmuan Islam secara komprehensif dan mendalam. Pilihan Peminatan Program:\n\n' +
              '• Program Keagamaan (PK / IIK): Pendalaman kajian Kitab Kuning (Fiqih, Tafsir, Hadits, Nahwu-Shorof ala API Tegalrejo).\n' +
              '• Peminatan MIPA & IPS Aliyah: Perpaduan kurikulum madrasah Kemenag dan ilmu pengetahuan umum.\n\n' +
              'Keunggulan: Bahasa Arab aktif (Kemampuan Balaghoh & Muhatasatsah), sanad keilmuan pesantren salaf yang bersambung, serta persiapan masuk Universitas Islam Dalam & Luar Negeri (UIN, Al-Azhar Mesir, Middle East).',
        prospects: [
            'Kuliah di Universitas Al-Azhar Kairo / Timur Tengah',
            'Melanjutkan ke UIN / IAIN / Perguruan Tinggi Islam',
            'Kader Ulama, Da\'i, & Tokoh Masyarakat',
            'Pengajar Pendidikan Agama & Bahasa Arab'
        ]
    },

    'MTs': {
        title: 'MTs Syubbanul Wathon',
        subtitle: 'Madrasah Tsanawiyah Terpadu Keagamaan & Muamalah',
        icon: '<img src="assets/logosekolah2/logo-mts-newest.png" alt="Logo MTs" style="height: 50px; width: auto; object-fit: contain;">',
        foto: 'assets/foto m/DSC08087-min-1024x683.jpg',
        desc: 'MTs Syubbanul Wathon membentuk fondasi agama dan akademik yang kokoh di tingkat tsanawiyah. Program Keunggulan & Pembelajaran:\n\n' +
              '• Pendalaman Dasar Kitab Kuning: Pengenalan dasar Bahasa Arab, Safinatun Najah, & Aqidatul Awam.\n' +
              '• Pengenalan Perbankan & Ekonomi Syariah: Literasi dasar keuangan islami, tata kelola muamalah, dan kejujuran.\n' +
              '• Pembiasaan Bahasa & Ibadah: Praktik percakapan bahasa Arab/Inggris harian dan setoran hafalan doa & surah pendek.\n\n' +
              'Keunggulan: Memadukan kurikulum Kemenag dengan nilai-nilai pesantren salafiyah untuk mencetak santri berilmu dan berakhlak.',
        prospects: [
            'Persiapan Lanjut ke MA / SMA / SMK Pesantren',
            'Lulusan Berwawasan Muamalah & Agamis',
            'Penguasaan Dasar Bahasa Arab & Kitab Kuning'
        ]
    }
};

// Data Doa-Doa Harian (Fix String Kutip)
const listDoa = [
    {
        title: 'Doa Sebelum Belajar',
        arabic: 'رَضِيْتُ بِاللهِ رَبًّا، وَبِالْإِسْلَامِ دِيْنًا، وَبِمُحَمَّدٍ نَبِيًّا وَرَسُوْلًا، رَبِّ زِدْنِيْ عِلْمًا وَارْزُقْنِيْ فَهْمًا',
        latin: `"Rodhitu billahi robba, wa bil-islami dina, wa bi-muhammadin nabiyyaw wa rosula. Robbi zidni 'ilmaw warzuqni fahma."`,
        meaning: 'Artinya: "Aku ridho Allah sebagai Tuhanku, Islam sebagai agamaku, dan Nabi Muhammad sebagai Nabi dan Rasulku. Ya Allah, tambahkanlah aku ilmu dan berilah aku karunia untuk memahaminya."'
    },
    {
        title: 'Doa Pembuka Hati / Kelancaran Bicara',
        arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي',
        latin: `"Robbishroh lii shodrii, wa yassir lii amrii, wahlul 'uqdatam mil lisaanii, yafqohuu qowlii."`,
        meaning: 'Artinya: "Ya Tuhanku, lapangkanlah dadaku, mudahkanlah urusanku, dan melepaskan kekakuan dari lidahku, supaya mereka mengerti perkataanku."'
    },
    {
        title: 'Doa Kebaikan Dunia & Akhirat',
        arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        latin: `"Rabbana atina fid-dunya hasanah, wa fil-akhirati hasanah, wa qina 'adzaban-nar."`,
        meaning: 'Artinya: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat dan peliharalah kami dari siksa neraka."'
    },
    {
        title: 'Doa Untuk Kedua Orang Tua',
        arabic: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
        latin: `"Rabbighfir lii wa liwaalidayya warhamhuma kamaa rabbayaanii shaghiiraa."`,
        meaning: 'Artinya: "Ya Tuhanku, ampunilah aku dan kedua orang tuaku, serta kasihilah keduanya sebagaimana mereka telah merawatku sewaktu kecil."'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initDynamicTimeGreeting();
    initLocationAndPrayerTimes();
    setupEventListeners();
});

// 1. Fitur Waktu Dinamis (SELALU LIGHT MODE)
function initDynamicTimeGreeting() {
    const timeBadge = document.getElementById('time-badge');
    const hour = new Date().getHours();
    let greetingText = '';
    let iconClass = '';

    // KUNCI TEMA LIGHT MODE SELAMANYA
    document.body.className = 'theme-day';

    if (hour >= 3 && hour < 10) {
        greetingText = 'Selamat Pagi'; iconClass = 'fa-regular fa-sun';
    } else if (hour >= 10 && hour < 15) {
        greetingText = 'Selamat Siang'; iconClass = 'fa-solid fa-sun';
    } else if (hour >= 15 && hour < 18) {
        greetingText = 'Selamat Sore'; iconClass = 'fa-solid fa-cloud-sun';
    } else {
        greetingText = 'Selamat Malam'; iconClass = 'fa-solid fa-moon';
    }

    if (timeBadge) timeBadge.innerHTML = `<i class="${iconClass}"></i> ${greetingText}`;
}

// 2. Fitur Deteksi Lokasi API & Jadwal Sholat
function initLocationAndPrayerTimes() {
    const locationText = document.getElementById('location-text');
    const prayerLocationSub = document.getElementById('prayer-location-sub');

    let defaultLat = -7.3305;
    let defaultLon = 110.5084;
    let defaultCity = 'Salatiga';

    async function getCityName(lat, lon) {
        try {
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=id`);
            const data = await response.json();
            return data.city || data.locality || defaultCity;
        } catch (err) {
            return defaultCity;
        }
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const city = await getCityName(lat, lon);
                updateLocationDisplay(city, locationText, prayerLocationSub);
                fetchPrayerTimes(lat, lon);
            },
            (error) => {
                console.log("Izin lokasi gagal/ditolak. Menggunakan lokasi default.");
                updateLocationDisplay(defaultCity, locationText, prayerLocationSub);
                fetchPrayerTimes(defaultLat, defaultLon);
            },
            { timeout: 8000 } 
        );
    } else {
        updateLocationDisplay(defaultCity, locationText, prayerLocationSub);
        fetchPrayerTimes(defaultLat, defaultLon);
    }
}

function updateLocationDisplay(city, el1, el2) {
    if (el1) el1.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${city}, Jawa Tengah`;
    if (el2) el2.innerText = `Menampilkan waktu sholat presisi untuk wilayah ${city} dan sekitarnya.`;
}

// Fetch API Jadwal Sholat
async function fetchPrayerTimes(latitude, longitude) {
    try {
        const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=20`);
        const data = await response.json();
        
        if (data && data.data && data.data.timings) {
            const t = data.data.timings;
            document.getElementById('time-subuh').innerText = t.Fajr + ' WIB';
            document.getElementById('time-dzuhur').innerText = t.Dhuhr + ' WIB';
            document.getElementById('time-ashar').innerText = t.Asr + ' WIB';
            document.getElementById('time-maghrib').innerText = t.Maghrib + ' WIB';
            document.getElementById('time-isya').innerText = t.Isha + ' WIB';
        }
    } catch (e) {
        console.log('Gagal fetch jadwal sholat, gunakan default.');
    }
}

// 3. Fitur Interaktif Modal Jurusan SMK (Dengan FOTO)
function openJurusanModal(key) {
    const item = dataJurusan[key];
    if (!item) return;

    // Memunculkan Foto jika file namanya ada di JS
    const modalImg = document.getElementById('m-image');
    if (item.foto) {
        modalImg.src = item.foto;
        modalImg.style.display = 'block';
    } else {
        modalImg.style.display = 'none'; // Sembunyikan kalau gak ada foto
    }

    document.getElementById('m-icon').innerHTML = item.icon;
    document.getElementById('m-title').innerText = item.title;
    document.getElementById('m-subtitle').innerText = item.subtitle;
    document.getElementById('m-desc').innerText = item.desc;

    const listContainer = document.getElementById('m-prospects');
    listContainer.innerHTML = '';
    item.prospects.forEach(p => {
        const li = document.createElement('li');
        li.innerText = p;
        listContainer.appendChild(li);
    });

    document.getElementById('jurusanModal').classList.add('open');
}

function closeJurusanModal() {
    document.getElementById('jurusanModal').classList.remove('open');
}

// 4. Fitur Ganti Doa Harian
let currentDuaIdx = 0;
function setupEventListeners() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    const nextDuaBtn = document.getElementById('nextDuaBtn');
    if (nextDuaBtn) {
        nextDuaBtn.addEventListener('click', () => {
            currentDuaIdx = (currentDuaIdx + 1) % listDoa.length;
            const doa = listDoa[currentDuaIdx];
            document.getElementById('dua-title').innerText = doa.title;
            document.getElementById('dua-arabic').innerText = doa.arabic;
            document.getElementById('dua-latin').innerText = doa.latin;
            document.getElementById('dua-meaning').innerHTML = `<strong>Artinya:</strong> ${doa.meaning}`;
        });
    }

    // 5. Fitur Geser Galeri Animasi
    const slideLeftBtn = document.getElementById('slideLeft');
    const slideRightBtn = document.getElementById('slideRight');
    const galleryContainer = document.getElementById('galleryContainer');

    if (slideLeftBtn && slideRightBtn && galleryContainer) {
        // Geser ke kiri sejauh 340px (lebar kartu + jarak)
            slideLeftBtn.addEventListener('click', () => {
            galleryContainer.scrollBy({ left: -340, behavior: 'smooth' });
        });

        // Geser ke kanan sejauh 340px
            slideRightBtn.addEventListener('click', () => {
             galleryContainer.scrollBy({ left: 340, behavior: 'smooth' });
        });
    }
    
    // Tutup saat di-klik background hitam luar pop up
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('jurusanModal');
        if (e.target === modal) {
            closeJurusanModal();
        }
    });
}