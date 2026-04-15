# Homely

A modern real-estate listings app built with **Next.js App Router**, **Tailwind + shadcn/ui**, **SQLite + Drizzle**, and **Auth.js**.

## Stack

- **Framework**: Next.js 14 (App Router, Server Components, Server Actions)
- **UI**: Tailwind CSS 3 + shadcn/ui, lucide-react icons, Inter + Fraunces fonts
- **Database**: SQLite via `better-sqlite3`
- **ORM**: Drizzle ORM with SQL migrations
- **Auth**: Auth.js (NextAuth v5) Credentials provider with bcrypt + httpOnly JWT cookie
- **File uploads**: written to `public/uploads/`, served as static files

## Getting started

```bash
npm install
cp .env.example .env.local       # generate your own AUTH_SECRET
npm run db:migrate
npm run db:seed                    # creates demo@homely.test / password + 5 sample ads
npm run dev
```

Then open http://localhost:3000.

Sign in with:

- **email**: `demo@homely.test`
- **password**: `password`

## Scripts

| Command              | What it does                                        |
| -------------------- | --------------------------------------------------- |
| `npm run dev`        | Start Next.js dev server on :3000                   |
| `npm run build`      | Production build                                    |
| `npm run start`      | Serve the production build                          |
| `npm run lint`       | Run `next lint`                                     |
| `npm run db:generate`| Generate a new Drizzle migration from `db/schema.js`|
| `npm run db:migrate` | Apply pending migrations to `./data/homely.db`      |
| `npm run db:seed`    | Wipe data and seed demo user + 5 listings           |
| `npm run db:studio`  | Open Drizzle Studio to browse/edit the database     |

## Project structure

```
homely/
├── app/                      # Next.js App Router
│   ├── layout.jsx            # Root layout (fonts, Header, Footer, Toaster)
│   ├── page.jsx              # Landing page
│   ├── ads/                  # Listings + detail + edit
│   ├── adform/               # Create listing (protected)
│   ├── login/, signup/       # Auth split-screen pages
│   ├── users/[id]/           # Profile + user ads
│   └── api/auth/             # NextAuth route handlers
├── components/
│   ├── ui/                   # shadcn primitives + app wrappers
│   └── **/                   # Feature components (Header, AdCard, forms…)
├── db/
│   ├── schema.js             # Drizzle schema (users, ads, ad_images)
│   ├── index.js              # SQLite client singleton
│   ├── migrate.js, seed.js   # Scripts
│   └── migrations/           # Generated SQL
├── lib/
│   ├── actions/              # Server Actions (auth, ads)
│   ├── ads.js                # Query helpers for Server Components
│   ├── auth.js               # `getSession`, `requireUser`
│   └── utils.js              # `cn()` helper
├── auth.js, auth.config.js   # NextAuth v5 config
├── middleware.js             # Route protection
├── data/homely.db            # SQLite file (gitignored)
└── public/uploads/           # Uploaded images (gitignored)
```

## Data-fetching model

- **Reads**: Server Components call Drizzle directly via `lib/ads.js`. No client-side data fetching, no React Query.
- **Mutations**: Server Actions in `lib/actions/`. Forms submit via `<form action={...}>` and use `useFormState` / `useFormStatus` for pending states and errors.
- **Auth**: JWT session cookie (httpOnly). `middleware.js` protects `/adform`, `/ads/*/edit`, `/users/*`.

## Notes

- Seeded ads reference static files under `public/apartment*.jpg`. New ads upload to `public/uploads/` and are served from there.
- Auth.js v5 is beta — API is stable but may shift. Pinned via `next-auth@beta`.
- To reset: `rm -rf data && npm run db:migrate && npm run db:seed`.
