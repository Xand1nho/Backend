import { Request, Response } from "express"; // import { PrismaCliente } from "@prisma/client";
import { prisma } from "../../config/prisma"; // const prisma = new PrismaCliente();
import prismaErrorCodes from "../../config/prismaErrorCodes.json"; // importando os códigos de erro do Prisma para tratar erros específicos
import { Prisma } from "../../generated/prisma/client";

// Tudo isso foi comentário da Ia

export default {

    list: async (request: Request, response: Response) => {
    try {
        const users = await prisma.alunos.findMany({
            include: {
                        
                cursos: true,
            
            },
        });
        return response.status(200).json(users);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // @ts-ignore
            return response.status(prismaErrorCodes[e.code] || 500).json(e.message);
        }
        return response.status(500).json("Unkwon error. Try again later");
    }
},

    create: async (request: Request, response: Response) => { // criar
        try {// try é usado para tentar executar o código, caso haja um erro, ele é capturado pelo catch
            const { name, idade, cpf, email } = request.body;
            const user = await prisma.alunos.create({
                data: {
                    name,
                    idade,
                    cpf,
                    email
                },
            });
            return response.status(201).json(user);
        } catch (e: any) { // se houver um erro, ele é capturado aqui, e o tipo do erro é any, para que possamos acessar a propriedade code do erro
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(prismaErrorCodes[e.code] || 500).json(e.message)
            }
            return response.status(500).json("Unkwon error. Try again later");
        }
    },

    update: async (request: Request, response: Response) => { // atualizar
        try {
            const { id } = request.params;
            const { name, idade, cpf, email } = request.body;
            const user = await prisma.alunos.update({


                where: { id: +id },
                data: {
                    name,
                    idade,
                    cpf,
                    email
                },
            });
            return response.status(500).json();
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(prismaErrorCodes[e.code] || 500).json(e.message)
            }
            return response.status(500).json("Unkwon error. Try again later");
        }
    },


    getById: async (request: Request, response: Response) => {

        try {
            const { id } = request.params; // cria o id a partir dos parâmetros da requisição
            const user = await prisma.alunos.findUnique({ // usa o prisma para encontrar um usuário único com base no id
                where: { // onde o id é igual ao id passado como parâmetro
                    id: +id // o + é usado para converter o id de string para número, pois o id no banco de dados é do tipo número
                },
            });
            return response.status(200).json(user) // retorna o usuário encontrado com status 200
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(prismaErrorCodes[e.code] || 500).json(e.message)
            }
            return response.status(500).json("Unkwon error. Try again later");
        }
    },

    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const user = await prisma.alunos.delete({
                where: {
                    id: +id
                }
            });
            return response.status(200).json(user);

        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(prismaErrorCodes[e.code] || 500).json(e.message)
            }
            return response.status(500).json("Unkwon error. Try again later");
        }

    },

    created: async (request: Request, response: Response) => { // criar
        try {// try é usado para tentar executar o código, caso haja um erro, ele é capturado pelo catch
            const { name, idade, cpf, email } = request.body;
            const user = await prisma.alunos.create({
                data: {
                    name,
                    idade,
                    cpf,
                    email
                },
            });
            return response.status(201).json(user);
        } catch (e: any) { // se houver um erro, ele é capturado aqui, e o tipo do erro é any, para que possamos acessar a propriedade code do erro
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(prismaErrorCodes[e.code] || 500).json(e.message)
            }
            return response.status(500).json("Unkwon error. Try again later");
        }
    },  
    



};