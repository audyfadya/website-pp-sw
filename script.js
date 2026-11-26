document.addEventListener('DOMContentLoaded', () => {
    initGreetingAndLocation();
    initMobileNav();
    initPrayerTimes();
    initDoaHarian();
    initQuranDropdown();
    initJurusanCardsKeyboard();
    initGallerySlider();
});

// =========================================================================
// 1. SAPAAN WAKTU & DETEKSI LOKASI TOP BAR
// =========================================================================
function initGreetingAndLocation() {
    const timeBadge = document.getElementById('time-badge');
    const locationText = document.getElementById('location-text');
    const hour = new Date().getHours();

    if (timeBadge) {
        let greeting = 'Selamat Malam';
        let icon = 'fa-moon';

        if (hour >= 4 && hour < 11) {
            greeting = 'Selamat Pagi';
            icon = 'fa-sun';
        } else if (hour >= 11 && hour < 15) {
            greeting = 'Selamat Siang';
            icon = 'fa-sun';
        } else if (hour >= 15 && hour < 18) {
            greeting = 'Selamat Sore';
            icon = 'fa-cloud-sun';
        }

        timeBadge.innerHTML = `<i class="fa-regular ${icon}"></i> ${greeting}`;
    }

    if (locationText) {
        locationText.innerHTML = `<i class="fa-solid fa-location-dot"></i> Tegalrejo, Magelang`;
    }
}

// =========================================================================
// 2. MENU NAVIGASI MOBILE (HAMBURGER)
// =========================================================================
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('show');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// =========================================================================
// 3. JADWAL SHOLAT HARI INI (API ALADHAN + FALLBACK)
// =========================================================================
async function initPrayerTimes() {
    const subText = document.getElementById('prayer-location-sub');

    const updateUI = (timings, cityLabel) => {
        const map = {
            subuh: timings.Fajr,
            dzuhur: timings.Dhuhr,
            ashar: timings.Asr,
            maghrib: timings.Maghrib,
            isya: timings.Isha
        };

        Object.entries(map).forEach(([key, val]) => {
            const el = document.getElementById(`time-${key}`);
            if (el && val) {
                const cleanTime = val.split(' ')[0];
                el.innerText = `${cleanTime} WIB`;
            }
        });

        if (subText) {
            subText.innerText = `Menampilkan waktu sholat presisi untuk wilayah ${cityLabel}`;
        }

        highlightActivePrayer(map);
    };

    try {
        const res = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Magelang&country=Indonesia&method=20');
        const json = await res.json();
        if (json.code === 200 && json.data?.timings) {
            updateUI(json.data.timings, 'Magelang & Sekitarnya');
        }
    } catch (err) {
        console.warn('Menggunakan jadwal sholat default:', err);
    }
}

function highlightActivePrayer(timings) {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const toMinutes = (timeStr) => {
        if (!timeStr) return 0;
        const [h, m] = timeStr.split(' ')[0].split(':').map(Number);
        return h * 60 + m;
    };

    const schedule = [
        { id: 'card-subuh', min: toMinutes(timings.subuh) },
        { id: 'card-dzuhur', min: toMinutes(timings.dzuhur) },
        { id: 'card-ashar', min: toMinutes(timings.ashar) },
        { id: 'card-maghrib', min: toMinutes(timings.maghrib) },
        { id: 'card-isya', min: toMinutes(timings.isya) }
    ];

    let activeId = 'card-isya';
    for (let i = 0; i < schedule.length; i++) {
        if (currentMinutes < schedule[i].min) {
            activeId = schedule[i].id;
            break;
        }
    }

    document.querySelectorAll('.prayer-card').forEach(card => card.classList.remove('active-prayer'));
    const activeCard = document.getElementById(activeId);
    if (activeCard) activeCard.classList.add('active-prayer');
}

