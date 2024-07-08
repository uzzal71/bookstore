import Joi from 'joi';
import { IBook } from '@Entities/IBook';

export const BookRequest = Joi.object<IBook>({
    title: Joi.string().required(),
    description: Joi.string().allow('').optional(),
    published_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required().messages({
        'string.pattern.base': 'published data must be in the format yyyy-mm-dd'
    }),
    status: Joi.boolean().optional()
});
