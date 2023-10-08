import { hashSync } from 'bcrypt';
import { BasicRole, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const admin = {
  email: 'user@admin.app',
  username: 'admin',
  password: hashSync('Admin@123', 3),
};

const main = async () => {
  await prisma.auth.upsert({
    where: { email: admin.email },
    create: {
      ...admin,
      role: BasicRole.ADMIN,
    },
    update: {},
  });
};

main().then(async () => {
  await prisma.$disconnect();
});
