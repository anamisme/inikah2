// SPLASH SCREEN & HEARTS EFFECT
window.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splashScreen');

    // Jika dibuka dari APK (?app=1), langsung sembunyikan splash
    const isApp = new URLSearchParams(location.search).get('app') === '1';
    if (isApp) {
        if (splash) {
            splash.style.opacity = '0';
            splash.style.transition = 'none';
            setTimeout(function() { splash.style.display = 'none'; }, 10);
        }
    } else {
        setTimeout(() => { createSplashHearts(); }, 500);
        setTimeout(() => {
            if (splash) {
                splash.style.opacity = '0';
                splash.style.transform = 'scale(1.06)';
                setTimeout(() => splash.style.display = 'none', 800);
            }
        }, 2600);
    }

    // Restore theme preference
    const saved = localStorage.getItem('inikah-theme');
    if (saved === 'dark') {
        document.body.classList.add('dark-mode');
        updateToggleIcon(true);
    }
});

// THEME TOGGLE
const themeToggle = document.getElementById('themeToggle');
const toggleIcon = document.getElementById('toggleIcon');

function updateToggleIcon(isDark) {
    toggleIcon.textContent = isDark ? 'light_mode' : 'dark_mode';
}

themeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isDark = document.body.classList.toggle('dark-mode');
    updateToggleIcon(isDark);
    localStorage.setItem('inikah-theme', isDark ? 'dark' : 'light');
});

themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
    }
});

function createSplashHearts() {
    const splash = document.getElementById('splashScreen');
    const icons = ['favorite', 'favorite_border'];
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            if(!splash || splash.style.display === 'none') return;
            const heart = document.createElement('span');
            heart.className = 'material-icons-outlined splash-heart';
            heart.innerText = icons[Math.floor(Math.random() * icons.length)];
            heart.style.left = `${Math.floor(Math.random() * 60) + 20}%`;
            heart.style.fontSize = `${Math.floor(Math.random() * 12) + 16}px`;
            splash.appendChild(heart);
            setTimeout(() => heart.remove(), 2000);
        }, i * 140);
    }
}

// SUBMENU FLOATING OVERLAY
function toggleMainMenu(idSubmenu, idChevron) {
    const chevron = document.getElementById(idChevron);
    const template = document.getElementById(idSubmenu);
    if (!chevron || !template) return;

    if (chevron.classList.contains('rotated')) {
        closeOverlay(chevron);
        return;
    }

    const overlay = document.getElementById('submenuOverlay');
    const panelInner = document.getElementById('submenuPanelInner');
    if (!overlay || !panelInner) return;

    panelInner.innerHTML = '';
    const content = template.querySelector('.ios-submenu-inner');
    if (content) panelInner.appendChild(content.cloneNode(true));

    panelInner.onclick = function(e) {
        var link = e.target.closest('a');
        if (link && link.getAttribute('href')) {
            var href = link.getAttribute('href');
            if (href && !href.startsWith('#') && href !== '' && !link.hasAttribute('data-no-close')) {
                e.preventDefault();
                closeOverlay();
                setTimeout(function() { window.location.href = href; }, 150);
            }
        }
    };

    overlay.classList.add('open');
    chevron.classList.add('rotated');

    overlay._onClose = function() {
        chevron.classList.remove('rotated');
    };
}

function closeOverlay(chevron) {
    const overlay = document.getElementById('submenuOverlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    if (chevron) {
        chevron.classList.remove('rotated');
    } else if (overlay._onClose) {
        overlay._onClose();
    }
    setTimeout(function() {
        const panelInner = document.getElementById('submenuPanelInner');
        if (panelInner) panelInner.innerHTML = '';
    }, 300);
}

function toggleBookShelf(event) {
    event.stopPropagation();
    const panel = document.getElementById('submenuPanelInner');
    if (!panel) return;
    const shelf = panel.querySelector('#innerBookshelf');
    const chev  = panel.querySelector('#bookChevron');
    if (shelf && chev) {
        shelf.classList.toggle('show');
        chev.style.transform = shelf.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
    }
}

