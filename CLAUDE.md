# Mudita Minerals

Crystal & mineral e-commerce store built with Next.js 16.

## Tech Stack
- **Framework:** Next.js 16.1.6 (Turbopack) + TypeScript
- **Styling:** Tailwind CSS v4 (no tailwind.config — use `@theme {}` in globals.css)
- **Database:** Supabase Postgres (with mock data fallback when not configured)
- **Storage:** Supabase Storage (`product-images` bucket, public)
- **Auth:** HMAC cookie auth via `ADMIN_PASSWORD` env var (no user accounts)
- **State:** Zustand (cart persistence in localStorage)
- **Payments:** Stripe (keys configured, checkout not yet implemented)
- **Icons:** lucide-react
- **Animations:** Framer Motion, WebGL Aurora (ogl)
- **Fonts:** Inter (body) + Oswald (headings)

## Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout (html/body/fonts only)
│   ├── globals.css             # Tailwind v4 theme + animations
│   ├── (storefront)/           # Public-facing pages
│   │   ├── layout.tsx          # Header + Footer + CartDrawer
│   │   ├── page.tsx            # Home (hero, featured, categories)
│   │   ├── shop/               # Shop index + [slug] product detail
│   │   ├── about/
│   │   ├── contact/
│   │   ├── faq/
│   │   └── shipping/
│   ├── admin/                  # Admin panel (auth-protected)
│   │   ├── layout.tsx          # Sidebar nav (client component)
│   │   ├── page.tsx            # Dashboard with stats
│   │   ├── login/page.tsx      # Password login form
│   │   ├── products/           # CRUD: list, new, [id]/edit
│   │   ├── categories/         # CRUD: inline create/edit/delete
│   │   └── orders/             # List + [id] detail with status update
│   └── api/
│       └── upload/route.ts     # Image upload endpoint (Supabase Storage)
├── components/
│   ├── layout/                 # Header, Footer
│   ├── cart/                   # CartDrawer
│   ├── shop/                   # ProductCard, ProductGallery
│   └── *.tsx                   # Aurora, ScrollReveal, HeroAurora, etc.
├── hooks/
│   └── use-cart.ts             # Zustand cart store
└── lib/
    ├── supabase.ts             # Client (anon) + createServerClient (service role)
    ├── data.ts                 # Storefront data fetching (with mock fallback)
    ├── admin-data.ts           # Admin read functions
    ├── admin-actions.ts        # Server actions: CRUD + auth
    ├── types.ts                # Product, Category, Order, CartItem, etc.
    ├── utils.ts                # cn(), formatCurrency(), slugify()
    ├── branding.ts             # Brand name, tagline, URL, email
    ├── mock-data.ts            # 8 sample products, 4 categories
    └── stripe.ts               # Stripe client init
```

## Key Patterns

### Route Groups
- `(storefront)` — public pages with Header/Footer/CartDrawer
- `admin` — protected panel with sidebar layout, skips storefront shell
- Admin layout returns `{children}` directly when `pathname === "/admin/login"`

### Auth
- Middleware at `src/middleware.ts` protects `/admin/*` (except `/admin/login`)
- HMAC token generated from `ADMIN_PASSWORD` env var, stored as HttpOnly cookie (7-day expiry)
- `generateToken()` function duplicated in middleware, admin-actions, and upload route (must stay in sync)
- `requireAdmin()` in admin-actions.ts redirects to login if invalid

### Server Actions (admin-actions.ts)
- All mutations use `createServerClient()` (service role, bypasses RLS)
- `ActionState` type: `{ error: string | undefined }` — used with `useActionState<ActionState, FormData>`
- Product create/update `redirect()` on success (no return needed)
- Category create/update return `{ error: undefined }` on success (inline form stays on page)
- `revalidatePath` after mutations refreshes both admin and storefront caches

### Image Upload
- Client-side `ImageUpload` component with `accept="image/*"` (triggers camera on mobile)
- Uploads via `POST /api/upload` → Supabase Storage `product-images` bucket
- URLs stored in hidden `<input name="images">` as newline-separated string
- Parsed in server actions: `imagesRaw.split("\n").map(u => u.trim()).filter(Boolean)`
- 10MB max per image, validated server-side

### Data Fetching
- `src/lib/data.ts` — storefront reads (uses anon key, falls back to mock data)
- `src/lib/admin-data.ts` — admin reads (uses service role key, falls back to mock data)
- All admin pages use `export const dynamic = "force-dynamic"`

### Tailwind v4
- No `tailwind.config.ts` — custom tokens defined in `@theme {}` block in globals.css
- Color vars: `--color-gold`, `--color-charcoal`, `--color-stone`, `--color-bone`, `--color-amethyst`, `--color-muted`
- Font vars: `--font-sans` (Inter), `--font-heading` (Oswald)

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
ADMIN_PASSWORD=
NEXT_PUBLIC_SITE_URL=
```

## Deployment
- **Hosting:** Vercel
- **Repo:** github.com/joemfjackson/muditaminerals
- **Branch:** master
- **Live URL:** https://mudita-minerals.vercel.app
- Env vars must be set in Vercel dashboard (ADMIN_PASSWORD, Supabase keys, etc.)
- Supabase Storage bucket `product-images` must exist and be public

## Build Notes
- Next.js 16 shows middleware deprecation warning (recommends "proxy") — middleware still works
- `turbopack.root: __dirname` in next.config.ts silences workspace root warning
- `next.config.ts` has `images.remotePatterns` for `images.unsplash.com` and `*.supabase.co`

## Progress Log

### 2026-02-23
- **Admin Panel** (`92761f6`): Route group restructure, HMAC cookie auth, sidebar layout, dashboard with stats, products CRUD (list/new/edit with toggles), categories CRUD (inline), orders management (list + detail with status updates), admin types added
- **Image Upload** (`2167fa5`): Camera/device photo upload on product form, Supabase Storage integration, `/api/upload` endpoint, `ImageUpload` component with thumbnails + remove, `product-images` bucket created
