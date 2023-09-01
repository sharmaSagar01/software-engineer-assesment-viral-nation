import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: 'User 1',
      email: 'user1@example.com',
      password: 'password1', // Hash this password in a real application
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'User 2',
      email: 'user2@example.com',
      password: 'password2', // Hash this password in a real application
    },
  });

  // Create movies
  const movie1 = await prisma.movie.create({
    data: {
      title: 'Movie 1',
      description: 'Description of Movie 1',
      directorName: 'Director 1',
      releaseDate: new Date('2023-08-30'),
      user: {
        connect: {
          id: user2.id,
        },
      },
    },
  });

  const movie2 = await prisma.movie.create({
    data: {
      title: 'Movie 2',
      description: 'Description of Movie 2',
      directorName: 'Director 2',
      releaseDate: new Date('2023-08-31'),
      user: {
        connect: {
          id: user2.id,
        },
      },
    },
  });

  console.log('Data seeded successfully');
}

main()
  .catch((error) => {
    console.error('Error seeding data:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
