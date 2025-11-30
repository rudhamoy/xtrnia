import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import * as path from 'path';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface Competition {
  name: string;
  badge: string;
  date: string;
  image: string;
  category: string;
  minClass: number;
  maxClass: number;
  prizes: string[];
  type: string;
  status: string;
  order: number;
}

interface SeedData {
  competitions: Competition[];
}

async function uploadImageToCloudinary(imagePath: string): Promise<string> {
  try {
    // Remove leading slash if present
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    const localImagePath = path.join(process.cwd(), 'public', cleanPath);

    // Check if file exists
    if (!fs.existsSync(localImagePath)) {
      console.log(`⚠️  Image not found: ${localImagePath}`);
      return imagePath; // Return original path if image doesn't exist
    }

    console.log(`📤 Uploading: ${cleanPath}...`);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(localImagePath, {
      folder: 'xtrnia/competitions',
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });

    console.log(`✅ Uploaded: ${result.secure_url}`);
    return result.secure_url;

  } catch (error) {
    console.error(`❌ Error uploading ${imagePath}:`, error);
    return imagePath; // Return original path on error
  }
}

async function migrateImages() {
  try {
    console.log('🚀 Starting image migration to Cloudinary...\n');

    // Check Cloudinary config
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('❌ Cloudinary credentials not found in environment variables!');
      console.error('Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.local');
      process.exit(1);
    }

    // Read seed data
    const seedDataPath = path.join(process.cwd(), 'prisma', 'seed-data.json');
    const seedData: SeedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'));

    console.log(`📋 Found ${seedData.competitions.length} competitions to process\n`);

    // Track unique images to avoid duplicate uploads
    const imageMap = new Map<string, string>();

    // Upload images and update URLs
    for (let i = 0; i < seedData.competitions.length; i++) {
      const competition = seedData.competitions[i];
      console.log(`\n[${i + 1}/${seedData.competitions.length}] Processing: ${competition.name}`);

      // Check if we've already uploaded this image
      if (imageMap.has(competition.image)) {
        console.log(`♻️  Using cached URL for: ${competition.image}`);
        seedData.competitions[i].image = imageMap.get(competition.image)!;
      } else {
        // Upload new image
        const cloudinaryUrl = await uploadImageToCloudinary(competition.image);
        imageMap.set(competition.image, cloudinaryUrl);
        seedData.competitions[i].image = cloudinaryUrl;
      }
    }

    // Save updated seed data
    const updatedSeedDataPath = path.join(process.cwd(), 'prisma', 'seed-data.json');
    fs.writeFileSync(updatedSeedDataPath, JSON.stringify(seedData, null, 2), 'utf-8');

    console.log('\n✨ Migration complete!');
    console.log(`📊 Summary:`);
    console.log(`   - Total competitions: ${seedData.competitions.length}`);
    console.log(`   - Unique images uploaded: ${imageMap.size}`);
    console.log(`   - Seed data updated: ${updatedSeedDataPath}`);
    console.log('\n💡 Next steps:');
    console.log('   1. Run: npm run seed (to update database with new Cloudinary URLs)');
    console.log('   2. Your images are now hosted on Cloudinary!');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateImages();
