import { Response, NextFunction } from 'express';
import { ResponseError } from '@Utils/HttpResponse';

export const authorizeUser = (req: any, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.id, 10);
    if (req.user?.id !== userId) {
        return ResponseError(res, 403, 'Access Denied. You are not authorized to access this resource.');
    }
    return next();
};