// =========================================================================
// 4. FITUR DOA HARIAN PILIHAN
// =========================================================================
const fallbackDoaList = [
    {
        doa: "Doa Sebelum Tidur",
        ayat: "بِسْمِكَ اللّٰهُمَّ اَحْيَا وَاَمُوْتُ",
        latin: "Bismikallohumma ahya wa amuutu",
        artinya: "Dengan menyebut nama-Mu ya Allah, aku hidup dan aku mati"
    },
    {
        doa: "Doa Bangun Tidur",
        ayat: "اَلْحَمْدُ لِلّٰهِ الَّذِيْ أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُوْرُ",
        latin: "Alhamdu lillahil-ladzi ahyana ba'da ma amatana wa ilaihin-nusyur",
        artinya: "Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami, dan kepada-Nya kami kembali"
    },
    {
        doa: "Doa Sebelum Makan",
        ayat: "اَللّٰهُمَّ بَارِكْ لَنَا فِيْمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
        latin: "Allahumma barik lana fima razaqtana wa qina 'adzaban-nar",
        artinya: "Ya Allah, berkahilah rezeki yang Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka"
    },
    {
        doa: "Doa Sesudah Makan",
        ayat: "اَلْحَمْدُ لِلّٰهِ الَّذِيْ أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمِيْنَ",
        latin: "Alhamdulillahil-ladzi ath'amana wa saqana wa ja'alana minal muslimin",
        artinya: "Segala puji bagi Allah yang telah memberi kami makan dan minum serta menjadikan kami termasuk golongan orang muslim"
    },
    {
        doa: "Doa Sebelum Belajar",
        ayat: "رَبِّ زِدْنِيْ عِلْمًا وَارْزُقْنِيْ فَهْمًا",
        latin: "Rabbi zidni 'ilman warzuqni fahman",
        artinya: "Ya Tuhanku, tambahkanlah ilmu kepadaku dan berilah aku karunia untuk dapat memahaminya"
    },
    {
        doa: "Doa Kedua Orang Tua",
        ayat: "رَبِّ اغْفِرْ لِيْ وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِيْ صَغِيْرًا",
        latin: "Rabbighfir li waliwalidayya warhamhuma kama rabbayani shaghira",
        artinya: "Ya Tuhanku, ampunilah dosaku dan dosa kedua orang tuaku, serta kasihilah mereka sebagaimana mereka mengasihiku di waktu kecil"
    },
    {
        doa: "Doa Kebaikan Dunia & Akhirat",
        ayat: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        latin: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adzaban-nar",
        artinya: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari siksa neraka"
    }
];

async function initDoaHarian() {
    const dropdown = document.getElementById('doaDropdown');
    const nextBtn = document.getElementById('nextDuaBtn');
    if (!dropdown) return;

    let doaData = [...fallbackDoaList];

    try {
        const res = await fetch('https://equran.id/api/doa');
        const json = await res.json();
        const apiList = Array.isArray(json) ? json : json.data;
        if (Array.isArray(apiList) && apiList.length > 0) {
            doaData = apiList.map(item => ({
                doa: item.nama || item.doa || 'Doa Harian',
                ayat: item.ar || item.ayat || '',
                latin: item.tr || item.latin || '',
                artinya: item.idn || item.artinya || ''
            }));
        }
    } catch (err) {
        console.warn('Menggunakan daftar doa lokal:', err);
    }

    const renderDoa = (index) => {
        const item = doaData[index];
        if (!item) return;
        dropdown.value = String(index);
        document.getElementById('dua-arabic').innerText = item.ayat;
        document.getElementById('dua-latin').innerText = item.latin;
        document.getElementById('dua-meaning').innerHTML = `<strong>Artinya:</strong> "${item.artinya}"`;
    };

    dropdown.innerHTML = doaData
        .map((item, idx) => `<option value="${idx}">${item.doa}</option>`)
        .join('');

    dropdown.addEventListener('change', (e) => {
        renderDoa(Number(e.target.value));
    });

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (doaData.length <= 1) return;
            let randomIdx = Math.floor(Math.random() * doaData.length);
            if (randomIdx === Number(dropdown.value)) {
                randomIdx = (randomIdx + 1) % doaData.length;
            }
            renderDoa(randomIdx);
        });
    }

    renderDoa(0);
}

