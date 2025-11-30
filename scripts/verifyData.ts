import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyData() {
  try {
    // Check admins
    const admins = await prisma.admin.findMany();
    console.log('=== ADMINS ===');
    console.log('Total admins:', admins.length);
    admins.forEach(admin => {
      console.log(`  - ${admin.username} (ID: ${admin.id})`);
    });

    // Check competitions
    const competitions = await prisma.competition.findMany({
      orderBy: [{ type: 'asc' }, { order: 'asc' }]
    });
    console.log('\n=== COMPETITIONS ===');
    console.log('Total competitions:', competitions.length);

    const current = competitions.filter(c => c.type === 'current');
    const upcoming = competitions.filter(c => c.type === 'upcoming');

    console.log('\nCurrent competitions:', current.length);
    current.forEach(comp => {
      console.log(`  - ${comp.name} (${comp.date})`);
    });

    console.log('\nUpcoming competitions:', upcoming.length);
    upcoming.forEach(comp => {
      console.log(`  - ${comp.name} (${comp.date})`);
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyData();
