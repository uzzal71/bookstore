import { Request, Response } from "express";
import { ApiError } from "./errorHandler";
import { ObjectSchema } from "joi";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const validateRequest = async (validationDTO: ObjectSchema, request: Request, _response: Response) => {


    const { error } = validationDTO.validate(request.body)

    if (error) {
        throw new ApiError('DATA_VALIDATION', 400, error.details[0].message.replace(/"/g, ''));
    }

    return true;
}

export const validateQueryRequest = async (validationDTO: ObjectSchema, request: Request) => {


    const { error } = validationDTO.validate(request.query)

    if (error) {
        throw new ApiError('DATA_VALIDATION', 400, error.details[0].message.replace(/"/g, ''));
    }

    return true;
}

export const validateParamsRequest = async (validationDTO: ObjectSchema, request: Request) => {


    const { error } = validationDTO.validate(request.query)

    if (error) {
        throw new ApiError('DATA_VALIDATION', 400, error.details[0].message.replace(/"/g, ''));
    }

    return true;
}