# Xtrnia CMS Setup Guide (Prisma Edition)

This guide will help you set up and use the Xtrnia CMS dashboard to manage competitions using **Prisma** as the ORM with **SQLite** for local development.

## Features

The CMS allows you to:
- Create new competitions (upcoming or current)
- Edit existing competitions
- Delete competitions
- Toggle competition status (active/inactive)
- Manage competition order for display
- Dynamic homepage that fetches competitions from the database
- Seed database with predefined competitions from JSON

## Tech Stack

- **Next.js 15** - React framework
- **Prisma 5** - ORM for database management
- **SQLite** - Local database (easily upgradable to PostgreSQL for production)
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Styling

## Setup Instructions

### 1. Install Dependencies

Dependencies should already be installed. If not:
```bash
npm install
```

### 2. Database Setup

The project uses SQLite for local development. The database file is created automatically.

**Configuration is already done!** Check `.env.local`:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

### 3. Run Prisma Migrations

This creates the database tables:
```bash
npx prisma migrate dev
```

### 4. Seed the Database

Populate the database with the hardcoded competitions from your original page:
```bash
npm run seed
```

This will create:
- 1 current competition (Tug-of-War Bengaluru)
- 7 upcoming competitions (Tug-of-War, Kabaddi, Volleyball, Football, Handball, Softball, Basketball)

### 5. Create an Admin User

```bash
npm run create-admin
```

Follow the prompts:
- Enter a username (e.g., "admin")
- Enter a secure password

**Remember these credentials!**

### 6. Start the Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

## Using the CMS

### Access the Admin Dashboard

1. Go to: `http://localhost:3000/admin/login`
2. Enter your admin credentials
3. Click "Sign In"

### Manage Competitions

#### View All Competitions
The dashboard shows competitions organized by type:
- Current Competitions
- Upcoming Competitions

#### Create a New Competition

1. Click "Add Competition"
2. Fill in the form:
   - **Competition Name**: e.g., "TUG-OF-WAR"
   - **Badge**: e.g., "INTER-SCHOOL\n(BENGALURU)"
   - **Date**: e.g., "JANUARY 27, 2026"
   - **Image Path**: e.g., "/tug-of-war.jpg"
   - **Category**: e.g., "(CLASS vs CLASS)\n(CLASS 1 - 12)"
   - **Min Class**: 1-12
   - **Max Class**: 1-12
   - **Prizes**: 4 entries
     - Prize header
     - 1st prize
     - 2nd prize
     - 3rd prize
   - **Type**: "current" or "upcoming"
   - **Status**: "active" or "inactive"
   - **Display Order**: Number for sorting
3. Click "Create Competition"

#### Edit a Competition

1. Find the competition card
2. Click "Edit"
3. Modify fields
4. Click "Update Competition"

#### Delete a Competition

1. Find the competition card
2. Click "Delete"
3. Confirm deletion

## Available Scripts

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run database seed
npm run seed

# Create admin user
npm run create-admin

# Open Prisma Studio (visual database editor)
npx prisma studio
```

## Database Management

### View Database with Prisma Studio

```bash
npx prisma studio
```

This opens a visual database editor at `http://localhost:5555`

### Reset Database

To clear all data and reseed:
```bash
npx prisma migrate reset
npm run seed
npm run create-admin
```

### Update Schema

If you modify `prisma/schema.prisma`:
```bash
npx prisma migrate dev --name your_migration_name
npx prisma generate
```

## Seed Data

The seed data is stored in `prisma/seed-data.json`. You can:

1. **Edit the seed data**: Modify `prisma/seed-data.json`
2. **Re-seed**: Run `npm run seed`

The seed script automatically:
- Clears existing competitions
- Adds all competitions from the JSON file

## File Structure

```
xtrnia/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts                # Seed script
│   ├── seed-data.json         # Seed data (your hardcoded competitions)
│   ├── migrations/            # Database migrations
│   └── dev.db                 # SQLite database file
├── app/
│   ├── admin/
│   │   ├── dashboard/page.tsx # Admin dashboard
│   │   └── login/page.tsx     # Admin login
│   ├── api/
│   │   ├── auth/              # Authentication routes
│   │   └── competitions/      # CRUD API routes
│   ├── components/
│   │   └── CompetitionsSection.tsx  # Dynamic competition display
│   └── page.tsx               # Homepage (dynamic)
├── lib/
│   └── prisma.ts              # Prisma client singleton
├── scripts/
│   └── createAdmin.ts         # Admin creation script
└── .env.local                 # Environment variables
```

## API Endpoints

### Public Endpoints
- `GET /api/competitions` - Fetch all competitions
  - Query params: `?type=current|upcoming&status=active|inactive`
- `GET /api/competitions/[id]` - Fetch single competition

### Protected Endpoints (Admin Only)
- `POST /api/competitions` - Create competition
- `PUT /api/competitions/[id]` - Update competition
- `DELETE /api/competitions/[id]` - Delete competition

### Auth Endpoints
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/verify` - Verify token

## Production Deployment

### Option 1: Use Prisma's Free PostgreSQL Database

1. The `.env.local` currently has a Prisma database URL commented out
2. Uncomment and use it, or get a new one at [Prisma Data Platform](https://console.prisma.io/)

### Option 2: Use Any PostgreSQL Provider

Update `.env.local`:
```env
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
```

Then:
```bash
npx prisma migrate deploy
npm run seed
npm run create-admin
```

### Option 3: Keep SQLite (Good for Small Projects)

SQLite works fine for production if you don't need concurrent writes. Just deploy the `dev.db` file with your app.

### Important: Change JWT Secret

```bash
# Generate a secure secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Update `.env.local` with the generated secret.

## Troubleshooting

### Database Connection Issues

If you see Prisma errors:
```bash
npx prisma generate
npx prisma migrate dev
```

### Competitions Not Showing

1. Check that you ran the seed: `npm run seed`
2. Check that competitions are "active" status
3. Open Prisma Studio to inspect: `npx prisma studio`

### Admin Login Issues

Recreate the admin user:
```bash
npm run create-admin
```

### Reset Everything

```bash
# Reset database and reseed
npx prisma migrate reset

# Seed competitions
npm run seed

# Create admin
npm run create-admin
```

## Advantages of Prisma Over MongoDB

✅ **Type Safety** - Full TypeScript support with auto-generated types
✅ **SQL Support** - Use SQLite locally, PostgreSQL in production
✅ **Prisma Studio** - Visual database editor
✅ **Migrations** - Version-controlled database schema
✅ **No Connection Pooling Issues** - Built-in connection management
✅ **Better Performance** - Optimized queries
✅ **Easier Deployment** - Works with Vercel, Railway, etc.

## Support

For issues or questions:
- Check Prisma docs: https://www.prisma.io/docs
- Review the troubleshooting section above
- Contact: admin@xtrnia.com

---

**Built with Prisma & Next.js** 🚀
