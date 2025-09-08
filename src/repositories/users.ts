import { BookstoreError } from "../errors";
import prisma from "../prismaClient";
import { ErrorCodes, UserCreate, UserUpdate } from "../types";

export async function getAllUsers() {
  return await prisma.user.findMany();
}

export async function getUserById(userId: number) {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (user === undefined) {
      throw new BookstoreError(
        ErrorCodes.NOT_FOUND,
        `User with id: ${userId} was not found.`,
      );
    }

    return user;
  } catch {
    throw new BookstoreError(ErrorCodes.SERVER_ERROR);
  }
}

// TODO: improve error handling here and below.
export async function addUser(data: UserCreate) {
  try {
    return await prisma.user.create({ data: data });
  } catch {
    throw new BookstoreError(ErrorCodes.SERVER_ERROR);
  }
}

export async function updateUser(userId: number, data: UserUpdate) {
  try {
    return await prisma.user.update({
      where: { id: userId },
      data: data,
    });
  } catch {
    throw new BookstoreError(ErrorCodes.SERVER_ERROR);
  }
}

export async function deleteUser(userId: number) {
  try {
    return await prisma.user.delete({ where: { id: userId } });
  } catch {
    throw new BookstoreError(ErrorCodes.SERVER_ERROR);
  }
}
