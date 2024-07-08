import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ResponseError } from '@Utils/HttpResponse';
import { IUser } from '@Entities/IUser';
import Config from '@/config';

// interface AuthRequest extends Request {
//     user?: IUser;
// }

export const authenticateToken = (req: any, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return ResponseError(res, 401, 'Access Denied. No Token Provided.');
    }

    try {
        const secretKey = Config.JWT_SECRET || process.env.JWT_SECRET;
        const verified = jwt.verify(token, secretKey) as IUser;
        req.user = verified;
        return next();
    } catch (error) {
        return ResponseError(res, 400, 'Invalid Token.');
    }
};
