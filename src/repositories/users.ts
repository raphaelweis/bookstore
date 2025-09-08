import { BookstoreError } from "../errors";
import prisma from "../prismaClient";
import { ErrorCodes, UserCreate, UserUpdate } from "../types";

export async function getAllUsers() {
  return await prisma.user.findMany();
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
  return await prisma.user.create({ data: data });
}

export async function updateUser(userId: number, data: UserUpdate) {
  return await prisma.user.update({
    where: { id: userId },
    data: { ...data, updated_at: new Date() },
  });
}

export async function deleteUser(userId: number) {
  return await prisma.user.delete({ where: { id: userId } });
}
