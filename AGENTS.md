<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlust travel booking app

Next.js 16.4 App Router frontend for a travel booking site. Users browse destinations, sign in, book trips, and manage bookings. Destination/booking data is served by a **separate backend at `http://localhost:8000` that is not in this repository**; authentication is Better Auth backed by MongoDB.

This is no longer the static landing page described by the original version of this file: it now has auth, MongoDB, dynamic destination routes, and booking CRUD flows.

## Commands

- `npm run dev` — Turbopack dev server on `http://localhost:3000`. It also rewrites the managed block at the top of this file.
- `npm run build` — production build; also runs the TypeScript check.
- `npm run start` — serve the production build (run `build` first).
- `npm run lint` — ESLint flat config over the current directory. For one file: `npx eslint src/path/to/file.tsx`.
- `npx tsc --noEmit --incremental false` — standalone typecheck without writing `tsconfig.tsbuildinfo`.
- Current health: TypeScript passes; ESLint has **2 warnings, 0 errors** (`_id` destructured but unused in `BookingCard.tsx` and `EditDestination.tsx`).
- There is no test suite, formatter config, CI, or `packageManager` field. Use npm only (`package-lock.json` is the only lockfile). Do not invent test/format commands.

## Tech stack

- Next.js `16.4.3` App Router, React `19.3.0`, TypeScript in strict mode.
- Tailwind CSS v4 (CSS-first, no `tailwind.config`), shadcn `base-nova` style built on Base UI (`@base-ui/react`), `class-variance-authority`, `lucide-react`, `react-icons`, and `embla-carousel-react`.
- Better Auth `1.7.14` with the MongoDB adapter and `mongodb` driver `7.x`.
- Auth database: MongoDB database name `Travel`.
- Backend API: external HTTP service at `http://localhost:8000` (framework, schema, validation, and auth enforcement are unknown; see “Unknown / unverified”).

## Routes

| Route | Type | Current behavior |
| --- | --- | --- |
| `/` | Server | Fetches all destinations, then renders Hero, FeaturedDestinations slider, WhyChooseUs, Testimonials, CTA. |
| `/all-destinations` | Server | Fetches all destinations and renders a grid. Category/price/sort selects are visual only. |
| `/all-destinations/[id]` | Server | Fetches all destinations and finds one by `_id`; renders details, Edit/Delete buttons, and BookingCard. |
| `/add-destination` | Client | Form POSTs to `/add-destination` on the external API. |
| `/my-bookings` | Server | Reads the Better Auth session, then fetches bookings by the user's email. |
| `/my-bookings/[id]` | Server | Fetches one booking by id. **No session check.** |
| `/profile` | Client | Reads `useSession`; profile card is real, statistics are hardcoded. |
| `/sign-in`, `/sign-up` | Client | Email/password + Google OAuth via the auth client. |
| `/api/auth/[...all]` | Route handler | Better Auth `GET`/`POST` handler via `toNextJsHandler`. |

`Navbar` and `Footer` are mounted in `src/app/layout.tsx`, so every route gets them. Several inner pages do not wrap content in `<main id="main-content">`; preserve the existing landmark structure of the file you touch rather than assuming every page has it.

## API integration

All calls are direct `fetch` calls. The base URL is **hardcoded** as `http://localhost:8000` in eight places; there is no API base-url env var, shared client, or proxy route.

| Method | Endpoint | Caller |
| --- | --- | --- |
| `GET` | `/all-destination` | Home, all destinations, destination details |
| `POST` | `/add-destination` | Add destination form |
| `PATCH` | `/all-destination/:id` | Edit destination dialog |
| `DELETE` | `/all-destination/:id` | Delete destination dialog |
| `POST` | `/add-booking` | Booking card |
| `GET` | `/all-booking/:email` | My bookings page |
| `GET` | `/booking/:id` | Booking details page |
| `DELETE` | `/all-booking/:id` | Cancel booking dialog |

- Server components fetch directly; client components mutate directly. There are no Server Actions.
- Response shapes are not shared. Home tolerates an array or `{ data }` / `{ destinations }`; most other pages assume a raw array. The backend contract is unverified.
- No `res.ok`/error handling in several places; see known issues.

## Auth and data

- `src/lib/auth.ts` creates a `MongoClient` from `MONGODB_URI`, uses database `Travel`, enables email/password auth, disables email verification, and configures Google OAuth.
- `src/lib/auth-client.ts` creates the browser client with `NEXT_PUBLIC_APP_URL` (fallback `http://localhost:3000`) and exports `signIn`, `signUp`, `useSession`, and `signOut`.
- `src/app/api/auth/[...all]/route.ts` exports Better Auth's `GET` and `POST` handlers.
- Server-side session access currently exists only in `src/app/my-bookings/page.tsx`:
  `auth.api.getSession({ headers: await headers() })`.
