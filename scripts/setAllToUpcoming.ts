import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function setAllToUpcoming() {
  try {
    console.log('Setting all competitions to "upcoming"...\n');

    const result = await prisma.competition.updateMany({
      data: {
        type: 'upcoming',
      },
    });

    console.log(`✅ Updated ${result.count} competitions to "upcoming"`);
    console.log('\nNow you can use the toggle switch in the admin dashboard to set any competition as "current"');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setAllToUpcoming();
