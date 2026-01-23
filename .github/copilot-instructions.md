# Xtrnia Codebase Guidance for AI Agents

## Architecture Overview

**Xtrnia** is a Next.js competition management platform with admin panel, Cloudinary image integration, and JWT authentication. It uses Prisma ORM with PostgreSQL.

### Key Services & Boundaries

1. **Authentication**: JWT-based (httpOnly cookie `admin-token`), verified in `verifyAdmin()` middleware across admin routes
2. **Data Models**: `Admin`, `Competition`, `ContactSubmission` (see [prisma/schema.prisma](../../prisma/schema.prisma))
3. **Media**: Competition images hosted on Cloudinary (see [CLOUDINARY_MIGRATION.md](../../CLOUDINARY_MIGRATION.md))
4. **Frontend**: React Server & Client Components; Tailwind CSS styling

### Data Flow

- **Public endpoints**: `/api/competitions` (GET), `/api/contact` (POST) - filter by `type` and `status`
- **Admin endpoints**: Require JWT verification; handles login, password changes, settings
- **Client components**: Fetch data at render (e.g., [CompetitionsSection.tsx](../../app/components/CompetitionsSection.tsx) uses `useEffect` + `fetch`)

## Critical Patterns & Conventions

### JWT & Authentication

- JWT secret: `process.env.JWT_SECRET` (must be configured in `.env.local`)
- Token expires in 7 days
- Verify with: `jwt.verify(token, JWT_SECRET)` → returns `{ id, username }`
- Always extract from cookies: `request.cookies.get('admin-token')?.value`
- **Pattern**: See [app/api/admin/info/route.ts](../../app/api/admin/info/route.ts#L8) for verification pattern

### Competition Data Format

- `prizes`: Stored as JSON string in DB, must parse with `JSON.parse(prizes)` when reading
- `type`: `"current"` or `"upcoming"` - used for filtering
- `status`: `"active"` or `"inactive"` - published/draft status
- `order`: Numeric ordering within type; sort by: `[{ type }, { order }, { createdAt }]`
- **Pattern**: See [app/api/competitions/route.ts](../../app/api/competitions/route.ts#L45) for ordering and parsing

### Image URLs

- All competition images use Cloudinary URLs (format: `https://res.cloudinary.com/yomah/image/upload/...`)
- Local `/public/uploads/` directory exists but images are not served from there
- Next.js config allows `remotePatterns` for `res.cloudinary.com` (see [next.config.ts](../../next.config.ts))

### Client Components

- Use `'use client'` directive for interactivity (state, event handlers)
- Fetch data in `useEffect` hooks, not at top level
- Handle loading/error states explicitly
- **Pattern**: See [CompetitionsSection.tsx](../../app/components/CompetitionsSection.tsx#L23) for fetch pattern

## Developer Workflows

### Build & Run Commands

```bash
npm run dev        # Start development server (localhost:3000)
npm run build      # Build for production (runs `prisma generate` first)
npm run start      # Run production build
npm run seed       # Seed database with initial data
npm run create-admin  # Interactive script to create admin user
npm run migrate-images  # Upload local images to Cloudinary
npm run lint       # Run ESLint
```

### Database Workflows

- **First setup**: `npm run seed` (uses [prisma/seed-data.json](../../prisma/seed-data.json))
- **Schema changes**: Modify [prisma/schema.prisma](../../prisma/schema.prisma), then Prisma Client auto-regenerates on `postinstall`
- **Connection**: Requires `DATABASE_URL` in `.env.local` (PostgreSQL)
- Prisma uses singleton pattern in [lib/prisma.ts](../../lib/prisma.ts) to prevent connection exhaustion in dev

### Environment Variables Required

```
DATABASE_URL=postgresql://...
JWT_SECRET=<your-secret-key>
CLOUDINARY_CLOUD_NAME=<name>
CLOUDINARY_API_KEY=<key>
CLOUDINARY_API_SECRET=<secret>
```

## Project-Specific Conventions

### API Response Format

All endpoints follow consistent response shape:
```javascript
{ success: true/false, message?: string, data?: any }
```

### Admin Routes Location

- Auth: `/api/auth/` (login, logout, verify)
- Admin data: `/api/admin/` (info, change-password, settings)
- Data management: `/api/competitions/`, `/api/contact/` (with admin auth for POST/PUT/DELETE)

### TypeScript Patterns

- Use `NextRequest`/`NextResponse` for route handlers
- Component interfaces inline (e.g., `Competition` interface in [CompetitionsSection.tsx](../../app/components/CompetitionsSection.tsx#L7))
- Error handling: try/catch in async handlers, return `NextResponse.json()` with status codes

## Integration Points & External Dependencies

- **Prisma**: Schema validation, migrations in [prisma/migrations/](../../prisma/migrations/)
- **JWT**: Authentication via `jsonwebtoken` package
- **Bcrypt**: Password hashing (see [app/api/auth/login/route.ts](../../app/api/auth/login/route.ts#L29))
- **Cloudinary**: Image uploads via `cloudinary` package (see [lib/cloudinary.ts](../../lib/cloudinary.ts))
- **Next.js Image**: Optimize Cloudinary images (requires remotePatterns config)

## Common Tasks

### Adding a New Admin Endpoint

1. Create file in `app/api/admin/<feature>/route.ts`
2. Use `verifyAdmin()` at top of handler
3. Return consistent `{ success, message, data }` format
4. Add TypeScript types inline or extend Prisma-generated types

### Creating a Client Component

1. Add `'use client'` directive
2. Use `useState` for client state
3. Fetch in `useEffect` with cleanup
4. Bind to `/api/<endpoint>?<params>` routes

### Modifying Database Schema

1. Edit [prisma/schema.prisma](../../prisma/schema.prisma)
2. Run seed or migration as needed
3. Prisma Client auto-regenerates
4. Update TypeScript interfaces in components if new fields

---

**Last Updated**: Jan 2026 | See [PRISMA_CMS_SETUP.md](../../PRISMA_CMS_SETUP.md) & [CMS_SETUP.md](../../CMS_SETUP.md) for detailed setup steps.