// UNIVERSAL FLOATING MODAL SYSTEM
window.bukaModalFrame = function(url, judul) {
    const overlay = document.getElementById('submenuOverlay');
    if (overlay && overlay.classList.contains('open')) closeOverlay();
    const modal = document.getElementById('appModal');
    const frame = document.getElementById('appModalFrame');
    const title = document.getElementById('appModalTitle');
    if (modal && frame && title) {
        title.innerText = judul;
        frame.src = url;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

window.tutupModalFrame = function() {
    const modal = document.getElementById('appModal');
    const frame = document.getElementById('appModalFrame');
    if (modal && frame) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        setTimeout(() => { frame.src = ""; }, 400);
    }
}

// SERTIFIKAT FLOATING MODAL CONTROLLER
window.bukaModalSertifikat = function() {
    const modal = document.getElementById('searchModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        setTimeout(() => { document.getElementById('searchInput').focus(); }, 300);
    }
}

window.tutupModalSertifikat = function() {
    const modal = document.getElementById('searchModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        document.getElementById('searchInput').value = '';
        document.getElementById('resultArea').innerHTML = '';
    }
}

// BLANGKO FLOATING MODAL CONTROLLER
window.bukaModalBlanko = function() {
    const modal = document.getElementById('blankoModal');
    if (modal) { modal.classList.add('show'); document.body.style.overflow = 'hidden'; }
}

window.tutupModalBlanko = function() {
    const modal = document.getElementById('blankoModal');
    if (modal) { modal.classList.remove('show'); document.body.style.overflow = ''; }
}

// JADWAL MODAL CONTROLLER
window.bukaModalJadwal = function() {
    const modal = document.getElementById('jadwalModal');
    if (modal) { modal.classList.add('show'); document.body.style.overflow = 'hidden'; loadJadwalModal(); }
}

window.tutupModalJadwal = function() {
    const modal = document.getElementById('jadwalModal');
    if (modal) { modal.classList.remove('show'); document.body.style.overflow = ''; }
}

function loadJadwalModal() {
    const container = document.getElementById('jadwalModalContent');
    container.innerHTML = '<div class="text-center text-muted p-4"><div class="spinner-border spinner-border-sm text-success me-2" role="status"></div> Memuat data jadwal...</div>';
    fetch('api/jadwal-api.php?action=getJadwal')
        .then(r => r.json())
        .then(data => {
            if (!data || data.length === 0) {
                container.innerHTML = '<div class="text-center text-muted p-4"><span class="material-icons-outlined" style="font-size:48px;color:#cbd5e1;">event_busy</span><p class="mt-2" style="font-size:0.9rem;">Belum ada data jadwal akad.</p></div>';
                return;
            }
            window._jadwalData = data;
            renderJadwalList(data, container);
        })
        .catch(() => { container.innerHTML = '<div class="text-center p-4" style="color:#ef4444;font-size:0.9rem;">Gagal memuat data.</div>'; });
}

function renderJadwalList(data, container) {
    let html = '<div style="margin-bottom:12px;display:flex;gap:8px;flex-wrap:wrap;">';
    html += '<input type="text" id="jadwalSearchInput" placeholder="🔍 Cari nama..." style="flex:1;min-width:140px;padding:12px 16px;border-radius:12px;border:1.5px solid rgba(15,118,110,0.08);font-size:0.85rem;outline:none;background:#fff;">';
    html += '<input type="date" id="jadwalDateFilter" style="padding:12px 16px;border-radius:12px;border:1.5px solid rgba(15,118,110,0.08);font-size:0.85rem;outline:none;background:#fff;">';
    html += '</div>';
    html += '<div id="jadwalListContainer">';
    html += buildJadwalItems(data);
    html += '</div>';
    container.innerHTML = html;

    document.getElementById('jadwalSearchInput').addEventListener('input', filterJadwal);
    document.getElementById('jadwalDateFilter').addEventListener('change', filterJadwal);
}

function filterJadwal() {
    const query = (document.getElementById('jadwalSearchInput').value || '').toLowerCase().trim();
    const dateVal = document.getElementById('jadwalDateFilter').value || '';
    const filtered = window._jadwalData.filter(item => {
        const pria = (item.nama_pria || '').toLowerCase();
        const wanita = (item.nama_wanita || '').toLowerCase();
        const matchName = !query || pria.includes(query) || wanita.includes(query);
        const matchDate = !dateVal || item.tanggal_akad === dateVal;
        return matchName && matchDate;
    });
    document.getElementById('jadwalListContainer').innerHTML = buildJadwalItems(filtered);
}

function buildJadwalItems(data) {
    if (!data || data.length === 0) {
        return '<div style="text-align:center;padding:20px;color:#64748b;font-size:0.85rem;">Tidak ada data yang cocok.</div>';
    }
    let html = '<div style="display:flex;flex-direction:column;gap:10px;">';
    data.forEach(item => {
        html += '<div style="background:#fff;border-radius:14px;padding:14px 16px;border:1px solid rgba(15,118,110,0.08);">';
        html += '<p style="font-size:0.9rem;font-weight:700;margin-bottom:4px;">' + _esc(item.nama_pria) + ' & ' + _esc(item.nama_wanita) + '</p>';
        html += '<p style="font-size:0.78rem;color:#64748b;">📅 ' + _esc(item.tanggal_akad) + ' · ⏰ ' + _esc(item.waktu || '') + '</p>';
        html += '<p style="font-size:0.78rem;color:#64748b;">📍 ' + _esc(item.desa || '') + '</p>';
        html += '</div>';
    });
    html += '</div>';
    return html;
}

// PETUGAS MODAL CONTROLLER
window.bukaModalPetugas = function() {
    const modal = document.getElementById('petugasModal');
    if (modal) { modal.classList.add('show'); document.body.style.overflow = 'hidden'; loadPetugasModal(); }
}

window.tutupModalPetugas = function() {
    const modal = document.getElementById('petugasModal');
    if (modal) { modal.classList.remove('show'); document.body.style.overflow = ''; }
}

function loadPetugasModal() {
    const container = document.getElementById('petugasModalContent');
    container.innerHTML = '<div class="text-center text-muted p-4"><div class="spinner-border spinner-border-sm text-success me-2" role="status"></div> Memuat data petugas...</div>';
    fetch('api/jadwal-api.php?action=getPetugas')
        .then(r => r.json())
        .then(data => {
            if (!data || data.length === 0) {
                container.innerHTML = '<div class="text-center text-muted p-4"><span class="material-icons-outlined" style="font-size:48px;color:#cbd5e1;">person_off</span><p class="mt-2" style="font-size:0.9rem;">Belum ada data petugas.</p></div>';
                return;
            }
            window._petugasData = data;
            renderPetugasList(data, container);
        })
        .catch(() => { container.innerHTML = '<div class="text-center p-4" style="color:#ef4444;font-size:0.9rem;">Gagal memuat data.</div>'; });
}

function renderPetugasList(data, container) {
    let html = '<div style="margin-bottom:12px;display:flex;gap:8px;flex-wrap:wrap;">';
    html += '<input type="text" id="petugasSearchInput" placeholder="🔍 Cari nama..." style="flex:1;min-width:140px;padding:12px 16px;border-radius:12px;border:1.5px solid rgba(15,118,110,0.08);font-size:0.85rem;outline:none;background:#fff;">';
    html += '<input type="date" id="petugasDateFilter" style="padding:12px 16px;border-radius:12px;border:1.5px solid rgba(15,118,110,0.08);font-size:0.85rem;outline:none;background:#fff;">';
    html += '</div>';
    html += '<div id="petugasListContainer">';
    html += buildPetugasItems(data);
    html += '</div>';
    container.innerHTML = html;

    document.getElementById('petugasSearchInput').addEventListener('input', filterPetugas);
    document.getElementById('petugasDateFilter').addEventListener('change', filterPetugas);
}

function filterPetugas() {
    const query = (document.getElementById('petugasSearchInput').value || '').toLowerCase().trim();
    const dateVal = document.getElementById('petugasDateFilter').value || '';
    const filtered = window._petugasData.filter(item => {
        const petugas = (item.nama_petugas || '').toLowerCase();
        const pria = (item.nama_pria || '').toLowerCase();
        const wanita = (item.nama_wanita || '').toLowerCase();
        const matchName = !query || petugas.includes(query) || pria.includes(query) || wanita.includes(query);
        const matchDate = !dateVal || item.tanggal === dateVal;
        return matchName && matchDate;
    });
    document.getElementById('petugasListContainer').innerHTML = buildPetugasItems(filtered);
}

function buildPetugasItems(data) {
    if (!data || data.length === 0) {
        return '<div style="text-align:center;padding:20px;color:#64748b;font-size:0.85rem;">Tidak ada data yang cocok.</div>';
    }
    let html = '<div style="display:flex;flex-direction:column;gap:12px;">';
    data.forEach(item => {
        html += '<div style="background:#fff;border-radius:14px;padding:14px 16px;border:1px solid rgba(15,118,110,0.08);display:flex;align-items:center;gap:12px;">';
        if (item.foto) {
            html += '<img src="' + _esc(item.foto) + '" onclick="openFotoLightbox(this.src)" style="width:56px;height:56px;border-radius:12px;object-fit:cover;border:1px solid rgba(15,118,110,0.08);flex-shrink:0;cursor:pointer;" alt="Foto">';
        } else {
            html += '<div style="width:56px;height:56px;border-radius:12px;background:#e2e8f0;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><span class="material-icons-outlined" style="color:#94a3b8;">person</span></div>';
        }
        html += '<div style="flex:1;min-width:0;">';
        html += '<p style="font-size:0.9rem;font-weight:700;margin-bottom:3px;">' + _esc(item.nama_petugas) + '</p>';
        html += '<p style="font-size:0.78rem;color:#64748b;">📅 ' + _esc(item.tanggal) + ' · ⏰ ' + _esc(item.waktu || '') + '</p>';
        html += '<p style="font-size:0.78rem;color:#64748b;">👤 ' + _esc(item.nama_pria) + ' & ' + _esc(item.nama_wanita) + '</p>';
        html += '</div></div>';
    });
    html += '</div>';
    return html;
}

// FOTO LIGHTBOX - popup foto ukuran asli
function openFotoLightbox(src) {
    // Hapus lightbox lama jika ada
    const existing = document.getElementById('fotoLightbox');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'fotoLightbox';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;padding:20px;cursor:zoom-out;opacity:0;transition:opacity 0.3s ease;';
    
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.5);object-fit:contain;transform:scale(0.9);transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1);';
    
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Animate in
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        img.style.transform = 'scale(1)';
    });

    // Tutup lightbox
    overlay.addEventListener('click', () => {
        overlay.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        setTimeout(() => {
            overlay.remove();
            document.body.style.overflow = '';
        }, 300);
    });
}
window.openFotoLightbox = openFotoLightbox;

