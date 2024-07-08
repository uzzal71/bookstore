import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '@Utils/HttpResponse';

export const validateId = (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        ResponseError(res, 400, 'Invalid ID format.');
    } else {
        next();
    }
};
