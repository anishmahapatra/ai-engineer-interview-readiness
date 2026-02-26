# Changelog

This changelog summarizes the major work completed on the landing page, launch hardening, and Supabase integration.

## Branch Context
- Current branch: `feature/supabase-lead-capture`
- Recent baseline commits (newest first):
  - `68ede79` - fix(api): return 400 for null/non-object contact payloads
  - `116a9b5` - Update metadata and contact form
  - `a190362` - Refactor page to static markup
  - `9fb3988` - launch: metadata + real lead capture endpoint
  - `6f15ca7` - content: strengthen positioning, CTA clarity, and update contact email v1
  - `430435c` - Update hero and CTA handling
  - `9ca08fa` - Fix hydration and CTA layout

---

## 1) Landing Page Build and Iteration

### Initial implementation
- Replaced the default Next.js scaffold with a full single-page landing experience in `src/app/page.tsx`.
- Implemented the requested sections:
  - Header/Nav
  - Hero
  - About
  - What You Master
  - Inside the Playbook
  - CTA
  - Contact
  - Footer
- Added mobile menu behavior and anchored section navigation.

### Design/system refinements
- Established a light-mode editorial technical direction.
- Added and tuned:
  - Typographic hierarchy
  - Structured spacing rhythm
  - Surface contrast and border/shadow depth
  - Architecture diagram styling
- Added “Who This Is For / Who This Is Not For” trust block.

### Motion and hydration stabilization
- Iteratively reduced animation scope and eventually removed Framer Motion usage from `page.tsx` to isolate hydration issues.
- Fixed floating CTA behavior across hydration/mobile cases:
  - Conditional rendering only when visible
  - No hidden focusable/clickable element
  - Scroll-threshold-based appearance
  - iOS tap highlight suppression via inline style

---

## 2) Content/Copy Updates

### Positioning updates in `src/app/page.tsx`
- Updated hero headline and subheadline for stronger production-system positioning.
- Updated authority statement in About section.
- Updated What You Master intro line.
- Replaced CTA text globally from “Join Early Access” to “Get Early Access”.
- Updated contact email and `mailto:` from:
  - `hello@aiinterviewreadiness.com`
  - to `hello@anish.studio`

---

## 3) Launch Hardening

### Metadata
- Updated `src/app/layout.tsx` metadata for production use:
  - Title and description
  - Open Graph fields
  - Twitter card fields

### Real lead capture endpoint
- Added `src/app/api/contact/route.ts`:
  - Accepts POST JSON payload `{ name, email, role, message }`
  - Validates email required + format
  - Returns:
    - `200 { success: true }`
    - `400 { success: false, error: "..." }`
  - Logs submissions server-side (no DB persistence yet)

### Contact form wiring
- Wired the contact form in `src/app/page.tsx` to POST to `/api/contact`.
- Added minimal client flow (without redesign):
  - Existing email validation retained
  - Submit loading state
  - Success message on 200
  - Error message on failure
  - Disabled button while submitting

---

## 4) Supabase Integration

### Dependency and server client
- Added `@supabase/supabase-js` dependency.
- Added server-only admin client at `src/lib/supabase/server.ts`:
  - `import "server-only"`
  - Uses `NEXT_PUBLIC_SUPABASE_URL`
  - Uses `SUPABASE_SERVICE_ROLE_KEY`
  - Throws clear errors if missing
  - `persistSession: false`

### Env health endpoint
- Added environment health endpoint (now routable path):
  - `src/app/api/health/env/route.ts`
- Returns booleans only (no secret values):
  - `hasUrl`
  - `hasServiceKey`

### Route-path correction
- Corrected route from private segment path (`/_health`) to public path (`/health`) so it is reachable:
  - old attempted path: `/api/_health/env` (404 in App Router)
  - current path: `/api/health/env`

---

## 5) API Robustness Fixes from Review Feedback

### Contact payload hardening
- Addressed review finding on `src/app/api/contact/route.ts`:
  - Added guard for non-object payloads (`null`, array, primitives)
  - Prevents TypeError when accessing fields
  - Ensures invalid payloads return `400` instead of `500`

### Health endpoint correctness
- Addressed review finding on health semantics:
  - Endpoint `ok` now reflects env presence
  - Returns unhealthy status when required vars are absent

---

## 6) Validation Notes

- ESLint checks were repeatedly run on touched files and passed after each change set.
- Local runtime test caveat encountered in sandbox due Next dev lock/port constraints, but route/path and code behavior were validated directly in repo.

---

## 7) Current State (at time of writing)

- Uncommitted change present:
  - `src/app/api/health/env/route.ts` (health status behavior update)
- Everything else listed above is committed across the commits noted in this file.

