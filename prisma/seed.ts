import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.category.create({
        data: {
          name: faker.commerce.department(),
        },
      }),
    ),
  );

  // Create authors
  const authors = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.author.create({
        data: {
          name: faker.name.fullName(),
          biography: faker.lorem.paragraph(),
        },
      }),
    ),
  );

  // Create genres
  const genres = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.genre.create({
        data: {
          name: faker.music.genre(),
        },
      }),
    ),
  );

  // Create books
  const books = await Promise.all(
    Array.from({ length: 20 }).map(() =>
      prisma.book.create({
        data: {
          title: faker.lorem.words(3),
          description: faker.lorem.paragraph(),
          price: Number(faker.commerce.price(10, 100, 2)),
          stock: faker.datatype.number({ min: 0, max: 100 }),
          categoryId: categories[faker.datatype.string()].id,
          authorId: authors[faker.datatype.string()].id,
          weight: faker.datatype.float({ min: 0.5, max: 2 }),
          height: faker.datatype.float({ min: 10, max: 30 }),
          width: faker.datatype.float({ min: 5, max: 20 }),
          totalPages: faker.datatype.number({ min: 100, max: 1000 }),
          publisher: faker.company.name(),
          publishedAt: faker.date.past(),
          language: faker.helpers.arrayElement([
            'English',
            'Indonesian',
            'French',
          ]),
        },
      }),
    ),
  );

  // Create book-genre relations
  await Promise.all(
    books.map((book) =>
      prisma.bookGenres.create({
        data: {
          bookId: book.id,
          genreId: genres[faker.datatype.string()].id,
        },
      }),
    ),
  );

  // Create image for books
  await Promise.all(
    books.map((book) =>
      prisma.imageBook.create({
        data: {
          url: faker.image.imageUrl(),
          bookId: book.id,
        },
      }),
    ),
  );

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
