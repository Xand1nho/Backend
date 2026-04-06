import { NextFunction, Request, response, Response } from "express";
import jwt from "jsonwebtoken";
import { Funcionarios } from "../../generated/prisma/client";

    export function authentication(
        request: Request,
        reponse: Response,
        next: NextFunction,
    ) {
        try { 
            const authHeader = request.headers.authorization;
            
            if (!authHeader) {
                return reponse.status(401).json("Não autenticado");
            }
            
            const token = authHeader.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET!);
            // @ts-ignore
            if(!request.body){ request.body = {};
        }

            request.body.user = decoded as Funcionarios;

            
            next();

        } catch (e) {
            console.error(e);
            return response.status(401).json("Não autenticado");
        }
    }