// HTML escape helper
function _esc(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
}

// CLOSE MODAL ON BACKDROP CLICK
window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.app-modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', e => {
            if (e.target !== overlay) return;
            overlay.classList.remove('show');
            document.body.style.overflow = '';
            const frame = overlay.querySelector('iframe');
            if (frame) setTimeout(() => { frame.src = ''; }, 400);
            const inp = overlay.querySelector('#searchInput');
            const ra = overlay.querySelector('#resultArea');
            if (inp) inp.value = '';
            if (ra) ra.innerHTML = '';
        });
    });
});

// CERTIFICATE DATABASE QUERY EXECUTION
function prosesCariSertifikat() {
    const input      = document.getElementById('searchInput').value.trim();
    const loading    = document.getElementById('loading');
    const resultArea = document.getElementById('resultArea');

    if (!input) return alert('Silakan masukkan nama lengkap!');

    loading.classList.remove('d-none');
    resultArea.innerHTML = '';

    fetch("api/sertifikat.php?q=" + encodeURIComponent(input))
        .then(r => r.json())
        .then(data => {
            loading.classList.add('d-none');
            if (data.length === 0) {
                resultArea.innerHTML = '<div class="text-center text-muted p-4 page-view"><span class="material-icons-outlined" style="font-size:48px;color:#cbd5e1;">search_off</span><p class="mt-2" style="font-size:0.9rem;">Sertifikat belum terbit atau nama salah.<br><small>Pastikan nama sesuai dengan form Post-Test.</small></p></div>';
            } else {
                let html = '<div class="ios-list-group page-view">';
                data.forEach(item => {
                    const safeNama = document.createElement('span');
                    safeNama.textContent = item.nama || '';
                    const safeLink = (item.link || '').replace(/[^a-zA-Z0-9\-._~:/?#\[\]@!$&'()*+,;=%]/g, '');
                    const downloadLink = safeLink.startsWith('http') ? safeLink : 'api/download.php?file=' + encodeURIComponent(safeLink);
                    html += '<a href="' + downloadLink + '" target="_blank" rel="noopener noreferrer" class="ios-list-item"><div class="ios-list-left"><div class="ios-list-badge">E-CERT</div><div class="ios-list-title-box"><span class="ios-list-main-title" style="text-transform:uppercase;">' + safeNama.innerHTML + '</span><span style="font-size:0.75rem;color:var(--muted);">Sertifikat Siap Diunduh</span></div></div><span class="material-icons-outlined" style="color:var(--green-mid);">file_download</span></a>';
                });
                html += '</div>';
                resultArea.innerHTML = html;
            }
        })
        .catch(err => {
            loading.classList.add('d-none');
            alert('Gagal memuat data. Periksa kembali koneksi internet Anda.');
        });
}

document.getElementById("searchInput").addEventListener("keypress", e => {
    if (e.key === "Enter") prosesCariSertifikat();
});


// ════════════════════════════════
// NOTIFIKASI SYSTEM
// ════════════════════════════════
const NOTIF_SCRIPT_URL = 'api/notifikasi.php';

window.bukaModalNotif = function() {
    const modal = document.getElementById('notifModal');
    if (modal) { modal.classList.add('show'); document.body.style.overflow = 'hidden'; }
}

window.tutupModalNotif = function() {
    const modal = document.getElementById('notifModal');
    if (modal) { modal.classList.remove('show'); document.body.style.overflow = ''; }
}

function loadNotifications() {
    fetch(NOTIF_SCRIPT_URL + '?action=get')
        .then(r => r.json())
        .then(data => {
            if (!data || data.length === 0) { document.getElementById('notifBadge').style.display = 'none'; return; }
            renderNotifList(data);
            updateBadge(data);
        })
        .catch(err => console.log('Notif fetch skipped:', err.message));
}

function renderNotifList(data) {
    const container = document.getElementById('notifList');
    if (!data || data.length === 0) {
        container.innerHTML = '<div class="text-center text-muted p-4"><span class="material-icons-outlined" style="font-size:48px;color:#cbd5e1;">notifications_off</span><p class="mt-2" style="font-size:0.9rem;">Belum ada notifikasi.</p></div>';
        return;
    }
    let html = '';
    data.forEach(item => {
        const safeTitle = document.createElement('span');
        safeTitle.textContent = item.judul || '';
        const safeMsg = document.createElement('span');
        safeMsg.textContent = item.pesan || '';
        let tgl = item.tanggal || '';
        if (tgl && tgl.includes('T')) {
            const d = new Date(tgl);
            tgl = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        }
        html += '<div class="notif-item unread"><div class="notif-item-title">' + safeTitle.innerHTML + '</div><div class="notif-item-msg">' + safeMsg.innerHTML + '</div><div class="notif-item-date">' + tgl + '</div></div>';
    });
    container.innerHTML = html;
}

function updateBadge(data) {
    const badge = document.getElementById('notifBadge');
    const count = data.length;
    if (count > 0) { badge.textContent = count > 9 ? '9+' : count; badge.style.display = 'flex'; }
    else { badge.style.display = 'none'; }
}

setTimeout(loadNotifications, 3000);

// ════════════════════════════════
// BANNER CAROUSEL SYSTEM
// ════════════════════════════════
const BANNER_COLORS = [
    'linear-gradient(145deg, #064e3b, #0f766e)',
    'linear-gradient(145deg, #0369a1, #0c4a6e)',
    'linear-gradient(145deg, #7c3aed, #4c1d95)',
    'linear-gradient(145deg, #be185d, #831843)',
    'linear-gradient(145deg, #b45309, #78350f)',
    'linear-gradient(145deg, #1d4ed8, #1e3a8a)'
];

let bannerCurrent = 0;
let bannerTotal = 0;
let bannerInterval = null;

function loadBanners() {
    fetch(NOTIF_SCRIPT_URL + '?action=getBanners')
        .then(r => r.json())
        .then(data => {
            if (!data || data.length === 0) { document.getElementById('bannerCarousel').style.display = 'none'; return; }
            renderBanners(data);
        })
        .catch(() => {});
}

function renderBanners(data) {
    const carousel = document.getElementById('bannerCarousel');
    const track = document.getElementById('bannerTrack');
    const dotsContainer = document.getElementById('bannerDots');
    bannerTotal = data.length;
    if (bannerTotal === 0) { carousel.style.display = 'none'; return; }
    carousel.style.display = 'block';
    let trackHtml = '';
    let dotsHtml = '';
    data.forEach((item, i) => {
        const bg = item.gambar ? "background-image:url('" + item.gambar + "');background-size:cover;background-position:center;" : "background:" + (item.warna || BANNER_COLORS[i % BANNER_COLORS.length]) + ";";
        const safeTitle = document.createElement('span');
        safeTitle.textContent = item.judul || '';
        const safeTag = document.createElement('span');
        safeTag.textContent = item.tag || 'INFO';
        const link = item.link ? "onclick=\"window.open('" + item.link.replace(/'/g, "\\'") + "', '_blank')\"" : '';
        trackHtml += '<div class="banner-slide"><div class="banner-card" style="' + bg + '" ' + link + '><div class="banner-card-content"><div class="banner-tag">' + safeTag.innerHTML + '</div><div class="banner-title">' + safeTitle.innerHTML + '</div></div></div></div>';
        dotsHtml += '<span class="banner-dot ' + (i === 0 ? 'active' : '') + '" onclick="goToBanner(' + i + ')"></span>';
    });
    track.innerHTML = trackHtml;
    dotsContainer.innerHTML = dotsHtml;
    if (bannerTotal > 1) {
        bannerInterval = setInterval(() => { bannerCurrent = (bannerCurrent + 1) % bannerTotal; goToBanner(bannerCurrent); }, 4000);
    }
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.changedTouches[0].screenX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) bannerCurrent = (bannerCurrent + 1) % bannerTotal;
            else bannerCurrent = (bannerCurrent - 1 + bannerTotal) % bannerTotal;
            goToBanner(bannerCurrent);
            resetBannerInterval();
        }
    }, { passive: true });
}

