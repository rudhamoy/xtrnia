import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyMigration() {
  try {
    const competitions = await prisma.competition.findMany({
      orderBy: [{ type: 'asc' }, { order: 'asc' }]
    });

    console.log('=== CLOUDINARY MIGRATION VERIFICATION ===\n');
    console.log(`Total competitions: ${competitions.length}\n`);

    competitions.forEach((comp, index) => {
      console.log(`[${index + 1}] ${comp.name} (${comp.type})`);
      console.log(`    Image URL: ${comp.image}`);
      console.log(`    Hosted on Cloudinary: ${comp.image.includes('cloudinary.com') ? '✅ YES' : '❌ NO (still local)'}`);
      console.log('');
    });

    const cloudinaryCount = competitions.filter(c => c.image.includes('cloudinary.com')).length;
    const localCount = competitions.filter(c => !c.image.includes('cloudinary.com')).length;

    console.log('=== SUMMARY ===');
    console.log(`✅ Cloudinary-hosted images: ${cloudinaryCount}`);
    console.log(`❌ Local images: ${localCount}`);
    console.log('');

    if (localCount === 0) {
      console.log('🎉 All images successfully migrated to Cloudinary!');
    } else {
      console.log('⚠️  Some images are still using local paths. Run: npm run migrate-images');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyMigration();
