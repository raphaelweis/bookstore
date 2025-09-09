import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library";
import { BookstoreError } from "../middlewares/errors";
import prisma from "../prismaClient";
import { BillCreate } from "../schemas/bill";
import {  UserCreate, UserUpdate } from "../schemas/user";
import { HTTPErrorCodes, PRISMA_ERROR_CODES } from "../types";

export async function getAllUsers() {
  return prisma.user.findMany();
}

export async function getUserById(userId: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new BookstoreError(
      HTTPErrorCodes.NOT_FOUND,
      `User with id: '${userId}' was not found.`,
    );
  }

  return user;
}

export async function addUser(data: UserCreate) {
  try {
    return await prisma.user.create({ data: data });
  } catch (e) {
    if (
      e instanceof PrismaClientKnownRequestError &&
      e.code === PRISMA_ERROR_CODES.CONFLICT
    ) {
      throw new BookstoreError(
        HTTPErrorCodes.CONFLICT,
        `A user with email: '${data.email}' already exists.`,
      );
    } else throw e;
  }
}

export async function updateUser(userId: number, data: UserUpdate) {
  try {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
  } catch (e) {
    if (
      e instanceof PrismaClientKnownRequestError &&
      e.code === PRISMA_ERROR_CODES.NOT_FOUND
    ) {
      throw new BookstoreError(
        HTTPErrorCodes.NOT_FOUND,
        `User with id: '${userId}' was not found`,
      );
    } else throw e;
  }
}

export async function deleteUser(userId: number) {
  try {
    return await prisma.user.delete({ where: { id: userId } });
  } catch (e) {
    if (
      e instanceof PrismaClientKnownRequestError &&
      e.code === PRISMA_ERROR_CODES.NOT_FOUND
    ) {
      throw new BookstoreError(
        HTTPErrorCodes.NOT_FOUND,
        `User with id: ${userId} was not found`,
      );
    } else throw e;
  }
}

export async function newPurchase(userId: number, data: BillCreate) {
  try {
    const now = new Date();

    return await prisma.bill.create({
      data: {
        user_id: userId,
        billing_address: data.billing_address,
        date: now,
        billItems: {
          createMany: {
            data: [
              ...data.books.map((bookPurchaseInfo) => ({
                book_id: bookPurchaseInfo.book_id,
                quantity: bookPurchaseInfo.quantity,
                created_at: now,
                updated_at: now,
              })),
            ],
          },
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
  } catch (e) {
    // TODO: see if this can be improved.
    if (
      e instanceof PrismaClientKnownRequestError &&
      e.code === PRISMA_ERROR_CODES.FOREIGN_KEY_NOT_FOUND
    ) {
      switch (e.meta?.constraint) {
        case "BillItem_book_id_fkey": {
          throw new BookstoreError(
            HTTPErrorCodes.NOT_FOUND,
            `One or multiple book ids are invalid!`,
          );
        }
        case "Bill_user_id_fkey": {
          throw new BookstoreError(
            HTTPErrorCodes.NOT_FOUND,
            `User with id: '${userId}' was not found.`,
          );
        }
      }
    } else throw e;
  }
}