- There is **no middleware, no route protection, and no admin/role system**. Login checks are UI-only. Add/edit/delete destination, booking, booking detail, and cancel flows are reachable without a frontend auth check; whether the external backend enforces ownership is unknown.
- MongoDB is used only by Better Auth in this repo. There are no models, migrations, or direct destination/booking collection queries. Destination/booking persistence happens through the external API (unverified).

## Environment variables

Names referenced in source code only. **Never print or commit values.** `.env` exists and is gitignored; this document intentionally does not inspect it. No `.env.example` exists.

| Name | Scope | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | Server | MongoDB connection string used by Better Auth. |
| `GOOGLE_CLIENT_ID` | Server | Google OAuth client id. |
| `GOOGLE_CLIENT_SECRET` | Server | Google OAuth client secret. |
| `NEXT_PUBLIC_APP_URL` | Client | Auth client base URL; defaults to `http://localhost:3000`. |

Other Better Auth production variables (for example a signing secret) may be required by the library but are **not referenced in source**; verify with the user/deployment rather than inventing names. `MONGODB_URI` is cast with `as string`, so a missing value fails at runtime rather than at startup validation.

## Folder structure

```text
src/
  app/
    page.tsx                 # home composition
    layout.tsx               # root shell, fonts, Navbar/Footer, metadata
    globals.css              # Tailwind v4 theme + brand tokens
    all-destinations/        # list + [id] details
    add-destination/         # create form
    my-bookings/             # list + [id] details
    profile/                 # authenticated profile UI
    sign-in/ sign-up/        # Better Auth forms
    api/auth/[...all]/       # Better Auth handler
  components/
    home/                    # Hero, WhyChooseUs, Testimonials, CTA
    layout/                  # Navbar, UserNav, Footer
    destination/             # cards, featured slider, edit/delete dialogs
    booking/                 # BookingCard, CancelBookingButton
    ui/                      # generated shadcn/Base UI primitives
  lib/
    auth.ts                  # Better Auth server config + Mongo client
    auth-client.ts           # Better Auth browser client
    utils.ts                 # re-export of cn
public/assets/               # logos, hero/CTA images, people, destination images
```

- No `src/hooks` directory despite the `@/hooks` alias in `components.json`.
- No `middleware.ts`, `loading.tsx`, `error.tsx`, or custom `not-found.tsx`.
- `components/ui/card.tsx`, `carousel.tsx`, `label.tsx`, `select.tsx`, and `textarea.tsx` are currently unused. The app uses its own slider in `FeaturedDestinations`, not the shadcn Carousel.
- `README.md` is stale create-next-app boilerplate (it mentions Geist and `app/page.tsx`); do not rely on it.

## Conventions

- Default to server components. Add `"use client"` only for state, effects, event handlers, or auth hooks.
- Use the `@/*` alias for `src/*`.
- New UI primitives should come from `npx shadcn add <component>` so they match `base-nova`/Base UI. Generated `components/ui` files import `cn` directly from `"cn"`; `src/lib/utils.ts` only re-exports it. Keep that pattern.
- Tailwind v4 tokens live in `src/app/globals.css` under `@theme inline`. Do not add a `tailwind.config` or remove the `shadcn` dependency (`globals.css` imports `shadcn/tailwind.css`).
- Prefer `bg-brand` / `text-brand` / `hover:bg-brand-dark` for new work. The theme brand is `#00bcd4`; many existing screens hardcode `#00a6c0`/`#00879c`, and Hero uses `blue-400`. This is existing inconsistency, not a reason to add more hex colors.
- Fonts: `--font-josefin` is the body font (`font-sans`); `--font-playfair` is exposed as `font-heading`. Some pages use `font-serif` instead, which falls back to the default serif rather than Playfair.
- Use `next/image` for images. Local assets live in `public/assets`; `next.config.ts` only allowlists `images.unsplash.com` for remote images.
- Dynamic route props are async in this Next version: `params` is a `Promise`, so `await params` before use. Route prop types such as `LayoutProps<"/">` are generated globally and do not need imports.
- React Compiler is enabled; do not add manual `useMemo`/`useCallback` just for render performance.
- There is no formatter. Match the local file's quote/semicolon style; comments are sometimes Bengali.
- API response types are duplicated per file rather than shared. Add a shared type/client only when asked or when it clearly reduces duplication.

## Next.js / configuration notes