function goToBanner(index) {
    bannerCurrent = index;
    const track = document.getElementById('bannerTrack');
    const dots = document.querySelectorAll('.banner-dot');
    track.style.transform = 'translateX(-' + (index * 100) + '%)';
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

function resetBannerInterval() {
    if (bannerInterval) clearInterval(bannerInterval);
    if (bannerTotal > 1) {
        bannerInterval = setInterval(() => { bannerCurrent = (bannerCurrent + 1) % bannerTotal; goToBanner(bannerCurrent); }, 4000);
    }
}

setTimeout(loadBanners, 1500);

// ===== DATA KEAGAMAAN =====

// ===== PONDASI SAKINAH =====
window.bukaModalPondasi = function() {
    try {
        var modal = document.getElementById('pondasiModal');
        if (!modal) { console.error('pondasiModal not found'); return; }
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        loadPondasiData();
    } catch(e) { console.error('bukaModalPondasi error:', e); }
};

window.tutupModalPondasi = function() {
    try {
        var modal = document.getElementById('pondasiModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    } catch(e) { console.error('tutupModalPondasi error:', e); }
};

window.loadPondasiData = function() {
    try {
        var container = document.getElementById('pondasiContent');
        if (!container) { console.error('pondasiContent not found'); return; }
        container.innerHTML = '<div class="text-center text-muted p-4"><div class="spinner-border spinner-border-sm text-success me-2" role="status"></div>Memuat data...</div>';

        fetch('api/jadwal-api.php?action=getPondasi')
            .then(function(r) { return r.json(); })
            .then(function(data) {
                if (!data || data.length === 0) {
                    container.innerHTML = '<div class="text-center p-4"><p style="font-size:0.85rem;color:#94a3b8;">Belum ada data calon pengantin.</p></div>';
                    return;
                }
            var html = '<div style="display:flex;flex-direction:column;gap:12px;">';
            data.forEach(function(item) {
                html += '<div style="display:flex;align-items:start;gap:14px;background:#fff;border-radius:14px;padding:14px 16px;border:1px solid rgba(15,118,110,0.08);">';
                if (item.foto) {
                    html += '<img src="' + _esc(item.foto) + '" onclick="openFotoLightbox(this.src)" style="width:72px;height:72px;border-radius:10px;object-fit:cover;cursor:pointer;border:1px solid rgba(0,0,0,0.06);flex-shrink:0;" alt="Foto">';
                }
                html += '<div style="flex:1;min-width:0;">';
                html += '<p style="font-size:0.9rem;font-weight:700;margin-bottom:4px;">' + _esc(item.nama_pria) + ' & ' + _esc(item.nama_wanita) + '</p>';
                if (item.alamat) {
                    html += '<p style="font-size:0.78rem;color:#64748b;">📍 Alamat: ' + _esc(item.alamat) + '</p>';
                }
                html += '</div></div>';
            });
            html += '</div>';
                container.innerHTML = html;
            })
            .catch(function(err) {
                console.error('loadPondasiData fetch error:', err);
                container.innerHTML = '<div class="text-center text-muted p-3"><p style="font-size:0.85rem;color:#ef4444;">Gagal memuat data.</p></div>';
            });
    } catch(e) { console.error('loadPondasiData error:', e); }
};

// ===== CACHED FETCH (localStorage 1 jam) =====
function cachedFetch(url, ttlMs) {
    if (ttlMs === undefined) ttlMs = 3600000; // 1 jam default
    var cacheKey = 'cf_' + btoa(url);
    try {
        var cached = localStorage.getItem(cacheKey);
        if (cached) {
            var parsed = JSON.parse(cached);
            if (Date.now() - parsed.ts < ttlMs) {
                return Promise.resolve(parsed.data);
            }
        }
    } catch(e) {}
    return fetch(url).then(function(r) {
        if (!r.ok) throw new Error('fetch failed');
        return r.text();
    }).then(function(text) {
        try {
            localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data: text }));
        } catch(e) {}
        return text;
    });
}

