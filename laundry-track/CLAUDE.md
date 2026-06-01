# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Laundry Track is a web app for managing laundry collections. Users register/log in, then organize clothing items into named collections and track whether each item is "at the laundry" or "returned".

## Structure

```
laundry-track/
├── client/    # React 19 + Vite 7 frontend
└── server/    # Express 5 + PostgreSQL backend
```

The root `node_modules/` is a leftover artifact and not actively used.

## Commands

**Frontend** (run from `client/`):
```bash
npm run dev      # Start Vite dev server at http://localhost:5173
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

**Backend** (run from `server/`):
```bash
npm run dev      # Start with nodemon on port 3000
npm start        # Same as dev
```

Both services must run concurrently for the app to work.

## Architecture

### Frontend (`client/src/`)

- **`main.jsx`** — Entry point, wraps app in `<BrowserRouter>`
- **`App.jsx`** — Route definitions with `ProtectedRoute` (redirects unauthenticated users to `/login`)
- **`context/AuthContext.jsx`** — Global auth state (user, loading, login, register, logout). On mount it calls `GET /me` to restore session. All API calls go through `axios` with `withCredentials: true` to `http://localhost:3000`.
- **`pages/`** — Full-page views: `landingPage.jsx`, `login.jsx`, `register.jsx`, `home.jsx`
- **`component/`** — Shared UI: `Navbar.jsx`, `Footer.jsx`, `AddClothingModal.jsx`
- **`utils/errors.js`** — `describeAxiosError()` helper for user-facing error messages

**Home page data flow**: Collections and clothing items are persisted in `localStorage` keyed as `laundryTrackData:{userId}`. The DB is not yet used for clothing data — it's a planned migration. Clothing images are stored as base64 `dataURL` strings, which can exhaust `localStorage` with large images.

**AddClothingModal** has a 3-step flow: `choose` (upload or camera) → `camera` or file picker → `preview` + tag selection → confirm. Tags are either from `DEFAULT_TAGS` or user-created custom tags (also stored in localStorage).

### Backend (`server/`)

- **`index.js`** — Express app, all routes defined here
- **`db.js`** — PostgreSQL connection pool via `pg`, reads `DATABASE_URL` from `.env`
- **`register.js`**, **`test.js`** — Utility/test scripts

**Auth**: Password hashing uses Node's built-in `crypto.scryptSync`. Sessions use `express-session` with a 7-day cookie.

**Known incomplete state**: The `/login` and `/me` endpoints still reference a `users` Map (in-memory store) that was removed. Only `/register` has been migrated to PostgreSQL. These endpoints will throw at runtime until fixed.

### Database

PostgreSQL database `LaundryTrack_DB`. Connection configured in `server/.env`:
```
DATABASE_URL=postgresql://postgres:<password>@localhost:5432/LaundryTrack_DB
SESSION_SECRET=<secret>
```

The `users` table schema (from `/register` INSERT):
```sql
CREATE TABLE users (
  id        SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email     TEXT UNIQUE NOT NULL,
  salt      TEXT NOT NULL,
  hash      TEXT NOT NULL
);
```

### Styling

Tailwind CSS v4 (via `@tailwindcss/vite` plugin — no `tailwind.config.js` needed). Design uses a teal (`teal-400`) primary color with slate neutrals.
