import Joi from 'joi';
import { IUser } from '@Entities/IUser';

export const AuthRequest = Joi.object<IUser>({
    username: Joi.string()
        .regex(/^\S*$/)
        .required()
        .messages({
            'string.pattern.base': 'Username cannot contain spaces',
            'any.required': 'Username is required'
        }),
    password: Joi.string()
        .required()
        .messages({
            'any.required': 'Password is required'
        }),
    status: Joi.boolean().optional()
});


export const SigninRequest = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

export const UpdateUserRequest = Joi.object<Partial<IUser>>({
    username: Joi.string()
        .regex(/^\S*$/)
        .required()
        .messages({
            'string.pattern.base': 'Username cannot contain spaces',
            'any.required': 'Username is required'
        }),
    password: Joi.string()
        .required()
        .messages({
            'any.required': 'Password is required'
        }),
    status: Joi.boolean().optional(),
});
