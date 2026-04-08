# 🗓️ Interactive Wall Calendar

A beautiful, skeuomorphic interactive wall calendar built with **React + Vite**. Featuring 3D page-flip animations, seasonal auto-theming, drag-to-select date ranges, and an integrated notes system — all wrapped in a design that looks like a real wall calendar.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)
![CSS](https://img.shields.io/badge/Vanilla_CSS-Custom-orange)

---

## ✨ Features

### Core Requirements
- **Wall Calendar Aesthetic** — Spiral binding, paper texture with ruled lines, page curl effect, and hero images that make it look like a real wall calendar
- **Day Range Selector** — Click-to-select start/end dates with clear visual states (colored pills for endpoints, tinted fill for in-between days), or **drag across dates** to select a range
- **Integrated Notes System** — Per-date notes, date range notes, and monthly memos, all auto-saved to `localStorage`
- **Fully Responsive** — Desktop side-by-side layout gracefully collapses to stacked mobile layout with touch-friendly date cells

### Standout Features ✨
- **3D Page-Flip Animation** — Month transitions use CSS 3D perspective `rotateX` transforms that flip the page upward like a real wall calendar
- **4 Seasonal Themes** — Winter, Summer, Monsoon, Autumn — each with a unique hero image and auto-harmonized color palette
- **Holiday Markers** — 27+ Indian national holidays, festivals, and international holidays with colored badges and hover tooltips
- **Holiday Legend** — Month's holidays listed in the notes panel with color-coded dots
- **Year Overview** — Click the year number to see a full 12-month mini-calendar overlay; click any month to jump there
- **Keyboard Navigation** — `←` / `→` arrow keys to change months instantly
- **Swipe Navigation** — Swipe left/right on the hero image to change months (touch & mouse)
- **Drag-to-Select** — Hold and drag across dates for intuitive range selection
- **Export Notes** — Download all month's notes + memo + holidays as a formatted `.txt` file
- **Day Count Badge** — Selected range shows a "X days" badge in the header
- **Go to Today** — Quick button to snap back to the current month
- **Handwriting Font Notes** — Notes render in Caveat (handwriting font) for authentic "written on the calendar" feel
- **Micro-Animations** — Breathing ring on today's date, pop-in on range endpoints, slide-in for new notes, floating ambient particles

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI components with hooks-based architecture |
| **Vite 6** | Fast dev server + build tool |
| **Vanilla CSS** | All styling hand-crafted, no UI library dependencies |
| **localStorage** | Client-side persistence for notes & memos |
| **Google Fonts** | Playfair Display (headings), Inter (body), Caveat (handwriting) |

### Architecture Decisions

- **Custom Hooks** — `useCalendar`, `useDateRange`, `useNotes`, `useSwipe` cleanly separate concerns
- **Zero Dependencies** — No date-fns, no moment.js, no UI libraries — all logic is hand-written
- **CSS Custom Properties** — Theme colors flow through `--cal-primary` for dynamic seasonal theming
- **`React.memo`** — DayCell is memoized to prevent unnecessary re-renders on 42-cell grid
- **Component Composition** — Small, focused components (DayCell, SpiralBinding, HeroImage, YearOverview) composed into the calendar
- **Accessible** — ARIA labels, keyboard support, focus-visible outlines, semantic HTML

---

## 🚀 How to Run Locally

```bash
# Clone the repository
git clone <https://github.com/AyushBurde/InteractiveCalendar.git>
cd InteractiveCalendar

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will open at `http://localhost:5173`.

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Calendar/
│   │   ├── CalendarGrid.jsx       # 7×6 date grid with drag support
│   │   ├── CalendarHeader.jsx     # Month/year navigation + selection info
│   │   ├── DayCell.jsx            # Individual date cell with all visual states
│   │   ├── HeroImage.jsx          # Seasonal hero image with wave overlay
│   │   ├── SpiralBinding.jsx      # Realistic spiral binding decoration
│   │   ├── YearOverview.jsx       # 12-month mini-calendar modal
│   │   └── *.css                  # Co-located component styles
│   └── Notes/
│       └── NotesPanel.jsx         # Notes sidebar with memo, per-date notes, export, holiday legend
├── hooks/
│   ├── useCalendar.js             # Calendar navigation + keyboard support
│   ├── useDateRange.js            # Range selection + drag logic
│   ├── useNotes.js                # Notes CRUD + localStorage sync
│   └── useSwipe.js                # Touch & mouse swipe detection
├── data/
│   ├── holidays.js                # 27+ Indian + International holidays
│   └── themes.js                  # 4 seasonal theme configurations
├── utils/
│   ├── dateUtils.js               # Date math helpers (zero dependencies)
│   └── storageUtils.js            # localStorage wrappers
├── App.jsx                        # Root component orchestrating all features
├── App.css                        # Layout + responsive + ambient effects
├── index.css                      # Global reset + design tokens
└── main.jsx                       # React entry point
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| **> 900px** | Side-by-side: Calendar + Notes panel |
| **768–900px** | Narrower notes panel |
| **< 768px** | Stacked: Calendar on top, Notes below |
| **< 480px** | Compact mobile with smaller typography |

---

## 🎨 Design Philosophy

The design takes inspiration from physical wall calendars — the kind you'd hang in a kitchen or office. Key design elements:

1. **Spiral Binding** — CSS-rendered metal rings across the top
2. **Paper Texture** — Subtle ruled-line patterns that feel like real paper
3. **Page Curl** — Bottom-right corner curl shadow effect
4. **Page Flip** — 3D rotateX animation when changing months
5. **Wave Overlay** — Smooth SVG wave transition between hero image and dates
6. **Wall Shadow** — Multi-layered box-shadow simulating depth on a wall
7. **Handwriting Font** — Notes use Caveat font for authenticity
8. **Ambient Particles** — Floating season-colored dots in the background
9. **Seasonal Color Harmony** — Every element adjusts to the current season's palette

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `←` Arrow Left | Previous month |
| `→` Arrow Right | Next month |
| `Enter` / `Space` | Select focused date |
| `Tab` | Navigate between date cells |

---

## 📄 License

MIT