// ===== DATA KEAGAMAAN (GOOGLE SHEETS) =====
const KEAGAMAAN_SHEETS = {
    tpq:     '1sgstI0bnvw6OGdqENQON2lhUun5agfWi5PgdT_o6gVI',
    madin:   '1t_ojSS6B-wXKC3uI4MSWhC_HENrwa1HnzTkjbbzQePk',
    wakaf:   '10FMv0vrJluT1t4ZqPMwGo6afpgGXxXTRYcqAjqih-6I'
};
const MASJID_SHEET_ID = '1QCXzjJtm2XuL2JjmIyI288BRpli9pWtJx3EDQ91jWns';
const MASJID_DESA_TABS = [
    { id: 'DS.KEDUNGKEBO', label: 'Kedungkebo' },
    { id: 'DS.Karangdadap', label: 'Karangdadap' },
    { id: 'DS.PANGKAH', label: 'Pangkah' },
    { id: 'DS.JREBENG', label: 'Jrebeng' },
    { id: 'DS.PEGANDON', label: 'Pegandon' },
    { id: 'DS.KEBONROWO PUCANG', label: 'Kebonrowo Pucang' },
    { id: 'DS.KALILEMBU', label: 'Kalilembu' },
    { id: 'DS.LOGANDENG', label: 'Logandeng' },
    { id: 'DS.PAGUMENGANMAS', label: 'Pagumenganmas' },
    { id: 'DS.KEBONSARI', label: 'Kebonsari' },
    { id: 'DS.KALIGAWE', label: 'Kaligawe' }
];
let _keagamaanData = {};
let _masjidCurrentTab = 'DS.KEDUNGKEBO';
const WAKAF_SHEET_ID = '10FMv0vrJluT1t4ZqPMwGo6afpgGXxXTRYcqAjqih-6I';
const WAKAF_KELURAHAN_TABS = [
    { id: 'Kedungkebo', label: 'Kedungkebo' },
    { id: 'Karangdadap', label: 'Karangdadap' },
    { id: 'Pangkah', label: 'Pangkah' },
    { id: 'Jrebengkembang', label: 'Jrebengkembang' },
    { id: 'Pegandon', label: 'Pegandon' },
    { id: 'Kebonrowopucang', label: 'Kebonrowopucang' },
    { id: 'Kalilembu', label: 'Kalilembu' },
    { id: 'Logandeng', label: 'Logandeng' },
    { id: 'Pagumenganmas', label: 'Pagumenganmas' },
    { id: 'Kaligawe', label: 'Kaligawe' }
];
let _wakafCurrentTab = 'Kedungkebo';

window.bukaModalKeagamaanTarget = function(modalId, tipe, contentId, tabsId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        if (tipe === 'masjid') {
            renderMasjidTabs();
            loadMasjidTab('DS.KEDUNGKEBO');
        } else if (tipe === 'wakaf') {
            renderWakafTabs();
            loadWakafTab('Kedungkebo');
        } else {
            loadKeagamaanPublik(tipe, contentId, tabsId);
        }
    }
};

window.tutupModalKeagamaan = function(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
};

function renderMasjidTabs() {
    var container = document.getElementById('masjidDesaTabs');
    if (!container) return;
    var html = '';
    MASJID_DESA_TABS.forEach(function(tab) {
        html += '<button onclick="loadMasjidTab(\'' + tab.id + '\')" class="keagamaan-publik-tab' + (tab.id === _masjidCurrentTab ? ' active' : '') + '" data-tab="' + tab.id + '">' + tab.label + '</button>';
    });
    container.innerHTML = html;
}

