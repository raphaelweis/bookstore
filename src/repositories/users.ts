import prisma from "../prismaClient";
import { UserCreate, UserUpdate } from "../types";

export async function getAllUsers() {
  return await prisma.user.findMany();
}

export async function getUserById(userId: number) {
  return await prisma.user.findUnique({ where: { id: userId } });
}

export async function addUser(data: UserCreate) {
  return prisma.user.create({ data: data });
}

export async function updateUser(userId: number, data: UserUpdate) {
  return prisma.user.update({
    where: { id: userId },
    data: data,
  });
}

export async function deleteUser(userId: number) {
  return prisma.user.delete({ where: { id: userId } });
}
