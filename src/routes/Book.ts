import express from "express";
import { BookController } from "@Controllers/BookController";

const BookInstance = new BookController();

const BookRoute  = express.Router();

BookRoute.post('/books', BookInstance.createBook);
BookRoute.get('/books', BookInstance.getAllBooks);
BookRoute.get('/books/:id', BookInstance.getBookById);
BookRoute.put('/books/:id', BookInstance.updateBook);
BookRoute.delete('/books/:id', BookInstance.deleteBook);
BookRoute.get('/books/author/:id', BookInstance.getBooksByAuthorId);

export default BookRoute;