import { BookstoreError } from "../errors";
import prisma from "../prismaClient";
import { ErrorCodes, BookCreate, BookUpdate } from "../types";

export async function getAllBooks() {
  return await prisma.book.findMany();
}

export async function getBookById(bookId: number) {
  const book = await prisma.book.findUnique({ where: { id: bookId } });

  if (!book) {
    throw new BookstoreError(
      ErrorCodes.NOT_FOUND,
      `Book with id: ${bookId} was not found.`,
    );
  }

  return book;
}

// TODO: improve error handling here and below.
export async function addBook(data: BookCreate) {
  return await prisma.book.create({ data });
}

export async function updateBook(bookId: number, data: BookUpdate) {
  return await prisma.book.update({
    where: { id: bookId },
    data: { ...data, updated_at: new Date() },
  });
}

export async function deleteBook(bookId: number) {
  return await prisma.book.delete({ where: { id: bookId } });
}
