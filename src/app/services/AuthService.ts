import { AuthRepository } from '@Repositories/AuthRepository';
import sequelize from '@Config/database';
import { ApiError } from '@Utils/errorHandler';
import { IUser } from '@Entities/IUser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Config from '@Config/index';

export class AuthService {
    repository: AuthRepository;

    constructor() {
        this.repository = new AuthRepository();
    }

    async signup(userData: IUser): Promise<IUser> {
        const transaction = await sequelize.transaction();
        try {
            const existingUser = await this.repository.findOneByProperty({ username: userData.username });
            if (existingUser) throw new ApiError('DATA_CONFLICT', 409, 'User already exists.');

            userData.password = await bcrypt.hash(userData.password, 10);
            const createdUser = await this.repository.create(userData, transaction);
            await transaction.commit();
            return createdUser;
        } catch (error: any) {
            await transaction.rollback();
            throw new ApiError('SIGNUP_ERROR', error.statusCode, error.message);
        }
    }

    async signin(username: string, password: string): Promise<{ token: string; user: IUser; author?: any }> {
        try {
            // Fetch user data including the password for verification
            const userWithPassword: any = await this.repository.model.findOne({
                where: { username },
                attributes: ['id', 'username', 'password']
            });

            if (!userWithPassword) throw new ApiError('AUTHENTICATION_ERROR', 401, 'Invalid username or password.');

            const isPasswordValid = await bcrypt.compare(password, userWithPassword.password);
            if (!isPasswordValid) throw new ApiError('AUTHENTICATION_ERROR', 401, 'Invalid username or password.');

            // Fetch user data without the password
            const user = await this.repository.findOneByPropertyWithAuthor({ username });
            if (!user) throw new ApiError('AUTHENTICATION_ERROR', 401, 'Invalid username or password.');

            const token = jwt.sign(
                { id: user.id, username: user.username, author: user?.author},
                Config.JWT_SECRET,
                { expiresIn: '1h' }
            );

            // Destructure author from user if it exists
            const { author, ...userData } = user;

            return { token, user: userData, author };
        } catch (error: any) {
            throw new ApiError("AUTHENTICATION_ERROR", error.statusCode, error.message);
        }
    }

    async getUserById(userId: number): Promise<IUser | null> {
        try {
            const user = await this.repository.findOne(userId);
            if (!user) throw new ApiError('NOT_FOUND', 404, 'User not found.');
            return user;
        } catch (error: any) {
            throw new ApiError('FETCH_ERROR', error.statusCode, error.message);
        }
    }

    async updateUser(userId: number, userData: Partial<IUser>): Promise<IUser | null> {
        const transaction = await sequelize.transaction();
        try {
            // Check if the username is already taken by another user
            if (userData.username) {
                const existingUser = await this.repository.findOneByProperty({ username: userData.username });
                if (existingUser && existingUser.id !== userId) {
                    throw new ApiError('DATA_CONFLICT', 409, 'Username already taken.');
                }
            }
            

            if (userData.password) userData.password = await bcrypt.hash(userData.password, 10);

            const updateUser = {} as IUser;
            if (userData.username !== undefined) updateUser.username = userData.username;
            if (userData.password !== undefined) updateUser.password = userData.password;
            if (userData.status !== undefined) updateUser.status = userData.status;

            await this.repository.update(userId, updateUser, transaction);
            await transaction.commit();
            const user = await this.repository.findOne(userId);
            return user;
        } catch (error: any) {
            await transaction.rollback();
            throw new ApiError('UPDATE_ERROR', error.statusCode, error.message);
        }
    }

    async deleteUser(id: number): Promise<boolean> {
        const transaction = await sequelize.transaction();
        try {
            const deleted = await this.repository.delete(id, transaction);
            await transaction.commit();
            return deleted;
        } catch (error: any) {
            await transaction.rollback();
            throw new ApiError('DELETE_ERROR', error.statusCode, 'User delete failed!');
        }
    }
}
