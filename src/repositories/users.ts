import { BookstoreError } from "../errors";
import prisma from "../prismaClient";
import { ErrorCodes, UserCreate, UserUpdate, BillCreate } from "../types";

export async function getAllUsers() {
  return prisma.user.findMany();
}

export async function getUserById(userId: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new BookstoreError(
      ErrorCodes.NOT_FOUND,
      `User with id: ${userId} was not found.`,
    );
  }

  return user;
}

// TODO: improve error handling here and below.
export async function addUser(data: UserCreate) {
  return prisma.user.create({ data: data });
}

export async function updateUser(userId: number, data: UserUpdate) {
  return prisma.user.update({
    where: { id: userId },
    data: { ...data, updated_at: new Date() },
  });
}

export async function deleteUser(userId: number) {
  return prisma.user.delete({ where: { id: userId } });
}

export async function newPurchase(userId: number, data: BillCreate) {
  const now = new Date();

  return prisma.bill.create({
    data: {
      user_id: userId,
      billing_address: data.billing_address,
      date: now,
      billItems: {
        create: data.books.map((bookPurchaseInfo) => ({
          book_id: bookPurchaseInfo.book_id,
          quantity: bookPurchaseInfo.quantity,
          created_at: now,
          updated_at: now,
        })),
      },
    },
    include: {
      billItems: {
        select: {
          id: true,
          book_id: true,
          quantity: true,
        },
      },
    },
  });
}
