import Joi from 'joi';
import { IAuthor } from '@Entities/IAuthor';

export const AuthorRequest = Joi.object<IAuthor>({
    user_id: Joi.optional(),
    name: Joi.string().required(),
    bio: Joi.string().required(),
    birthdate: Joi.string().required(),
    status: Joi.boolean()
});
