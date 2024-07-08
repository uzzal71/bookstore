import Joi from 'joi';
import { IBook } from '@Entities/IBook';

export const BookRequest = Joi.object<IBook>({
    author_id: Joi.optional(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    published_date: Joi.string().required(),
    status: Joi.boolean()
});
