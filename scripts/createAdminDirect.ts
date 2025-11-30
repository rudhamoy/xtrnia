import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log('Creating admin user for Xtrnia CMS\n');

    const username = 'admin';
    const password = 'admin123';

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { username },
    });

    if (existingAdmin) {
      console.log(`Admin user "${username}" already exists!`);

      // Update password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await prisma.admin.update({
        where: { id: existingAdmin.id },
        data: { password: hashedPassword },
      });

      console.log(`\nPassword updated successfully for admin: ${username}`);
    } else {
      // Create new admin
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await prisma.admin.create({
        data: {
          username,
          password: hashedPassword,
        },
      });

      console.log(`\nAdmin user created successfully!`);
      console.log(`Username: ${username}`);
      console.log(`Password: ${password}`);
    }

    console.log('\nYou can now login at: http://localhost:3000/admin/login');

  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
