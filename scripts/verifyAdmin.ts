import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyAdmin() {
  try {
    const admins = await prisma.admin.findMany();
    console.log('Total admins:', admins.length);

    admins.forEach(admin => {
      console.log('\nAdmin found:');
      console.log('  ID:', admin.id);
      console.log('  Username:', admin.username);
      console.log('  Created:', admin.createdAt);
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyAdmin();
