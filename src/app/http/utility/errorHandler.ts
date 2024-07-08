class BaseError extends Error {
    public readonly name: string;
    public readonly statusCode: number;

    constructor(name: string, statusCode: number, message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }
}


export class ApiError extends BaseError {
    constructor(name: string, statusCode: number = 500, message: string) {
        super(name, statusCode, message);
    }
}