- `next.config.ts` currently sets `cacheComponents: false`, `partialPrefetching: false`, `reactCompiler: true`, and the Turbopack CSS loader for `@tailwindcss/turbopack`. These are intentional; do not delete them as boilerplate.
- Cache Components is **disabled**, despite older guidance in this project that assumed it was enabled. If you turn it on, re-audit `new Date()` usage, `fetch` caching, and dynamic auth pages.
- `images.remotePatterns` allows only `https://images.unsplash.com`. Any other remote `imageUrl` (including user-entered URLs or a Google profile image rendered with `next/image` in `/profile`) will fail at runtime.
- `next dev` rewrites the managed block at the top of this file; keep it when committing.
- `cn` in generated UI comes from the `cn` package, not `clsx`/`tailwind-merge` directly.

## Known bugs and incomplete features (verified from code)

### Data/API

- The external API is hardcoded to `localhost:8000`, so production and non-local environments will fail unless a proxy/tunnel is used. The backend source is absent.
- Home throws if the destination API is down; there is no error boundary. `/all-destinations` does not check `res.ok` before parsing. `/my-bookings` assumes the response is an array and has no error handling. `/all-destinations/[id]` turns fetch/network failures into `notFound()` via a fragile `NEXT_HTTP_ERROR_FALLBACK;404` string check.
- `src/app/all-destinations/page.tsx` imports `Link` from the internal path `next/dist/client/link`; use `next/link`.
- `/my-bookings` interpolates the user's email into a URL path without `encodeURIComponent`.
- No loading/error/empty states beyond a few hardcoded fallbacks; no pagination or server-side filtering.

### Auth/security

- No middleware or route guards. `/my-bookings/[id]` renders any booking id without checking the session, and Cancel/Edit/Delete calls carry no auth/ownership proof. Add/Edit/Delete destination controls are visible to every visitor. Backend enforcement is unknown.
- The mobile navbar hides Login/Sign Up for logged-out users: `UserNav`'s logged-out branch is `hidden ... md:flex`, nested inside the mobile-only menu. Logged-in avatars still appear.
- `/sign-in` links to `/forgot-password`, but that route does not exist. “Remember me” is an unwired checkbox. The sign-in page's Google button is labeled “Sign Up With Google.”
- Email verification is explicitly disabled; there is no password-reset, profile-update, or account-deletion flow.

### Dead or placeholder UI

- No element has `id="destinations"`, but Hero, CTA, and Footer link to `#destinations`; those links do nothing. The Hero search form only navigates to `/#destinations` and does not filter.
- All-destinations category/price/sort selects have no state or handlers. Ratings (4.5/4.8/4.9), review counts, and trip highlights are hardcoded.
- Testimonial previous/next buttons have no handlers. Footer newsletter has no submit handler; most footer links are `"#"`.
- Profile statistics are hardcoded; Edit Profile and the camera badge do nothing.
- BookingCard is usable while logged out, sends `undefined` user fields, does not require a date, has no loading/success/error state, and only logs the response. Its copy still says booking “can be connected” even though it calls the API.
- Add-destination reports success only on HTTP success and otherwise silently logs the error; it has no visible failure state and no auth guard. Edit destination has no success/error feedback and renders a numeric `0` price as an empty field.

### UI/code quality

- `FeaturedDestinations` is a custom slider; its percentage transform is calculated against the flex track while slides use viewport-relative widths plus gaps, so the offset/count can look wrong. It does not use the installed shadcn/Embla carousel.
- Brand colors and heading fonts are inconsistent across pages (hardcoded teal vs. `brand` tokens; `font-serif` vs. `font-heading`).
- ESLint warnings: unused `_id` bindings in `BookingCard.tsx` and `EditDestination.tsx`.
- `cors` is an unused dependency; `embla-carousel-react` is only used by the unused carousel primitive.
- MongoClient is created at module scope without a global cache, and the database name is hardcoded; dev hot reload may create extra clients.

## Unknown / unverified — do not assume

- Backend framework, database schema, response envelopes, validation, auth/ownership enforcement, and whether bookings/destinations are stored in MongoDB.
- Better Auth production secret/base-URL requirements beyond the env names referenced above.
- Deployment target and required Node version.
- Whether a production `npm run build` succeeds (only typecheck and lint were run during this review).
- Contents of `.env` (intentionally not inspected) and any other locally defined variables.

## Before changing code

1. Start the external API on port 8000 and set the required environment variables; otherwise data pages and auth flows cannot be exercised.
2. Preserve the managed block at the top of this file and the existing `Navbar`/`Footer`/main landmark structure.
3. Do not scan or print `.env`, `node_modules`, `.next`, build output, or caches.
4. When you touch auth or data fetching, consider the missing authorization and hardcoded API URL first; do not assume the backend validates the caller.
5. Update this file when routes, env vars, backend contracts, or major conventions change.
