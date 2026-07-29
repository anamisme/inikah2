# Stitch AI Design Prompt — iNikah KUA Karangdadap

## App Overview

**iNikah** is a mobile-first Islamic marriage services web application for **KUA Karangdadap** (Kantor Urusan Agama — Religious Affairs Office) in Pekalongan Regency, Central Java, Indonesia. It serves as a digital companion for couples (calon pengantin/catin) preparing for marriage, offering self-guided marriage counseling (Bimwin), scheduling, document management, and religious community data access.

**Design Language:** iOS-inspired, premium glassmorphism, Apple-style accordion cards with 3D depth effects.

---

## Brand Identity

- **App Name:** iNikah (lowercase "i", uppercase "N")
- **Logo Treatment:** Wordmark style — "i" in gold italic serif, "Nikah" in dark bold serif
- **Font Family (Logo/Titles):** Playfair Display (serif)
- **Font Family (Body):** SF Pro Text / system-ui / -apple-system / Helvetica Neue
- **Institution:** KUA Karangdadap, Kabupaten Pekalongan
- **Tagline vibe:** Modern Islamic institution, approachable, trustworthy, premium

---

## Color Palette

### Primary — Kemenag Green
| Token | Hex | Usage |
|---|---|---|
| `--green-deep` | `#064e3b` | Navbar background, dark accents, button gradients |
| `--green-mid` | `#0f766e` | Primary interactive elements, active states |
| `--green-light` | `#14b8a6` | Light accents, hover states |
| `--green-tint` | `rgba(15,118,110,0.06)` | Subtle backgrounds, card tint |

### Accent — Gold
| Token | Hex | Usage |
|---|---|---|
| `--gold` | `#b45309` | "i" in logo, premium accents |
| `--gold-light` | `#f59e0b` | Gold icon backgrounds |
| `--gold-tint` | `rgba(180,83,9,0.08)` | Document/help section accents |

### Accent — Rose (Marriage)
| Token | Hex | Usage |
|---|---|---|
| Rose primary | `#e11d48` | Data Pernikahan icon, active nikah tabs |
| Rose gradient | `#f43f5e → #e11d48` | Nikah card icon 3D effect |

### Neutrals
| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#f2f5f3` | Page background (light mint-gray) |
| `--text` | `#0f172a` | Primary text |
| `--muted` | `#64748b` | Secondary text |
| `--border` | `rgba(15,118,110,0.08)` | Subtle borders |

### Dark Mode
| Token | Hex | Usage |
|---|---|---|
| Dark BG | `#0f1117` | Page background |
| Dark surface | `#1a1c2e` | Card/modal backgrounds |
| Dark border | `rgba(255,255,255,0.06)` | Borders |
| Dark text | `#f1f5f9` | Primary text |

---

## Typography Scale

| Element | Size | Weight | Font |
|---|---|---|---|
| Logo (splash) | 4rem | 700 | Playfair Display |
| Logo (navbar) | 1.4rem | 700 | Playfair Display |
| Card title | 1.05rem | 700 | System |
| Card description | 0.8rem | 400 | System |
| Submenu title | 0.9rem | 600 | System |
| Submenu description | 0.75rem | 400 | System |
| Modal title | 1.15rem | 700 | Playfair Display |
| Body text | 0.85rem | 400 | System |
| Badge text | 0.65-0.85rem | 800 | System |
| Footer | 0.75rem | 600 | System |

---

## Layout & Spacing

- **Max content width:** 37.5rem (600px)
- **Card padding:** 20px
- **Card margin-bottom:** 28px
- **Card border-radius:** 28px
- **Content horizontal padding:** 16px
- **Page top padding:** 160px (space for sticky navbar)
- **Page bottom padding:** 40px

---

## Component Library

