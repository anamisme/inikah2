# Stitch AI Prompts — iNikah KUA Karangdadap

> **Cara pakai:** Buka stitch.withgoogle.com → Login Google → Paste prompt per screen → Refine → Export HTML/Figma

---

## 🎨 DESIGN SYSTEM (paste dulu sekali)

```
Design system for an Islamic marriage services mobile app called "iNikah KUA Karangdadap":

Colors:
- Primary green: #0D6E37 (deep Kemenag green)
- Secondary green: #10B981 (emerald, for gradients and accents)
- Gold accent: #D4A843
- Rose accent: #E8A0BF
- Background: #F0F4F3 (soft warm grey)
- Card white: #FFFFFF with slight warm tint
- Dark mode background: #0E1F18
- Dark mode card: #1A2E26
- Text primary: #1F2937
- Text secondary: #6B7280

Typography:
- Font: Plus Jakarta Sans (headings 700 weight, body 400, buttons 600)
- Logo: Rubik Dirt (handwritten Arabic style)

Style tokens:
- Card border-radius: 24px
- Button border-radius: 16px (pill buttons 50px)
- Glassmorphism: white 75% opacity, blur(20px), 1px border white 20% opacity
- Shadows: iOS-style soft depth (0 8px 32px rgba(0,0,0,0.08))
- Section gap: 16px
- Card padding: 20px
```

---

## SCREEN 1: Splash Screen

```
Mobile splash screen for Islamic marriage app:

Center layout, vertical stack:
- Large circular logo: green gradient circle with white mosque dome and minaret silhouette
- App name "iNikah" below logo in bold serif/handwritten style, white text
- Subtitle "KUA Kec. Karangdadap" in smaller white text below
- Loading indicator at bottom: subtle green dots pulse animation
- Full background: deep green gradient from top (#0D6E37) to bottom (#0A5A2F)
- Subtle pattern overlay: Islamic geometric pattern at 5% opacity

Clean, minimal, professional feel. Islamic government app aesthetic.
```

---

## SCREEN 2: Dashboard (Main Screen)

```
Mobile dashboard for Islamic marriage services app "iNikah KUA Karangdadap":

HEADER:
- Top bar: white background, left-aligned "iNikah" logo text with mosque icon, right side gear/settings icon
- Below header: greeting section "Assalamu'alaikum, Petugas 👋" with small avatar circle (green bg, white person icon)
- Green gradient background behind header area

MAIN CONTENT (scrollable, light grey background):
- Search bar: rounded pill shape, grey placeholder "Cari menu...", search icon left

- Section "Menu Utama": 2-column grid of 6 cards
  Each card: white, border-radius 24px, iOS soft shadow, contains:
  1. Green circle icon (3D style) + "Cetak Sertifikat" label
  2. Orange circle icon + "Input Jadwal Akad" label  
  3. Purple circle icon + "Input Petugas" label
  4. Teal circle icon + "Data Keagamaan" label
  5. Pink circle icon + "Data Pernikahan" label
  6. Red circle icon + "Pondasi Sakinah" label
  Icons: colorful 3D glassmorphism style circles with white symbols inside

- Section "Menu Publik": same 2-column grid layout, 6 cards:
  1. Blue card + "Jadwal Nikah" (calendar icon)
  2. Green card + "Data Keagamaan" (mosque icon)
  3. Purple card + "Data Pernikahan" (heart icon)
  4. Teal card + "Cek Pondasi Sakinah" (book icon)
  5. Orange card + "Cek Sertifikat" (certificate icon)
  6. Grey card + "Konsultasi Online" (chat icon)
  Public menu cards have colored background tints matching their theme

BOTTOM NAVBAR:
- Fixed bottom, frosted glass style (white 75% opacity, blur)
- 3 tabs: Home (active, green), Cetak (center, large green circle button with printer icon), Menu (hamburger icon)
- Active tab: green icon + green dot indicator below

Overall: iOS-style glassmorphism, green Kemenag theme, clean modern government app feel.
```

---

## SCREEN 3: Jadwal Nikah (Public Schedule)

