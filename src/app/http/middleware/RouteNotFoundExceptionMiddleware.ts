import { Request, Response } from 'express'


export default async ( req: Request, res: Response) => {
    const data = {
        status: false,
        statusCode: 500,
        message: `[${req.method}]:${req.url} Route Not Found`,
        data: null,
    };

    res.status(500).send(data);
};