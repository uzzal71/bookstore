import Joi from 'joi';
import { IUser } from '@Entities/IUser';

export const AuthRequest = Joi.object<IUser>({
    username: Joi.string().required(),
    password: Joi.string().required(),
    status: Joi.boolean().optional(),
});

export const SigninRequest = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

export const UpdateUserRequest = Joi.object<Partial<IUser>>({
    username: Joi.string().optional(),
    password: Joi.string().optional(),
    status: Joi.boolean().optional(),
});
