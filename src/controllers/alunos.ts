import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import prismaErrorCodes from '../../config/prismaErrorCodes.json'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { Prisma } from "../../generated/prisma/client";
import cursos from "./cursos";

export default {
    list: async (request: Request, response: Response) => { // criar a lista para listar os alunos
        try {
            const users = await prisma.alunos.findMany({
                include: { cursos : true }
            });
            return response.status(200).json(users);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(prismaErrorCodes[e.codes] || 500).json(e.message)
            }
            return response.status(500).json("Unknown error. Try again later")
        }
    },
    create: async (request: Request, response: Response) => { // cria um alno
        try {
            const { name, email, idade, cpf } = request.body;
            const user = await prisma.alunos.create({
                data: {
                    name,
                    email,
                    idade,
                    cpf,
                },
            })
            console.log("Usuário criado.");
            return response.status(201).json(user);
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(prismaErrorCodes[e.codes] || 500).json(e.message)
            }
            return response.status(500).json("Unknown error. Try again later")
        }
    },

    matricular: async (request: Request, response: Response) => { // matricula um aluno em um curso
        try {
            const { id } = request.params
            const user = await prisma.alunos.update({
                where: { id: +id },
                data: {
                    cursos: {
                        connect: { id: 2 }
                    }
                }
            })
            return response.status(201).json(user)
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(prismaErrorCodes[e.codes] || 500).json(e.message)
            }
            return response.status(500).json("Unknown error. Try again later")
        }
    },

    desmatricular: async (request: Request, response: Response) => { // desmaitricula um  aluno de um curso
        try {
            const { id } = request.params
            const user = await prisma.alunos.update({
                where: { id: +id },
                data: {
                    cursos: {
                        disconnect: { id: 2 }
                    }
                }
            })
            return response.status(201).json(user)
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(prismaErrorCodes[e.codes] || 500).json(e.message)
            }
            return response.status(500).json("Unknown error. Try again later")
        }
    },

    getById: async (request: Request, response: Response) => { // pega um aluno pelo id
        try {
            const { id } = request.params
            const user = await prisma.alunos.findUnique({
                where: {
                    id: +id
                }
            })
            return response.status(200).json(user)
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(prismaErrorCodes[e.codes] || 500).json(e.message)
            }
            return response.status(500).json("Unknown error. Try again later")
        }
    },

    update: async (request: Request, response: Response) => { // atualizar o aluno pelko id
        try {
            const { id } = request.params
            const { name, idade, email, cpf } = request.body

            const user = await prisma.alunos.update({

                data: {
                    name,
                    idade,
                    email,
                    cpf,
                },
                where: {
                    id: +id
                },

            })
            return response.status(200).json(user)
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(prismaErrorCodes[e.codes] || 500).json(e.message)
            }
        }
        return response.status(500).json("Unknown error. Try again later")
    },

    delete: async (request: Request, response: Response) => { // deletar um aluno por id
        try {
            const { id } = request.params

            const user = await prisma.alunos.delete({ where: { id: +id } })

            return response.status(200).json(user)
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {

                // @ts-ignore
                return response.status(prismaErrorCodes[e.codes] || 500).json(e.message)
            }
            return response.status(500).json("Unknown error. Try again later")
        }
    }
}

