# Xtrnia CMS Setup Guide

This guide will help you set up and use the Xtrnia CMS dashboard to manage competitions.

## Features

The CMS allows you to:
- Create new competitions (upcoming or current)
- Edit existing competitions
- Delete competitions
- Toggle competition status (active/inactive)
- Manage competition order for display
- Dynamic homepage that fetches competitions from MongoDB

## Prerequisites

Before you begin, make sure you have:
- Node.js (v20.9.0 or higher recommended)
- MongoDB installed locally or a MongoDB Atlas account

## Setup Instructions

### 1. Install MongoDB Locally (if not already installed)

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu/Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**Windows:**
Download and install from [MongoDB Official Website](https://www.mongodb.com/try/download/community)

### 2. Configure Environment Variables

The `.env.local` file has been updated with the following variables:

```env
# Existing variables
NEXT_PUBLIC_GOOGLE_WEB_ID="..."
DEP_ID="..."

# MongoDB Configuration
MONGODB_URI="mongodb://localhost:27017/xtrnia"

# JWT Secret (IMPORTANT: Change this in production!)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

**Important:** For production, generate a strong JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Install Dependencies

Dependencies have already been installed, but if you need to reinstall:
```bash
npm install
```

### 4. Create an Admin User

Run the admin creation script:
```bash
npm run create-admin
```

Follow the prompts to create your admin credentials:
- Enter a username (e.g., "admin")
- Enter a secure password

**Remember these credentials** - you'll need them to log into the CMS dashboard.

### 5. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Using the CMS

### Access the Admin Dashboard

1. Navigate to `http://localhost:3000/admin/login`
2. Enter your admin credentials
3. Click "Sign In"

### Managing Competitions

#### Create a New Competition

1. Click "Add Competition" button
2. Fill in the form:
   - **Competition Name**: e.g., "TUG-OF-WAR"
   - **Badge**: Location badge (e.g., "INTER-SCHOOL\n(BENGALURU)")
   - **Date**: Event date (e.g., "JANUARY 27, 2026")
   - **Image Path**: Path to image (e.g., "/tug-of-war.jpg")
   - **Category**: Participant category (e.g., "(CLASS vs CLASS)\n(CLASS 1 - 12)")
   - **Min Class**: Minimum eligible class (1-12)
   - **Max Class**: Maximum eligible class (1-12)
   - **Prizes**: Enter 4 prize entries:
     - Prize header (e.g., "Price For Every Class")
     - 1st prize amount
     - 2nd prize amount
     - 3rd prize amount
   - **Type**: Choose "current" or "upcoming"
   - **Status**: Choose "active" or "inactive"
   - **Display Order**: Number for sorting (lower numbers appear first)
3. Click "Create Competition"

#### Edit a Competition

1. Find the competition card in the dashboard
2. Click the "Edit" button
3. Modify the fields as needed
4. Click "Update Competition"

#### Delete a Competition

1. Find the competition card in the dashboard
2. Click the "Delete" button
3. Confirm the deletion

### Competition Types

- **Current Competition**: Displays in the "Current Competition" section with detailed instructions
- **Upcoming Competitions**: Displays in the "Upcoming Competitions" grid

### Competition Status

- **Active**: Visible on the homepage
- **Inactive**: Hidden from the homepage but still in database

## API Endpoints

The CMS provides the following API endpoints:

### Public Endpoints
- `GET /api/competitions` - Fetch all competitions
  - Query params: `type` (current/upcoming), `status` (active/inactive)
- `GET /api/competitions/[id]` - Fetch single competition by ID

### Protected Endpoints (Admin Only)
- `POST /api/competitions` - Create new competition
- `PUT /api/competitions/[id]` - Update competition
- `DELETE /api/competitions/[id]` - Delete competition

### Authentication Endpoints
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/verify` - Verify authentication

## File Structure

```
xtrnia/
├── app/
│   ├── admin/
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Admin dashboard UI
│   │   └── login/
│   │       └── page.tsx           # Admin login page
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts    # Login API
│   │   │   ├── logout/route.ts   # Logout API
│   │   │   └── verify/route.ts   # Verify token API
│   │   └── competitions/
│   │       ├── route.ts           # CRUD API
│   │       └── [id]/route.ts      # Single competition API
│   ├── components/
│   │   └── CompetitionsSection.tsx # Dynamic competition components
│   └── page.tsx                   # Homepage (now dynamic)
├── lib/
│   └── mongodb.ts                 # MongoDB connection
├── models/
│   ├── Admin.ts                   # Admin user model
│   └── Competition.ts             # Competition model
├── scripts/
│   └── createAdmin.ts             # Admin creation script
└── .env.local                     # Environment variables
```

## Troubleshooting

### MongoDB Connection Issues

If you see MongoDB connection errors:
1. Make sure MongoDB is running:
   ```bash
   # macOS
   brew services list

   # Linux
   sudo systemctl status mongodb
   ```
2. Check the `MONGODB_URI` in `.env.local`
3. Try connecting to MongoDB directly:
   ```bash
   mongosh mongodb://localhost:27017/xtrnia
   ```

### Admin Login Issues

If you can't log in:
1. Recreate the admin user:
   ```bash
   npm run create-admin
   ```
2. When prompted, choose to update the existing admin password

### Page Not Loading Competitions

If competitions don't appear on the homepage:
1. Check that MongoDB is running
2. Create at least one competition in the CMS
3. Make sure the competition status is set to "active"
4. Check browser console for errors

## Production Deployment

Before deploying to production:

1. **Update JWT Secret**: Generate a strong secret key
2. **Use MongoDB Atlas**: Create a cloud database
3. **Update MONGODB_URI**: Point to your production database
4. **Secure Admin Credentials**: Use strong passwords
5. **Enable HTTPS**: Ensure secure cookie transmission

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Update `.env.local`:
   ```env
   MONGODB_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/xtrnia?retryWrites=true&w=majority"
   ```

## Security Considerations

- Admin credentials are hashed using bcrypt
- JWT tokens are stored in HTTP-only cookies
- All admin endpoints require authentication
- Passwords are never stored in plain text
- Change default JWT secret in production

## Support

For issues or questions:
- Check the troubleshooting section above
- Review the code in the `app/admin` directory
- Contact: admin@xtrnia.com

---

**Created with Claude Code** 🤖