### 1. Sticky Navbar (Header Kemenag)
- **Position:** Fixed top, 1rem inset
- **Background:** `rgba(0, 102, 64, 0.85)` with `backdrop-filter: blur(24px) saturate(180%)`
- **Border:** `1px solid rgba(255,255,255,0.15)`
- **Border-radius:** 18px
- **Box-shadow:** `0 4px 16px rgba(0,102,64,0.3), inset 0 1px 1px rgba(255,255,255,0.2)`
- **Layout:** Notification bell (left) | Logo wordmark center | Theme toggle (right)
- **Logo:** Playfair Display, "i" italic gold (#f59e0b), "Nikah" white bold
- **Subtitle:** "KUA Karangdadap", 0.5rem, uppercase letter-spacing 1.5px, white 75% opacity

### 2. Main Menu Cards (iOS-style 3D)
- **Background:** White with gradient tint, transparent border with gradient border effect
- **Border:** `1.5px solid transparent` with gradient border-box trick
- **Border-radius:** 28px
- **3D Shadow:** `0 8px 0 rgba(15,118,110,0.12), 0 16px 24px rgba(6,78,59,0.08), inset 0 2px 4px rgba(255,255,255,1)`
- **Hover:** Stronger border gradient
- **Active:** Pressed 3D effect (shadow reduces)
- **Content:** Icon (50×50 3D gradient) + Title + Description | Chevron

### 3. Card Icons (3D Glassmorphism)
- **Size:** 50×50px, border-radius 16px
- **Effect:** Gradient background + inset highlights/shadows for 3D depth
- **Top border:** `1px solid rgba(255,255,255,0.5)` (light reflection)
- **Bottom border:** `1px solid rgba(0,0,0,0.15)` (shadow edge)
- **Shadow:** `0 12px 20px -6px [color], inset 0 4px 6px rgba(255,255,255,0.3-0.4), inset 0 -4px 6px rgba(0,0,0,0.2-0.3)`
- **Color variants:**
  - Cating (marriage prep): Deep green gradient `#064e3b → #022c22`
  - Jadwal (scheduling): Teal gradient `#14b8a6 → #0f766e`
  - Keagamaan (religious data): Gold gradient `#fbbf24 → #f59e0b`
  - Nikah (marriage data): Rose gradient `#f43f5e → #e11d48`
  - Bantuan (help): Gold gradient `#f59e0b → #b45309`

### 4. Accordion Submenus
- **State:** Hidden by default (`display: none`), toggled with `.active` class
- **Animation:** Slide open with `opacity` transition
- **Separator:** `border-top: 1px solid var(--border)` + `padding-top: 12px`
- **Items:** `padding: 12px`, border-radius 16px, hover green tint

### 5. Submenu List Items
- **Layout:** Badge icon (left) + Title/Description (center) + Chevron (right)
- **Badge size:** 32×32px, border-radius 10px
- **Badge variants:**
  - Numbered: badge-1 (deep green), badge-2 (mid green), badge-3 (light green), badge-4 (gold)
  - Icon: badge-icon (green tint), badge-icon-gold (gold tint)
- **Hover:** `background: var(--green-tint)`

### 6. Pill Tabs (Keagamaan & Nikah)
- **Shape:** Full pill `border-radius: 50px`
- **Padding:** 10px 24px
- **Inactive:** Light tint background, accent text color
- **Active:** Gradient solid background + white text + colored box-shadow
- **Green variant:** `background: rgba(15,118,110,0.08)`, active `#0f766e → #065f46`
- **Rose variant:** `background: rgba(244,63,94,0.08)`, active `#e11d48 → #be123c`

### 7. Floating Modals (Overlay)
- **Overlay:** `rgba(15,23,42,0.35)` with `backdrop-filter: blur(16px)`
- **Modal card:** White, max-width 53.125rem, border-radius 28px
- **Default height:** 82vh (or auto + max-height 85vh for scrollable content)
- **Box-shadow:** `0 30px 70px rgba(6,78,59,0.18)`
- **Close button:** 36×36 circle, top-right absolute, hover turns red
- **Title:** Playfair Display font, bottom-bordered
- **Animation:** Opacity fade in/out via `.show` class

### 8. Banner Carousel
- **Aspect ratio:** 16:7
- **Border-radius:** 18px
- **Content:** Gradient overlay (top-to-bottom dark), tag + title
- **Dots:** 6×6 circles, active = 18px wide pill in green

### 9. Digital Bookshelf (Apple Books style)
- **Grid:** 3 columns (2 on small screens)
- **Book covers:** Aspect ratio 3:4, border-radius `4px 12px 12px 4px` (book spine effect)
- **Left border:** `4px solid rgba(0,0,0,0.25)` (spine highlight)
- **Shadow:** `0 8px 16px rgba(6,78,59,0.15), inset -4px 0 6px rgba(0,0,0,0.15)`
- **10 covers:** Each with unique gradient (green → blue → purple → rose → gold → slate)

### 10. Document List (Blangko)
- **Container:** Green tint background, border-radius 20px
- **Items:** Flex row, badge (N-1 to N-6) + title + download icon
- **Badge:** 38×24px pill, green gradient, white text

### 11. Search Input
- **Style:** Rounded `border-radius: 16px`, `padding: 16px 20px`
- **Border:** `1.5px solid var(--border)`
- **Focus:** Green border + `box-shadow: 0 0 0 4px rgba(15,118,110,0.12)`

### 12. Premium Button
- **Full width**, `border-radius: 16px`
- **Background:** Green gradient deep→mid
- **Layout:** Icon left | Text center-left | Chevron right
- **Shadow:** `0 10px 25px rgba(6,78,59,0.2)`

### 13. Footer
- **Text:** Centered, 0.75rem, muted color
- **Gold separator line:** 40×2px, `opacity: 0.3`
- **Links:** Green colored, hover opacity 0.7

### 14. Theme Toggle
- **Size:** 24×24px circle
- **Background:** Semi-transparent white
- **Icon:** Material Icons Outlined (dark_mode/light_mode)

### 15. Notification Bell
- **Size:** 24×24px circle
- **Badge:** Red circle, positioned top-right, white text, `box-shadow: 0 2px 4px rgba(239,68,68,0.4)`

### 16. Splash Screen
- **Full screen overlay**, same bg as page
- **Logo:** 4rem Playfair Display
- **Sub:** "KUA KARANGDADAP", uppercase, letter-spacing 3px
- **Hearts effect:** Red Material Icons floating up

---

## Screens & Features

### Screen 1: Splash Screen
- iNikah logo centered
- "KUA KARANGDADAP" subtitle
- Floating red heart icons animation
- Fades out after 2.6 seconds

### Screen 2: Home Dashboard
- **Sticky navbar** with notification bell, logo, theme toggle
- **Banner carousel** (optional, data-driven)
- **4 main menu cards:**
  1. **Tahapan Mandiri Catin** (Marriage Prep Steps) — accordion with 4 sub-items + digital bookshelf
  2. **Layanan Penjadwalan KUA** (Scheduling Services) — accordion with 3 sub-items
  3. **Data Keagamaan** (Religious Data) — accordion with 4 sub-items
  4. **Data Pernikahan** (Marriage Data) — single click, opens modal
  5. **Informasi & Bantuan KUA** (Info & Help) — accordion with 2 sub-items
- **Footer:** KUA name + Kabupaten link + Privacy/Terms links

### Screen 3: Tahapan Mandiri Catin (Accordion Open)
Sub-items with numbered badges (1-4):
1. **Pre-Test** → navigates to pretest.html
2. **Perpustakaan Digital** → expandable bookshelf grid (10 Bimwin chapters as book covers)
3. **Post-Test** → navigates to posttest.html
4. **Klaim E-Sertifikat** → opens search modal

### Screen 4: Layanan Penjadwalan KUA (Accordion Open)
Sub-items with icon badges:
1. **Cek Jadwal Akad Nikah** → modal with jadwal list
2. **Cek Petugas Penghulu** → modal with petugas list + photos
3. **Cek Pondasi Sakinah** → modal with catin photos + names

### Screen 5: Data Keagamaan (Accordion Open)
Sub-items:
1. **Masjid & Mushola** → modal with desa tab navigation (11 tabs), list per desa
2. **Data Tanah Wakaf** → modal with kelurahan tabs (10 tabs), data per kelurahan
3. **Data TPQ** → modal with search input + list
4. **Data Madin** → modal with search input + list

### Screen 6: Data Pernikahan (Modal)
- Search input by name
- Year tabs (2008-2024)
- List: nama suami & istri + tanggal + register number

### Screen 7: Cek E-Sertifikat (Modal)
- Search input
- Premium search button
- Results with claim/download links

### Screen 8: Unduh Blangko (Modal)
- List of 6 document templates (N-1 to N-6)
- Each with green badge + title + download icon

### Screen 9: Notifikasi (Modal)
- List of notification items
- Unread indicator (green left border + tinted background)

### Screen 10: Petugas Panel (petugas.html)
- Login screen (password input)
- Form: Data Akad Nikah (date, time, names, address)
- Form: Data Petugas (name, date, time, names, address, photo upload)
- Form: Pondasi Sakinah (names, address, photo upload)
- Accordion lists: Jadwal, Petugas, Pondasi (default open)

---

## Icon System

- **Library:** Material Icons Outlined (Google Fonts CDN)
- **Icon names used:** favorite_border, calendar_today, account_balance, info, school, auto_stories, landscape, notifications, dark_mode, light_mode, chevron_right, expand_more, event, assignment_ind, description, chat, search, close, file_download, open_in_new, person_off, favorite

---

## Dark Mode Specifications

- Toggle via button in navbar (sun/moon icon)
- Persisted in localStorage
- All component backgrounds shift to dark slate palette
- Card gradients become dark with subtle green border glow
- Text inverts to light gray
- Shadows deepen
- Green accents become brighter/more saturated
- Input fields: dark background with subtle borders

---

## Responsive Behavior

- **Breakpoint:** 420px (26.25rem)
  - Bookshelf grid: 3 columns → 2 columns
  - Body padding-top reduces: 160px → 140px
  - Logo shrinks: 1.4rem → 1.25rem
- **Max width:** Content always centered at 37.5rem
- **Mobile-first:** Designed for phone screens, scales up to tablet

---

## Data Sources

- **Marriage data:** Google Sheets (year-based tabs, client-side CSV fetch)
- **Religious data (Masjid/Wakaf/TPQ/Madin):** Google Sheets (client-side CSV fetch)
- **Jadwal/Petugas/Pondasi:** MySQL database via PHP REST API
- **Notifications/Banners:** MySQL database via PHP REST API
- **E-Sertifikat:** MySQL database with token-based access
- **Blangko:** Static PDF files in uploads directory

---

## Design Prompt Summary (for Stitch AI)

> Design a **premium mobile-first Islamic marriage services app** called **iNikah** for Indonesia's KUA (Religious Affairs Office). The design language is **iOS-inspired glassmorphism with 3D depth effects**. Use a **Kemenag green** (#064e3b → #0f766e → #14b8a6) as the primary palette with **gold** (#b45309) accents for the logo. The navbar is a **floating frosted glass** bar fixed at top with blur effects. Main menu uses **elevated cards with 3D box-shadows and gradient borders** (border-radius 28px). Each card has a **3D glassmorphism icon** (50×50, gradient + inset highlights). Submenus expand via **accordion** with smooth transitions. Data views use **floating modal overlays** with backdrop blur. Tabs are **full pill-shaped** (border-radius 50px). Typography mixes **Playfair Display** (serif, for logo/titles) with **system fonts** (body). Support **dark mode** with deep navy backgrounds. Include a **splash screen** with animated hearts, a **banner carousel**, an **Apple Books-style digital bookshelf**, and **document download lists**. The overall feel should be **premium, trustworthy, modern Islamic institution** — like an Apple-designed government service app.
