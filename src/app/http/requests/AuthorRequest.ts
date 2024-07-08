import Joi from 'joi';
import { IAuthor } from '@Entities/IAuthor';

export const AuthorRequest = Joi.object<IAuthor>({
    name: Joi.string().min(3).required().messages({
        'string.empty': 'Name cannot be an empty string',
        'string.min': 'Name cannot be an empty string'
    }),
    bio: Joi.string().allow('').optional(),
    birthdate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required().messages({
        'string.pattern.base': 'Birthdate must be in the format yyyy-mm-dd'
    }),
    status: Joi.boolean().optional()
});
