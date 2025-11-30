import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as readline from 'readline';

const prisma = new PrismaClient();

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function createAdmin() {
  try {
    console.log('Creating admin user for Xtrnia CMS\n');

    // Get admin credentials
    const username = await question('Enter admin username: ');
    const password = await question('Enter admin password: ');

    if (!username || !password) {
      console.log('Username and password are required!');
      process.exit(1);
    }

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { username },
    });

    if (existingAdmin) {
      console.log(`\nAdmin user "${username}" already exists!`);
      const overwrite = await question('Do you want to update the password? (yes/no): ');

      if (overwrite.toLowerCase() !== 'yes') {
        console.log('Operation cancelled.');
        process.exit(0);
      }

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
    }

    console.log('\nYou can now login at: http://localhost:3000/admin/login');

  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    rl.close();
    await prisma.$disconnect();
    process.exit(0);
  }
}

createAdmin();
