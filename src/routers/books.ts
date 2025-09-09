import express from "express";
import { BookCreate, BookUpdate } from "../types";
import * as bookRepository from "../repositories/books";
import { parseDate } from "../utils";

const router = express.Router();

/**
 * Get all books
 */
router.get(`/`, (_req, res, next) => {
  bookRepository
    .getAllBooks()
    .then((allBooks) => res.send(allBooks))
    .catch(next);
});

/**
 * Get a book by ID
 */
router.get(`/:bookId`, (req, res, next) => {
  const bookId = parseInt(req.params.bookId);
  bookRepository
    .getBookById(bookId)
    .then((book) => res.send(book))
    .catch(next);
});

/**
 * Add a new book
 */
// TODO: Add validators to check for correctly formed body.
router.post(`/`, (req, res, next) => {
  const newBookData: BookCreate = {
    ...req.body,
    publishing_date: parseDate(req.body.publishing_date),
  };

  bookRepository
    .addBook(newBookData)
    .then((newBook) => res.send(newBook))
    .catch(next);
});

/**
 * Update the data for an existing book (by ID)
 */
router.patch(`/:bookId`, (req, res, next) => {
  const bookId = parseInt(req.params.bookId);
  const dataToUpdate: BookUpdate = {
    ...req.body,
    publishing_date: req.body.publishing_date
      ? parseDate(req.body.publishing_date)
      : undefined,
  };

  bookRepository
    .updateBook(bookId, dataToUpdate)
    .then((updatedBook) => res.send(updatedBook))
    .catch(next);
});

/**
 * Delete a book by ID
 */
router.delete(`/:bookId`, (req, res, next) => {
  const bookId = parseInt(req.params.bookId);

  bookRepository
    .deleteBook(bookId)
    .then((bookId) => res.send(bookId))
    .catch(next);
});

export default router;
