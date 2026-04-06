import { Response } from "express";
import { Prisma } from "../../generated/prisma/client";
import prismaErrorCodes from "../../config/prismaErrorCodes.json";

export function handleErrors(error: any, response: Response) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(prismaErrorCodes[error.code] || 500).json(error.message)
            }
            return response.status(500).json("Unknown error. Try again later")
        }