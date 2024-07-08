import { Request, Response } from "express";

export default async (error: any, req: Request, res: Response, next: any) => {
    if(error) {
        const data = {
            status: false,
            statusCode: 500,
            message: [error.message],
            data: [],
        };
        res.status(500).send(data);
    } else {
        next();
    }
};

