import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library";
import { BookstoreError } from "../middlewares/errors";
import prisma from "../prismaClient";
import { BookCreate, BookUpdate } from "../schemas/book";
import {
  HTTPErrorCodes,
  PRISMA_ERROR_CODES,
} from "../types";

export async function getAllBooks() {
  return prisma.book.findMany();
}

export async function getBookById(bookId: number) {
  const book = await prisma.book.findUnique({ where: { id: bookId } });

  if (!book) {
    throw new BookstoreError(
      HTTPErrorCodes.NOT_FOUND,
      `Book with id: '${bookId}' was not found.`,
    );
  }

  return book;
}

export async function addBook(data: BookCreate) {
  try {
    return await prisma.book.create({ data });
  } catch (e) {
    if (
      e instanceof PrismaClientKnownRequestError &&
      e.code === PRISMA_ERROR_CODES.CONFLICT
    ) {
      throw new BookstoreError(
        HTTPErrorCodes.CONFLICT,
        `A book with title: '${data.title}' and author: '${data.author}' already exists.`,
      );
    } else throw e;
  }
}

export async function updateBook(bookId: number, data: BookUpdate) {
  try {
    return await prisma.book.update({
      where: { id: bookId },
      data: { ...data, updated_at: new Date() },
    });
  } catch (e) {
    if (
      e instanceof PrismaClientKnownRequestError &&
      e.code === PRISMA_ERROR_CODES.NOT_FOUND
    ) {
      throw new BookstoreError(
        HTTPErrorCodes.NOT_FOUND,
        `Book with id: '${bookId}' was not found`,
      );
    } else throw e;
  }
}

export async function deleteBook(bookId: number) {
  try {
    return prisma.book.delete({ where: { id: bookId } });
  } catch (e) {
    if (
      e instanceof PrismaClientKnownRequestError &&
      e.code === PRISMA_ERROR_CODES.NOT_FOUND
    ) {
      throw new BookstoreError(
        HTTPErrorCodes.NOT_FOUND,
        `Book with id: '${bookId}' was not found`,
      );
    } else throw e;
  }
}
