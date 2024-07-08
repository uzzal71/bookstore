import express from "express";
import { AuthController } from "@Controllers/AuthController";
import { validateId } from '@Middleware/validateId';
import {authenticateToken} from '@Middleware/authenticateToken';
import { authorizeUser } from '@Middleware/authorizeUser';

const AuthInstance = new AuthController();

const AuthRoute  = express.Router();

AuthRoute.post('/signup', AuthInstance.signup);
AuthRoute.post('/signin', AuthInstance.signin);
AuthRoute.get('/profile/:id', [authenticateToken, validateId, authorizeUser], AuthInstance.getUserById);
AuthRoute.put('/profile/:id', [authenticateToken, validateId, authorizeUser], AuthInstance.updateUser);
AuthRoute.delete('/profile/:id', [authenticateToken, validateId, authorizeUser], AuthInstance.deleteUser);

export default AuthRoute;