import express from "express";
import { BookController } from "@Controllers/BookController";
import { validateId } from '@Middleware/validateId';
import {authenticateToken} from '@Middleware/authenticateToken';

const BookInstance = new BookController();

const BookRoute  = express.Router();

BookRoute.post('/books', [authenticateToken], BookInstance.createBook);
BookRoute.get('/books', BookInstance.getAllBooks);
BookRoute.get('/books/:id', [validateId], BookInstance.getBookById);
BookRoute.put('/books/:id', [authenticateToken, validateId], BookInstance.updateBook);
BookRoute.delete('/books/:id', [authenticateToken, validateId], BookInstance.deleteBook);
BookRoute.get('/books/author/:id', [validateId], BookInstance.getBooksByAuthorId);

export default BookRoute;