```
Public wedding schedule screen for Islamic app:

HEADER:
- White background, back arrow left, title "Jadwal Nikah" centered
- Subtitle: "KUA Kec. Karangdadap"

TAB BAR:
- Horizontal pill tabs below header
- Green active tab with white text "Semua", grey inactive tabs: "Desember 2025", "Januari 2026", etc.
- Active tab: solid green (#0D6E37) background, border-radius 50px, white text

CONTENT:
- List of schedule cards, each card:
  - White background, border-radius 16px, soft shadow
  - Left side: date block (green bg, white text showing day/date)
  - Right side: couple names "Ahmad & Fatimah" in bold
  - Below names: time "08:00 WIB" and location "Masjid Al-Ikhlas"
  - Subtle green left border accent (4px)
  - Bottom: small register number text

Empty state: centered mosque illustration with "Belum ada jadwal" text

Scrollable list, clean spacing between cards.
```

---

## SCREEN 4: Login Petugas

```
Staff login screen for Islamic marriage app:

CENTERED CARD layout on light green gradient background:

- Top: small mosque logo icon (green circle)
- Title: "Login Petugas" in bold dark text
- Subtitle: "Masukkan kredensial Anda"

FORM FIELDS:
- Username field: rounded rectangle, light grey bg, person icon left, placeholder "Username"
- Password field: same style, lock icon left, placeholder "Password", eye toggle right
- Both fields: border-radius 12px, subtle border

BUTTONS:
- "Masuk" button: full-width, green gradient (#0D6E37 to #10B981), white bold text, border-radius 12px
- "Lupa Password?" text link below in green

BOTTOM:
- "Kembali ke Beranda" text link, grey text

Clean, minimal, government app login style. No decorative elements, focused on function.
```

---

## SCREEN 5: Modal Input Jadwal Akad (Form)

```
Modal/overlay form for inputting wedding schedule:

Full-screen overlay with white background sliding up from bottom:

HEADER:
- Left: X close button
- Center: "Input Jadwal Nikah" title
- Right: empty

FORM (vertical stack, 16px gap):
- "Tanggal Nikah *" label + date picker field (calendar icon, rounded)
- "Jam Akad *" label + time picker field (clock icon)
- "Nama Suami *" label + text input
- "Nama Istri *" label + text input
- "No. Register *" label + text input (auto-generated format)
- "Lokasi *" label + text input with location icon
- "Nama KUA *" label + text input
- "Nama Petugas *" dropdown select

BOTTOM:
- "Simpan" button: full-width, green gradient, white text, border-radius 12px
- "Batal" text link below

Form fields: light grey background, border-radius 12px, 14px font, clean spacing
Modal style: iOS bottom sheet aesthetic, smooth corners at top
```

---

## SCREEN 6: Data Keagamaan (Public)

```
Religious data screen with 4 category tabs:

HEADER:
- White bar, back arrow, title "Data Keagamaan"

SUBMENU TABS:
- 4 rounded pill buttons in horizontal row:
  "Masjid & Mushola" (active, green bg), "TPQ", "Madin", "Tanah Wakaf"
  Active: solid green #0D6E37, border-radius 50px
  Inactive: light grey bg, dark text

CONTENT AREA (Masjid & Mushola selected):
- Sub-tabs: horizontal scrollable pills for each desa/village
  Active desa: green pill, white text
  Inactive: grey outline pill
  Villages: "Semua", "Karangdadap", "Kedungkebo", "Pangkah", etc.

- List of mosque cards:
  Each card: white bg, border-radius 16px, shadow
  - Mosque name in bold
  - Address below in grey text
  - Left green accent border
  - Map pin icon

Empty state: "Belum ada data" with mosque illustration

Clean list layout, easy to scan, government data presentation style.
```

---

## SCREEN 7: Data Pernikahan (Public)

```
Marriage data search screen:

HEADER:
- White bar, back arrow, title "Data Pernikahan"

SEARCH SECTION:
- Search input: rounded pill, placeholder "Cari nama mempelai..."
- Filter chips below: year pills "Semua", "2024", "2023", "2022"...
  Active year: solid green pill
  Inactive: outline grey pill

CONTENT:
- Results list, each card:
  - White bg, border-radius 16px, shadow
  - Couple names bold: "Ahmad & Fatimah"
  - Date: "15 Desember 2024" with calendar icon
  - Register number: "REG-2024/12/001"
  - Left green accent border (4px)

SORT INDICATOR:
- Small text: "Diurutkan berdasarkan tanggal terbaru" with sort icon

Clean data table feel, easy scanning. No unnecessary elements.
```

---

## SCREEN 8: Cek Sertifikat (Public Certificate)