window.loadMasjidTab = function(sheetName) {
    _masjidCurrentTab = sheetName;
    document.querySelectorAll('#masjidDesaTabs .keagamaan-publik-tab').forEach(function(btn) {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === sheetName);
    });
    var container = document.getElementById('masjidMusholaPublikContent');
    container.innerHTML = '<div class="text-center text-muted p-4"><div class="spinner-border spinner-border-sm text-success me-2" role="status"></div>Memuat data...</div>';

    var url = 'https://docs.google.com/spreadsheets/d/' + MASJID_SHEET_ID + '/gviz/tq?tqx=out:csv&sheet=' + encodeURIComponent(sheetName);
    cachedFetch(url)
        .then(function(csv) {
            var lines = parseCSVLines(csv);
            if (lines.length < 2) {
                container.innerHTML = '<div class="text-center p-4"><p style="font-size:0.85rem;color:#94a3b8;">Belum ada data.</p></div>';
                return;
            }
            var headers = lines[0].map(function(h) { return h.replace(/"/g, '').trim().toLowerCase(); });
            var rows = [];
            for (var i = 1; i < lines.length; i++) {
                var cols = lines[i];
                var nama = (colVal(cols, headers, 'nama masjid/musholah') || colVal(cols, headers, 'nama masjid/mushola') || colVal(cols, headers, 'nama musholla') || colVal(cols, headers, 'nama mushollah') || '').trim();
                if (!nama) continue;
                rows.push({
                    nama: nama,
                    alamat: (colVal(cols, headers, 'alamat') || '').trim()
                });
            }
            rows.sort(function(a, b) { return a.nama.localeCompare(b.nama); });
            if (rows.length === 0) {
                container.innerHTML = '<div class="text-center p-4"><p style="font-size:0.85rem;color:#94a3b8;">Belum ada data.</p></div>';
                return;
            }
            var html = '<div style="display:flex;flex-direction:column;border-radius:14px;overflow:hidden;border:1px solid rgba(0,0,0,0.04);">';
            rows.forEach(function(item, idx) {
                html += '<div style="padding:14px 16px;background:#fff;' + (idx < rows.length - 1 ? 'border-bottom:1px solid rgba(0,0,0,0.06);' : '') + '">';
                html += '<p style="font-weight:600;font-size:0.88rem;margin-bottom:3px;color:var(--text);">' + _esc(item.nama) + '</p>';
                if (item.alamat) html += '<p style="font-size:0.76rem;color:#64748b;">📍 Alamat: ' + _esc(item.alamat) + '</p>';
                html += '</div>';
            });
            html += '</div>';
            container.innerHTML = html;
        })
        .catch(function() {
            container.innerHTML = '<div class="text-center text-muted p-3"><p style="font-size:0.85rem;color:#ef4444;">Gagal memuat data.</p></div>';
        });
};

window.filterMasjid = function() {
    var query = (document.getElementById('masjidSearchInput').value || '').toLowerCase().trim();
    loadMasjidTab(_masjidCurrentTab);
    if (!query) return;
    setTimeout(function() {
        var container = document.getElementById('masjidMusholaPublikContent');
        var items = container.querySelectorAll('[style*="background:#fff"]');
        items.forEach(function(el) {
            var text = el.textContent.toLowerCase();
            el.style.display = text.includes(query) ? '' : 'none';
        });
    }, 1500);
};

function renderWakafTabs() {
    var container = document.getElementById('wakafKelurahanTabs');
    if (!container) return;
    var html = '';
    WAKAF_KELURAHAN_TABS.forEach(function(tab) {
        html += '<button onclick="loadWakafTab(\'' + tab.id + '\')" class="keagamaan-publik-tab' + (tab.id === _wakafCurrentTab ? ' active' : '') + '" data-tab="' + tab.id + '">' + tab.label + '</button>';
    });
    container.innerHTML = html;
}

window.loadWakafTab = function(kelurahan) {
    _wakafCurrentTab = kelurahan;
    document.querySelectorAll('#wakafKelurahanTabs .keagamaan-publik-tab').forEach(function(btn) {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === kelurahan);
    });
    var container = document.getElementById('wakafPublikContent');
    container.innerHTML = '<div class="text-center text-muted p-4"><div class="spinner-border spinner-border-sm text-success me-2" role="status"></div>Memuat data...</div>';

    var url = 'https://docs.google.com/spreadsheets/d/' + WAKAF_SHEET_ID + '/gviz/tq?tqx=out:csv&sheet=Tanah%20Wakaf';
    cachedFetch(url)
        .then(function(csv) {
            csv = csv.replace(/\r/g, '');
            var lines = parseCSVLines(csv);
            if (lines.length < 2) {
                container.innerHTML = '<div class="text-center p-4"><p style="font-size:0.85rem;color:#94a3b8;">Belum ada data.</p></div>';
                return;
            }
            var headers = lines[0].map(function(h) { return h.replace(/"/g, '').trim().toLowerCase(); });
            var rows = [];
            for (var i = 1; i < lines.length; i++) {
                var cols = lines[i];
                var desa = (colVal(cols, headers, 'kelurahan') || '').trim();
                if (desa.toLowerCase() !== kelurahan.toLowerCase()) continue;
                var luas = (colVal(cols, headers, 'luas') || '').trim();
                var alamat = (colVal(cols, headers, 'alamat/lokasi') || '').trim();
                var aiw = (colVal(cols, headers, 'no aiw') || '').trim();
                var sertifikat = (colVal(cols, headers, 'status tw') || '').trim();
                var nadzir = (colVal(cols, headers, 'nama nadzir') || '').trim();
                if (!alamat && !luas) continue;
                rows.push({ luas: luas, alamat: alamat, desa: desa, aiw: aiw, sertifikat: sertifikat, nadzir: nadzir });
            }
            rows.sort(function(a, b) { return a.alamat.localeCompare(b.alamat); });
            if (rows.length === 0) {
                container.innerHTML = '<div class="text-center p-4"><p style="font-size:0.85rem;color:#94a3b8;">Belum ada data.</p></div>';
                return;
            }
            var html = '<div style="display:flex;flex-direction:column;gap:1px;background:rgba(0,0,0,0.04);border-radius:14px;overflow:hidden;">';
            rows.forEach(function(item) {
                html += '<div style="padding:14px 16px;background:#fff;">';
                if (item.luas) html += '<p style="font-size:0.76rem;color:#64748b;">Luas: ' + _esc(item.luas) + '</p>';
                if (item.alamat) html += '<p style="font-size:0.76rem;color:#64748b;">📍 Alamat: ' + _esc(item.alamat) + '</p>';
                if (item.aiw) html += '<p style="font-size:0.72rem;color:#94a3b8;">AIW: ' + _esc(item.aiw) + '</p>';
                if (item.sertifikat) html += '<p style="font-size:0.72rem;color:#94a3b8;">Status Sertifikat: ' + _esc(item.sertifikat) + '</p>';
                if (item.nadzir) html += '<p style="font-size:0.72rem;color:#94a3b8;">Nadzir: ' + _esc(item.nadzir) + '</p>';
                html += '</div>';
            });
            html += '</div>';
            container.innerHTML = html;
        })
        .catch(function() {
            container.innerHTML = '<div class="text-center text-muted p-3"><p style="font-size:0.85rem;color:#ef4444;">Gagal memuat data.</p></div>';
        });
};

window.loadKeagamaanPublik = function(tipe, contentId, tabsId) {
    var container = document.getElementById(contentId);
    if (!container) return;
    container.innerHTML = '<div class="text-center text-muted p-4"><div class="spinner-border spinner-border-sm text-success me-2" role="status"></div>Memuat data...</div>';

    if (tabsId) {
        document.querySelectorAll('#' + tabsId + ' .keagamaan-publik-tab').forEach(function(btn) {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === tipe);
        });
    }

    var sheetId = KEAGAMAAN_SHEETS[tipe];
    if (!sheetId) {
        container.innerHTML = '<div class="text-center text-muted p-3"><p style="font-size:0.85rem;color:#94a3b8;">Belum ada data.</p></div>';
        return;
    }

    var url = 'https://docs.google.com/spreadsheets/d/' + sheetId + '/gviz/tq?tqx=out:csv';
    cachedFetch(url)
        .then(function(csv) {
            var rows = parseKeagamaanCSV(csv, tipe);
            _keagamaanData[tipe] = rows;
            if (rows.length === 0) {
                container.innerHTML = '<div class="text-center p-4"><p style="font-size:0.85rem;color:#94a3b8;">Belum ada data.</p></div>';
                return;
            }
            renderKeagamaanList(rows, tipe, container);
        })
        .catch(function() {
            container.innerHTML = '<div class="text-center text-muted p-3"><p style="font-size:0.85rem;color:#ef4444;">Gagal memuat data.</p></div>';
        });
};

window.filterKeagamaanSheet = function(tipe) {
    var searchId = { tpq: 'tpqSearchInput', madin: 'madinSearchInput' };
    var contentId = { tpq: 'tpqPublikContent', madin: 'madinPublikContent' };
    var query = (document.getElementById(searchId[tipe]).value || '').toLowerCase().trim();
    var data = _keagamaanData[tipe] || [];
    if (!query) {
        renderKeagamaanList(data, tipe, document.getElementById(contentId[tipe]));
        return;
    }
    var filtered = data.filter(function(item) {
        var text = Object.values(item).join(' ').toLowerCase();
        return text.includes(query);
    });
    renderKeagamaanList(filtered, tipe, document.getElementById(contentId[tipe]));
};

function parseCSVLines(csv) {
    csv = csv.replace(/\r\n?/g, '\n');
    var result = [];
    var row = [];
    var field = '';
    var inQuotes = false;
    for (var i = 0; i < csv.length; i++) {
        var ch = csv[i];
        var next = csv[i + 1];
        if (inQuotes) {
            if (ch === '"' && next === '"') { field += '"'; i++; }
            else if (ch === '"') { inQuotes = false; }
            else { field += ch; }
        } else {
            if (ch === '"') { inQuotes = true; }
            else if (ch === ',') { row.push(field); field = ''; }
            else if (ch === '\n') {
                row.push(field); field = '';
                result.push(row); row = [];
            }
            else { field += ch; }
        }
    }
    if (field || row.length) { row.push(field); result.push(row); }
    return result;
}

function parseKeagamaanCSV(csv, tipe) {
    var lines = parseCSVLines(csv);
    if (lines.length < 2) return [];
    var headers = lines[0].map(function(h) { return h.replace(/"/g, '').trim().toLowerCase(); });

    var rows = [];
    for (var i = 1; i < lines.length; i++) {
        var cols = lines[i];
        if (cols.length < 2) continue;

        var item = {};
        if (tipe === 'masjid') {
            item.nama = colVal(cols, headers, 'nama masjid/musholah') || colVal(cols, headers, 'nama masjid/mushola') || colVal(cols, headers, 'nama musholla') || colVal(cols, headers, 'nama');
            item.alamat = colVal(cols, headers, 'alamat') || '';
            if (!item.nama) continue;
            rows.push(item);
        } else if (tipe === 'tpq') {
            item.nama = colVal(cols, headers, 'nama lembaga') || '';
            item.statistik = colVal(cols, headers, 'nomor statistik') || '';
            item.alamat = colVal(cols, headers, 'alamat') || '';
            item.desa = colVal(cols, headers, 'desa/kelurahan') || '';
            if (!item.nama) continue;
            rows.push(item);
        } else if (tipe === 'madin') {
            item.nama = colVal(cols, headers, 'nama lembaga') || '';
            item.jenjang = colVal(cols, headers, 'jenjang') || '';
            item.statistik = colVal(cols, headers, 'nomor statistik') || '';
            item.alamat = colVal(cols, headers, 'alamat') || '';
            item.desa = colVal(cols, headers, 'desa/kelurahan') || '';
            if (!item.nama) continue;
            rows.push(item);
        } else if (tipe === 'wakaf') {
            item.desa = colVal(cols, headers, 'kelurahan') || '';
            item.luas = colVal(cols, headers, 'luas') || '';
            item.alamat = colVal(cols, headers, 'alamat/lokasi') || '';
            item.aiw = colVal(cols, headers, 'no aiw') || '';
            item.sertifikat = colVal(cols, headers, 'no sertifikat') || '';
            item.nadzir = colVal(cols, headers, 'nama nadzir') || '';
            if (!item.desa && !item.alamat) continue;
            rows.push(item);
        }
    }
    return rows;
}

function colVal(cols, headers, name) {
    var idx = headers.indexOf(name);
    if (idx < 0) {
        idx = headers.findIndex(function(h) { return h.replace(/\s+/g, ' ').trim() === name.replace(/\s+/g, ' ').trim(); });
    }
    if (idx < 0) return '';
    return (cols[idx] || '').replace(/"/g, '').trim();
}

function renderKeagamaanList(rows, tipe, container) {
    var html = '<div style="display:flex;flex-direction:column;border-radius:14px;overflow:hidden;border:1px solid rgba(0,0,0,0.04);">';
    rows.forEach(function(item, idx) {
        html += '<div style="padding:14px 16px;background:#fff;' + (idx < rows.length - 1 ? 'border-bottom:1px solid rgba(0,0,0,0.06);' : '') + '">';
        html += '<p style="font-weight:600;font-size:0.88rem;margin-bottom:4px;color:var(--text);">' + _esc(item.nama || item.desa) + '</p>';

        if (tipe === 'masjid') {
            if (item.alamat) html += '<p style="font-size:0.76rem;color:#64748b;">📍 Alamat: ' + _esc(item.alamat) + '</p>';
        } else if (tipe === 'tpq') {
            if (item.statistik) html += '<p style="font-size:0.76rem;color:#94a3b8;">No. Statistik: ' + _esc(item.statistik) + '</p>';
            if (item.alamat) html += '<p style="font-size:0.76rem;color:#64748b;">📍 Alamat: ' + _esc(item.alamat) + '</p>';
        } else if (tipe === 'madin') {
            if (item.jenjang) html += '<p style="font-size:0.76rem;color:#94a3b8;">Jenjang: ' + _esc(item.jenjang) + '</p>';
            if (item.statistik) html += '<p style="font-size:0.76rem;color:#94a3b8;">No. Statistik: ' + _esc(item.statistik) + '</p>';
            if (item.desa) html += '<p style="font-size:0.76rem;color:#94a3b8;">📍 Desa: ' + _esc(item.desa) + '</p>';
            if (item.alamat) html += '<p style="font-size:0.76rem;color:#64748b;">📍 Alamat: ' + _esc(item.alamat) + '</p>';
        }

        html += '</div>';
    });
    html += '</div>';
    container.innerHTML = html;
}


// ════════════════════════════════
// DATA PERNIKAHAN (GOOGLE SHEETS)
// ════════════════════════════════
const NIKAH_SHEET_ID = '1FBSExmCnLfXzgZKAoeSt3BClZwIepMm3lb-liqRa6-g';
const NIKAH_YEARS = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
let _nikahAllData = [];
let _nikahCurrentYear = 2024;

window.bukaModalNikah = function() {
    document.getElementById('nikahModal').classList.add('show');
    document.body.style.overflow = 'hidden';
    renderNikahTabs();
    loadNikahYear(2024);
};

window.tutupModalNikah = function() {
    document.getElementById('nikahModal').classList.remove('show');
    document.body.style.overflow = '';
    _nikahAllData = [];
    document.getElementById('nikahSearchInput').value = '';
};

function renderNikahTabs() {
    const container = document.getElementById('nikahTabs');
    let html = '';
    NIKAH_YEARS.slice().reverse().forEach(year => {
        html += '<button onclick="loadNikahYear(' + year + ')" id="nTab' + year + '" class="nikah-tab">' + year + '</button>';
    });
    container.innerHTML = html;
}

function loadNikahYear(year) {
    _nikahCurrentYear = year;
    _nikahAllData = [];
    document.querySelectorAll('.nikah-tab').forEach(t => t.classList.toggle('active', t.id === 'nTab' + year));
    document.getElementById('nikahSearchInput').value = '';

    var container = document.getElementById('nikahPublikContent');
    container.innerHTML = '<div class="text-center text-muted p-4"><div class="spinner-border spinner-border-sm text-success me-2" role="status"></div>Memuat data tahun ' + year + '...</div>';

    var sheetName = year === 2008 ? '2008' : String(year);
    var url = 'https://docs.google.com/spreadsheets/d/' + NIKAH_SHEET_ID + '/gviz/tq?tqx=out:csv&sheet=' + encodeURIComponent(sheetName);

    cachedFetch(url)
        .then(function(csv) {
            var rows = parseNikahCSV(csv);
            if (rows.length === 0) {
                container.innerHTML = '<div class="text-center p-4"><p style="font-size:0.85rem;color:#94a3b8;">Belum ada data untuk tahun ' + year + '.</p></div>';
                return;
            }
            _nikahAllData = rows;
            renderNikahList(rows, container);
        })
        .catch(function() {
            container.innerHTML = '<div class="text-center p-4"><p style="font-size:0.85rem;color:#94a3b8;">Belum ada data untuk tahun ' + year + '.</p></div>';
        });
}

function parseNikahCSV(csv) {
    var lines = parseCSVLines(csv);
    if (lines.length < 2) return [];
    var headers = lines[0].map(function(h) { return h.replace(/"/g, '').trim().toLowerCase(); });

    var idxNo = -1, idxSuami = -1, idxIstri = -1, idxTempat = -1, idxTanggal = -1, idxRegister = -1;
    headers.forEach(function(h, i) {
        if (h === 'no' || h === 'no.') idxNo = i;
        if (h.includes('nama suami') || h === 'nama suami') idxSuami = i;
        if (h.includes('nama istri') || h === 'nama istri') idxIstri = i;
        if (h === 'desa' || h === 'tempat nikah' || h.includes('tempat')) idxTempat = i;
        if (h.includes('tanggal')) idxTanggal = i;
        if (h.includes('register') || h.includes('no register')) idxRegister = i;
    });

    var rows = [];
    for (var i = 1; i < lines.length; i++) {
        var cols = lines[i];
        if (cols.length < 3) continue;
        var suami = (idxSuami >= 0 && cols[idxSuami]) ? cols[idxSuami].trim() : '';
        var istri = (idxIstri >= 0 && cols[idxIstri]) ? cols[idxIstri].trim() : '';
        if (!suami && !istri) continue;

        var tanggal = (idxTanggal >= 0 && cols[idxTanggal]) ? cols[idxTanggal].trim() : '';
        var tanggalParsed = parseNikahDate(tanggal);

        rows.push({
            suami: suami,
            istri: istri,
            tempat: (idxTempat >= 0 && cols[idxTempat]) ? cols[idxTempat].trim() : '',
            tanggal: tanggal,
            tanggalParsed: tanggalParsed,
            register: (idxRegister >= 0 && cols[idxRegister]) ? cols[idxRegister].trim() : ''
        });
    }
    rows.sort(function(a, b) { return b.tanggalParsed - a.tanggalParsed; });
    return rows;
}

function parseNikahDate(str) {
    if (!str) return 0;
    var d = new Date(str);
    if (!isNaN(d.getTime())) return d.getTime();
    var parts = str.split(/[-/\.]/);
    if (parts.length === 3) {
        var dd = parseInt(parts[0]), mm = parseInt(parts[1]), yyyy = parseInt(parts[2]);
        if (yyyy < 100) yyyy += 2000;
        var d2 = new Date(yyyy, mm - 1, dd);
        if (!isNaN(d2.getTime())) return d2.getTime();
    }
    return 0;
}

function renderNikahList(rows, container) {
    var html = '<div style="display:flex;flex-direction:column;gap:1px;background:rgba(0,0,0,0.04);border-radius:14px;overflow:hidden;">';
    rows.forEach(function(item) {
        html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:#fff;">';
        html += '<div style="flex:1;min-width:0;">';
        html += '<p style="font-weight:600;font-size:0.88rem;margin-bottom:2px;color:var(--text);">' + _esc(item.suami) + ' & ' + _esc(item.istri) + '</p>';
        if (item.tanggal) {
            html += '<p style="font-size:0.76rem;color:#94a3b8;">📅 Tanggal: ' + _esc(item.tanggal) + '</p>';
        }
        if (item.register) {
            html += '<p style="font-size:0.72rem;color:#94a3b8;">📋 Register: ' + _esc(item.register) + '</p>';
        }
        html += '</div></div>';
    });
    html += '</div>';
    container.innerHTML = html;
}

window.filterNikahData = function() {
    var query = (document.getElementById('nikahSearchInput').value || '').toLowerCase().trim();
    if (!query) {
        renderNikahList(_nikahAllData, document.getElementById('nikahPublikContent'));
        return;
    }
    var filtered = _nikahAllData.filter(function(item) {
        return item.suami.toLowerCase().includes(query) || item.istri.toLowerCase().includes(query);
    });
    renderNikahList(filtered, document.getElementById('nikahPublikContent'));
};


