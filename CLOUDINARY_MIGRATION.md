# Cloudinary Image Migration - Complete

## Overview

All competition images have been successfully migrated from local storage (`/public`) to Cloudinary cloud storage. This ensures images will work correctly in production (Vercel/serverless environments).

## Migration Summary

- **Total competitions:** 8
- **Images migrated:** 7 unique images (Tug-of-War image used twice)
- **All competitions now use Cloudinary URLs:** ✅

## Migrated Images

1. **Tug-of-War** (used for 2 competitions)
   - URL: `https://res.cloudinary.com/yomah/image/upload/v1764446550/xtrnia/competitions/lt8tzqhjrkez1mybvved.jpg`

2. **Kabaddi**
   - URL: `https://res.cloudinary.com/yomah/image/upload/v1764446551/xtrnia/competitions/t553z0uwibgbnozj3xhp.jpg`

3. **Volleyball**
   - URL: `https://res.cloudinary.com/yomah/image/upload/v1764446553/xtrnia/competitions/abgxlibhwnm9zcpeivyd.jpg`

4. **Football**
   - URL: `https://res.cloudinary.com/yomah/image/upload/v1764446554/xtrnia/competitions/akoav7l9oimj3qtwtc7j.jpg`

5. **Handball**
   - URL: `https://res.cloudinary.com/yomah/image/upload/v1764446556/xtrnia/competitions/ckdgcjgsufqemsdgmy2c.jpg`

6. **Softball**
   - URL: `https://res.cloudinary.com/yomah/image/upload/v1764446557/xtrnia/competitions/jb0ags7t3hif3p5br8p6.jpg`

7. **Basketball**
   - URL: `https://res.cloudinary.com/yomah/image/upload/v1764446559/xtrnia/competitions/usswyg1eqhrjxtajjbnu.jpg`

## How It Works

### Automatic Migration Script

The migration script (`scripts/migrateImagesToCloudinary.ts`) does the following:

1. Reads the seed data from `prisma/seed-data.json`
2. For each competition image path (e.g., `/tug-of-war.jpg`):
   - Finds the image in `public/` folder
   - Uploads it to Cloudinary in the `xtrnia/competitions` folder
   - Applies optimizations (max 1200x1200, auto quality, auto WebP)
   - Replaces the local path with the Cloudinary URL
3. Saves the updated seed data back to `seed-data.json`
4. Caches uploaded images to avoid duplicate uploads

### Cloudinary Optimizations Applied

All images are automatically optimized:
- **Max dimensions:** 1200x1200 (maintains aspect ratio)
- **Quality:** Auto (Cloudinary's smart compression)
- **Format:** Auto (serves WebP to supported browsers, JPEG to others)

## Scripts Available

### Migrate Images to Cloudinary
```bash
npm run migrate-images
```
- Uploads all competition images from `public/` to Cloudinary
- Updates `prisma/seed-data.json` with Cloudinary URLs
- Smart caching to avoid re-uploading same images

### Verify Migration
```bash
npx dotenv-cli -e .env.local -- tsx scripts/verifyCloudinaryMigration.ts
```
- Shows which images are on Cloudinary vs local
- Displays all image URLs
- Provides migration summary

### Reseed Database
```bash
npm run seed
```
- Clears existing competitions
- Seeds database with data from `seed-data.json` (now with Cloudinary URLs)

## Admin Dashboard Image Upload

The CMS dashboard at `/admin/dashboard` now includes:

1. **Upload Image Button**: Directly upload new images to Cloudinary
2. **Image Preview**: See uploaded images before saving
3. **Auto URL**: Cloudinary URL automatically fills in after upload

When creating/editing a competition:
- Click "Upload Image" button
- Select an image file (max 10MB)
- Wait for upload to complete
- URL field auto-fills with Cloudinary URL
- Preview appears below

## Cloudinary Configuration

Location: `.env.local`

```env
CLOUDINARY_CLOUD_NAME="yomah"
CLOUDINARY_API_KEY="677573329917884"
CLOUDINARY_API_SECRET="z9yP0mbkXFVE4t40EiXZpS0sYsM"
```

### Cloudinary Console

- **Dashboard:** https://console.cloudinary.com/
- **Media Library:** View all uploaded images under `xtrnia/competitions/` folder
- **Usage:** Monitor storage and bandwidth (25GB free tier)

## Production Deployment

No additional steps needed! Since all images are now on Cloudinary:

1. **Vercel/Netlify:** Just deploy - images will load from Cloudinary CDN
2. **No environment changes needed:** Same `.env` variables work in production
3. **Fast global delivery:** Cloudinary CDN serves images from nearest location
4. **Automatic optimizations:** WebP, responsive sizing, etc.

## Benefits

✅ **Production-ready:** Works on serverless platforms (Vercel, Netlify, etc.)
✅ **CDN delivery:** Fast loading worldwide
✅ **Auto-optimization:** WebP, quality compression, responsive sizing
✅ **No server storage:** No need to manage file uploads on server
✅ **Free tier:** 25GB storage + 25GB bandwidth/month
✅ **Image transformations:** Can resize, crop, optimize on-the-fly via URL
✅ **Persistent storage:** Images remain even after redeployments

## File Structure

```
xtrnia/
├── prisma/
│   └── seed-data.json          # Now contains Cloudinary URLs
├── scripts/
│   ├── migrateImagesToCloudinary.ts    # Migration script
│   └── verifyCloudinaryMigration.ts    # Verification script
├── app/
│   ├── api/
│   │   └── upload/route.ts     # Cloudinary upload API endpoint
│   └── admin/
│       └── dashboard/page.tsx  # CMS with image upload UI
└── lib/
    └── cloudinary.ts           # Cloudinary config
```

## Re-running Migration

If you need to migrate images again (e.g., updated images):

```bash
# 1. Update images in public/ folder
# 2. Run migration
npm run migrate-images

# 3. Reseed database
npm run seed

# 4. Verify
npx dotenv-cli -e .env.local -- tsx scripts/verifyCloudinaryMigration.ts
```

## Troubleshooting

### Images not loading in production

- Check that Cloudinary credentials are set in production environment variables
- Verify URLs in database start with `https://res.cloudinary.com/`

### Migration fails

- Ensure Cloudinary credentials are correct in `.env.local`
- Check that images exist in `public/` folder
- Verify internet connection for uploads

### Need to delete images from Cloudinary

1. Go to https://console.cloudinary.com/
2. Navigate to Media Library
3. Find images under `xtrnia/competitions/` folder
4. Select and delete unwanted images

---

**Status:** ✅ All migrations complete and verified!