```
Public certificate verification screen:

HEADER:
- White bar, back arrow, title "Cek Sertifikat"

SEARCH:
- Rounded search input: "Masukkan nomor register..."

RESULTS:
- Certificate card: white bg, border-radius 16px, shadow
  - Green header strip at top
  - Certificate number in bold
  - Couple names
  - Date and location
  - "Preview" button (green outline, small)
  - "Download" button (solid green, small)

STATUS BADGES:
- "Terverifikasi" green badge or "Belum diverifikasi" yellow badge

Empty state: certificate icon illustration + "Sertifikat tidak ditemukan"

Professional, trustworthy feel — like a government document portal.
```

---

## SCREEN 9: Pondasi Sakinah (Public)

```
Islamic marriage consultation (Pondasi Sakinah) screen:

HEADER:
- White bar, back arrow, title "Pondasi Sakinah"
- Subtitle: "Mari wujudkan rumah tangga sakinah"

CONTENT:
- Hero section: soft green gradient bg, Islamic pattern overlay
  - Book/heart icon
  - "Konsultasi Pernikahan" heading
  - Subtitle text about marriage guidance

- Section "Daftar Konsultasi":
  - List of consultation cards:
    - Photo thumbnail (72x72, rounded, left side)
    - Right side: couple names bold, address in grey
    - Green accent border left
  - Click thumbnail: fullscreen lightbox with large photo

- "Ajukan Konsultasi" floating action button (bottom right, green circle, + icon)

Warm, supportive feel — not bureaucratic. Encouraging couples to seek guidance.
```

---

## SCREEN 10: Petugas Panel (Staff Dashboard)

```
Staff management panel — admin-style dashboard:

HEADER:
- Green gradient background (same as main dashboard)
- Title "Panel Petugas" with shield/lock icon
- Staff name and role badge

CONTENT (scrollable, white cards):

CARD 1: "Form Input Jadwal"
- Compact form with date, time, groom name, bride name fields
- "Simpan" green button

CARD 2: "Form Input Petugas"  
- Fields: name, position, phone, address, photo upload area
- "Simpan" green button

CARD 3: "Form Pondasi Sakinah"
- Fields: groom name, bride name, address, photo upload
- "Simpan" green button

SECTION: "Daftar" with accordion tabs:
- "Jadwal Nikah ▾" — expandable list of schedules with delete buttons
- "Petugas Akad ▾" — expandable list of staff with photos and delete
- "Pondasi Sakinah ▾" — expandable list with thumbnails

Each list item: white card, name/info, red delete (trash) icon

Functional, data-focused admin UI. Green accent throughout.
```

---

## SCREEN 11: Konsultasi Online (Chat Style)

```
Online consultation chat interface:

HEADER:
- White bar, back arrow, title "Konsultasi Online"
- Subtitle: "Konsultasi dengan Ust. Subakat, S.Ag"

CHAT AREA:
- Date header: "Hari Ini" centered grey text

- Message bubbles:
  - Incoming (left): light grey bg, dark text, rounded corners (top-left square)
  - Outgoing (right): green bg (#0D6E37), white text, rounded corners (top-right square)
  
- Messages:
  "Assalamu'alaikum Ust, saya ingin bertanya tentang..."
  "Wa'alaikumussalam, silakan bertanya"
  "Boleh saya tahu langkah-langkah pendaftaran nikah?"
  "Tentu, berikut prosedurnya..."

INPUT BAR (bottom, fixed):
- Text input field: rounded pill, "Ketik pesan..."
- Send button: green circle with white arrow icon
- Attachment button (paperclip icon) left of input

Clean WhatsApp-style chat interface. Green theme consistent.
```

---

## SCREEN 12: Modal Daftar Sertifikat (Certificate List)

```
Public certificate list modal — overlay style:

HEADER:
- Back arrow + title "Daftar Sertifikat Pernikahan"
- Filter row: month dropdown + year dropdown (both rounded pill style)

CONTENT:
- List of certificate cards:
  - White bg, border-radius 16px
  - Certificate number bold
  - Couple names
  - Date formatted nicely
  - Left green accent border
  - Tap to preview

STATS BAR (top):
- Small text showing count: "Menampilkan 25 dari 150 sertifikat"
- Sort icon button

Empty state: document icon + "Belum ada sertifikat"

Professional certificate registry feel.
```

---

## 🚀 WORKFLOW

1. **Start** → Paste DESIGN SYSTEM prompt first
2. **Screen 1** (Splash) → Generate → Refine
3. **Screen 2** (Dashboard) → Generate → Refine
4. **Screen 3** (Jadwal) → Generate → Refine
5. Continue screen by screen...
6. **Export** each screen as HTML or Figma
7. Refine in visual editor (no credit cost)
8. Export final code → give to developer for implementation
