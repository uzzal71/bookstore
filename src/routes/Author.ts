import express from "express";
import { AuthorController } from "@Controllers/AuthorController";
import { validateId } from '@Middleware/validateId';
import {authenticateToken} from '@Middleware/authenticateToken';

const AuthorInstance = new AuthorController();

const AuthorRoute  = express.Router();

AuthorRoute.post('/authors', [authenticateToken], AuthorInstance.createAuthor);
AuthorRoute.get('/authors/:page/:per_page', AuthorInstance.getAllAuthors);
AuthorRoute.get('/authors/:id', [validateId], AuthorInstance.getAuthorById);
AuthorRoute.put('/authors/:id', [authenticateToken, validateId], AuthorInstance.updateAuthor);
AuthorRoute.delete('/authors/:id', [authenticateToken, validateId], AuthorInstance.deleteAuthor);
AuthorRoute.get('/authors/:id/books', [authenticateToken, validateId], AuthorInstance.getBooksByAuthor);

export default AuthorRoute;