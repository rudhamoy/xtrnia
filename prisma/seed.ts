import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Read seed data
  const seedDataPath = path.join(__dirname, 'seed-data.json');
  const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'));

  // Clear existing competitions
  console.log('🗑️  Clearing existing competitions...');
  await prisma.competition.deleteMany({});
  console.log('✅ Cleared existing competitions\n');

  // Seed competitions
  console.log('📝 Seeding competitions...');
  let count = 0;

  for (const comp of seedData.competitions) {
    await prisma.competition.create({
      data: {
        name: comp.name,
        badge: comp.badge,
        date: comp.date,
        image: comp.image,
        category: comp.category,
        minClass: comp.minClass,
        maxClass: comp.maxClass,
        prizes: JSON.stringify(comp.prizes), // Store as JSON string
        type: comp.type,
        status: comp.status,
        order: comp.order,
      },
    });
    count++;
    console.log(`  ✓ Added ${comp.name} (${comp.type})`);
  }

  console.log(`\n✅ Successfully seeded ${count} competitions!\n`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