// =========================================================================
// 5. FITUR SEARCH AL-QUR'AN (SURAT & NAVIGASI PANAH KIRI-KANAN AYAT)
// =========================================================================
let daftarSuratList = [];
let currentSurahData = null;
let currentAyatIndex = 0;
let activeSurahLabel = "1. Al-Fatihah (7)";

async function initQuranDropdown() {
    const searchInput = document.getElementById('quranSearchInput');
    const resultsList = document.getElementById('quranSearchResults');
    const searchWrapper = document.getElementById('quranSearchWrapper');
    const prevAyatBtn = document.getElementById('prevAyatBtn');
    const nextAyatBtn = document.getElementById('nextAyatBtn');

    if (!searchInput || !resultsList) return;

    // Set status awal tombol panah kiri nonaktif pada ayat ke-1
    if (prevAyatBtn) prevAyatBtn.disabled = true;

    // Pasang event klik tombol panah kiri (Ayat Sebelumnya)
    if (prevAyatBtn) {
        prevAyatBtn.addEventListener('click', () => {
            if (currentSurahData && currentAyatIndex > 0) {
                tampilkanAyatPilihan(currentAyatIndex - 1);
            }
        });
    }

    // Pasang event klik tombol panah kanan (Ayat Berikutnya)
    if (nextAyatBtn) {
        nextAyatBtn.addEventListener('click', () => {
            if (currentSurahData && currentAyatIndex < currentSurahData.ayat.length - 1) {
                tampilkanAyatPilihan(currentAyatIndex + 1);
            }
        });
    }

    try {
        const response = await fetch('https://equran.id/api/v2/surat');
        const { data } = await response.json();
        daftarSuratList = data;

        const renderFilteredSurat = (keyword = '') => {
            const normalize = (str) => str.toLowerCase().replace(/[-\s']/g, '');
            const q = normalize(keyword);

            const filtered = daftarSuratList.filter(surat =>
                normalize(surat.namaLatin).includes(q) ||
                normalize(surat.arti).includes(q) ||
                String(surat.nomor).includes(keyword.trim())
            );

            resultsList.innerHTML = '';

            if (filtered.length === 0) {
                resultsList.innerHTML = '<li style="color:#94a3b8; cursor:default;">Surat tidak ditemukan</li>';
                return;
            }

            filtered.forEach(surat => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span><strong>${surat.nomor}. ${surat.namaLatin}</strong></span>
                    <span class="ayat-badge">${surat.jumlahAyat} ayat</span>
                `;
                li.addEventListener('click', () => {
                    activeSurahLabel = `${surat.nomor}. ${surat.namaLatin} (${surat.jumlahAyat})`;
                    searchInput.value = activeSurahLabel;
                    resultsList.classList.remove('show');
                    fetchAyatBySurat(surat.nomor);
                });
                resultsList.appendChild(li);
            });
        };

        searchInput.addEventListener('focus', () => {
            searchInput.value = '';
            renderFilteredSurat('');
            resultsList.classList.add('show');
        });

        searchInput.addEventListener('input', (e) => {
            renderFilteredSurat(e.target.value);
            resultsList.classList.add('show');
        });

        document.addEventListener('click', (e) => {
            if (searchWrapper && !searchWrapper.contains(e.target)) {
                resultsList.classList.remove('show');
                searchInput.value = activeSurahLabel;
            }
        });

        searchInput.value = activeSurahLabel;
        await fetchAyatBySurat(1);

    } catch (error) {
        console.error('Gagal memuat daftar surat', error);
    }
}

async function fetchAyatBySurat(nomorSurat) {
    try {
        document.getElementById('quran-arabic').innerText = "Memuat ayat...";

        const response = await fetch(`https://equran.id/api/v2/surat/${nomorSurat}`);
        const { data } = await response.json();

        currentSurahData = data;
        tampilkanAyatPilihan(0);

    } catch (error) {
        console.error('Gagal memuat ayat', error);
        document.getElementById('quran-arabic').innerText = "Gagal memuat ayat.";
    }
}

function tampilkanAyatPilihan(index) {
    if (!currentSurahData || !currentSurahData.ayat[index]) return;

    currentAyatIndex = index;
    const totalAyat = currentSurahData.ayat.length;

    const ayatCurrent = document.getElementById('ayatCurrent');
    const ayatTotal = document.getElementById('ayatTotal');
    const prevAyatBtn = document.getElementById('prevAyatBtn');
    const nextAyatBtn = document.getElementById('nextAyatBtn');

    if (ayatCurrent) ayatCurrent.innerText = index + 1;
    if (ayatTotal) ayatTotal.innerText = `/ ${totalAyat}`;
    if (prevAyatBtn) prevAyatBtn.disabled = index === 0;
    if (nextAyatBtn) nextAyatBtn.disabled = index >= totalAyat - 1;

    const ayat = currentSurahData.ayat[index];
    document.getElementById('quran-arabic').innerText = ayat.teksArab;
    document.getElementById('quran-latin').innerText = ayat.teksLatin;
    document.getElementById('quran-meaning').innerHTML = `<strong>Ayat ke-${ayat.nomorAyat}:</strong> "${ayat.teksIndonesia}"`;
}

// =========================================================================
// 6. MODAL DETAIL JENJANG PENDIDIKAN
// =========================================================================
const lembagaDetails = {
    SMK: {
        title: "SMK Syubbanul Wathon",
        subtitle: "Sekolah Menengah Kejuruan Berbasis Pesantren",
        image: "assets/fotosmk/IMG_0061-scaled.jpg",
        icon: "fa-laptop-code",
        desc: "Menyelenggarakan pendidikan vokasi unggulan dengan kompetensi keahlian Rekayasa Perangkat Lunak (RPL), Teknik Komputer & Jaringan (TKJ), Desain Komunikasi Visual (DKV), serta Tata Busana yang terintegrasi dengan nilai-nilai pesantren.",
        prospects: [
            "Software Developer, Web & Mobile Programmer",
            "Network Administrator & IT Support Industri",
            "Desainer Grafis, Animator & Kreator Konten Digital",
            "Wirausaha Mandiri & Melanjutkan Kuliah Vokasi/Sarjana"
        ]
    },
    SMA: {
        title: "SMA Syubbanul Wathon",
        subtitle: "Sekolah Menengah Atas Unggulan Sains & Sosial",
        image: "assets/fotosmk/IMG_3537-2048x1365.jpg",
        icon: "fa-atom",
        desc: "Memadukan kurikulum nasional dengan pembinaan olimpiade sains, penguatan bahasa asing (Arab & Inggris), serta bimbingan intensif persiapan masuk Perguruan Tinggi Negeri (PTN) dan Timur Tengah.",
        prospects: [
            "Melanjutkan ke PTN Favorit (SNBP / SNBT)",
            "Beasiswa Studi Luar Negeri & Timur Tengah",
            "Akademisi, Peneliti & Tenaga Profesional",
            "Pemimpin Masyarakat Berkarakter Santri"
        ]
    },
    SMP: {
        title: "SMP Syubbanul Wathon",
        subtitle: "Sekolah Menengah Pertama Terpadu",
        image: "assets/foto m/DSC04055-min-1024x683.jpg",
        icon: "fa-book-open",
        desc: "Membentuk fondasi karakter islami sejak dini melalui pembiasaan ibadah harian, program Tahfidz Al-Qur'an Juz 30, literasi sains, serta penguasaan dasar teknologi informasi.",
        prospects: [
            "Hafalan Al-Qur'an Terjaga & Berakhlakul Karimah",
            "Siap Melanjutkan ke Jenjang SMA/SMK/MA Unggulan",
            "Kompetitif dalam Olimpiade Sains & Bahasa"
        ]
    },
    MA: {
        title: "MA Syubbanul Wathon",
        subtitle: "Madrasah Aliyah Keagamaan, MIPA & IPS",
        image: "assets/foto m/jurnalistik.jpg",
        icon: "fa-mosque",
        desc: "Pendidikan tingkat menengah atas berciri khas Islam dengan pendalaman kajian kitab kuning (turats), ilmu tafsir-hadits, serta peminatan MIPA dan IPS berstandar nasional.",
        prospects: [
            "Melanjutkan ke UIN, PTKIN & Universitas Al-Azhar Kairo",
            "Kader Ulama Muda, Dai & Pendidik Islam",
            "Profesional di Bidang Hukum Syariah & Ekonomi Islam"
        ]
    },
    MTs: {
        title: "MTs Syubbanul Wathon",
        subtitle: "Madrasah Tsanawiyah Berbasis Asrama",
        image: "assets/foto m/DSC08087-min-1024x683.jpg",
        icon: "fa-kaaba",
        desc: "Menekankan penguasaan dasar ilmu alat (Nahwu & Shorof), praktik ibadah fiqih sehari-hari, percakapan Bahasa Arab dan Inggris, serta mata pelajaran umum madrasah.",
        prospects: [
            "Mampu Membaca & Memahami Kitab Kuning Dasar",
            "Terampil Berbahasa Arab & Inggris Aktif",
            "Fondasi Kuat Menuju Madrasah Aliyah atau SMA/SMK"
        ]
    }
};

window.openJurusanModal = function (kode) {
    const modal = document.getElementById('jurusanModal');
    const data = lembagaDetails[kode];
    if (!modal || !data) return;

    const imgEl = document.getElementById('m-image');
    if (imgEl) {
        if (data.image) {
            imgEl.src = data.image;
            imgEl.style.display = 'block';
        } else {
            imgEl.style.display = 'none';
        }
    }

    document.getElementById('m-icon').innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
    document.getElementById('m-title').innerText = data.title;
    document.getElementById('m-subtitle').innerText = data.subtitle;
    document.getElementById('m-desc').innerText = data.desc;

    const prospectsList = document.getElementById('m-prospects');
    prospectsList.innerHTML = data.prospects.map(item => `<li>${item}</li>`).join('');

    const daftarBtn = document.getElementById('modalDaftarBtn');
    const daftarText = document.getElementById('modalDaftarText');
    if (daftarBtn) daftarBtn.href = `pendaftaran.html?jenjang=${encodeURIComponent(kode)}`;
    if (daftarText) daftarText.innerText = `Daftar ${kode}`;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
};

window.closeJurusanModal = function () {
    const modal = document.getElementById('jurusanModal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
};

function initJurusanCardsKeyboard() {
    const modal = document.getElementById('jurusanModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeJurusanModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeJurusanModal();
    });

    document.querySelectorAll('.jurusan-card').forEach(card => {
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
}

// =========================================================================
// 7. SLIDER GALERI KEGIATAN SANTRI
// =========================================================================
function initGallerySlider() {
    const container = document.getElementById('galleryContainer');
    const slideLeft = document.getElementById('slideLeft');
    const slideRight = document.getElementById('slideRight');

    if (!container) return;

    if (slideLeft) {
        slideLeft.addEventListener('click', () => {
            container.scrollBy({ left: -340, behavior: 'smooth' });
        });
    }

    if (slideRight) {
        slideRight.addEventListener('click', () => {
            container.scrollBy({ left: 340, behavior: 'smooth' });
        });
    }
}