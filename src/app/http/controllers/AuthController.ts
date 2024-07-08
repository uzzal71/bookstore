import { Request, Response } from 'express';
import { ResponseSuccess, ResponseError } from '@Utils/HttpResponse';
import { validateRequest } from '@Utils/requestValidation';
import { AuthService } from '@Services/AuthService';
import { AuthRequest, SigninRequest, UpdateUserRequest } from '@Requests/AuthRequest';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    signup = async (_req: Request, res: Response) => {
        try {
            await validateRequest(AuthRequest, _req, res);
            const userData = _req.body;
            const user = await this.authService.signup(userData);
            return ResponseSuccess(res, 201, 'User signed up successfully.', {user: {id: user.id, username: user.username, status: user.status}});
        } catch (error: any) {
            return ResponseError(res, error.statusCode, error.message);
        }
    }

    signin = async (_req: Request, res: Response) => {
        try {
            await validateRequest(SigninRequest, _req, res);
            const { username, password } = _req.body;
            const { token, user, author } = await this.authService.signin(username, password);
            return ResponseSuccess(res, 200, 'User signed in successfully.', { token, user, author });
        } catch (error: any) {
            return ResponseError(res, error.statusCode, error.message);
        }
    }

    getUserById = async (req: Request, res: Response) =>{
        try {
            const userId = parseInt(req.params.id, 10);
            const user = await this.authService.getUserById(userId);
            if (!user) {
                throw new Error('User not found.');
            }
            return ResponseSuccess(res, 200, 'User fetched successfully.', {user: {id: user.id, username: user.username, status: user.status}});
        } catch (error: any) {
            return ResponseError(res, error.statusCode, error.message);
        }
    }

    updateUser = async(req: Request, res: Response) => {
        try {
            await validateRequest(UpdateUserRequest, req, res);
            const userId = parseInt(req.params.id, 10);
            const userData = req.body;
            const user = await this.authService.updateUser(userId, userData);
            if (!user) {
                throw new Error('User update failed.');
            }
            return ResponseSuccess(res, 200, 'User updated successfully.', {user: {id: user.id, username: user.username, status: user.status}});
        } catch (error: any) {
            return ResponseError(res, error.statusCode, error.message);
        }
    }

    deleteUser = async(req: Request, res: Response) => {
        try {
            const userId = parseInt(req.params.id, 10);
            const deleted = await this.authService.deleteUser(userId);
            if (!deleted) {
                throw new Error('User deletion failed.');
            }
            return ResponseSuccess(res, 200, 'User deleted successfully.', {user: {id: userId}});
        } catch (error: any) {
            return ResponseError(res, error.statusCode, error.message);
        }
    }
}
