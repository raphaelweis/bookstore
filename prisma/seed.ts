import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Users
  await prisma.user.upsert({
    where: { email: "alice@mail.com" },
    update: {},
    create: {
      id: 1,
      email: "alice@mail.com",
      name: "Alice",
    },
  });
  await prisma.user.upsert({
    where: { email: "bob@mail.com" },
    update: {},
    create: {
      id: 2,
      email: "bob@mail.com",
      name: "Bob",
    },
  });

  // Books
  await prisma.book.upsert({
    where: {
      author_title: {
        author: "J.K. Rowling",
        title: "Harry Potter and the Sorcerer's Stone",
      },
    },
    update: {},
    create: {
      id: 1,
      author: "J.K. Rowling",
      title: "Harry Potter and the Sorcerer's Stone",
      publishing_date: "1997",
      price: 9.99,
    },
  });
  await prisma.book.upsert({
    where: {
      author_title: {
        author: "J.K. Rowling",
        title: "Harry Potter and the Chamber of Secrets",
      },
    },
    update: {},
    create: {
      id: 2,
      author: "J.K. Rowling",
      title: "Harry Potter and the Chamber of Secrets",
      publishing_date: "1998",
      price: 9.99,
    },
  });
  await prisma.book.upsert({
    where: {
      author_title: {
        author: "J.K. Rowling",
        title: "Harry Potter and the Prisoner of Azkaban",
      },
    },
    update: {},
    create: {
      id: 3,
      author: "J.K. Rowling",
      title: "Harry Potter and the Prisoner of Azkaban",
      publishing_date: "1999",
      price: 9.99,
    },
  });

  // Bills
  const now = new Date();
  await prisma.bill.upsert({
    where: { id: 1 },
    update: {},
    create: {
      user_id: 1,
      billing_address: "4 Privet Drive",
      date: now,
      billItems: {
        createMany: {
          data: [
            { id: 1, book_id: 1, quantity: 1 },
            { id: 2, book_id: 2, quantity: 2 },
            { id: 3, book_id: 3, quantity: 3 },
          ],
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
