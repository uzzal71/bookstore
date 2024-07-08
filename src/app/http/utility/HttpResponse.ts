import { Response } from "express";

export const ResponseSuccess = (res: Response, statusCode = 200, message = '', data: any) => {
    return res.status(statusCode).send({
        status: true,
        statusCode,
        message,
        data,
    });
}

export const ResponseError = (res: Response, statusCode = 500, message?: string | object | null) => {

    return res.status(statusCode).send({
        status: false,
        statusCode,
        message,
        data: {}
    });
}