import { Request, Response } from "express"
import { prisma } from "../../config/prisma"
import prismaErrorCodes from "../../config/prismaErrorCodes.json"
import { Prisma } from "../../generated/prisma/client"


export default {
    list: async (request: Request, response: Response) => { // criar a lista para listar os cursos
        try {
            const users = await prisma.cursos.findMany()
            return response.status(200).json(users)
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(prismaErrorCodes[e.code] || 500).json(e.message)
            }
            return response.status(500).json("Unknown error. Try again later")
        }
    },

    create: async (request: Request, response: Response) => { // criar um curso
        try {
            const { nome, professor, cargaHoraria, descricao } = request.body
            const { alunosId, cursosId } = request.body
            const user = await prisma.cursos.create({
                data: {
                    nome,
                    professor,
                    cargaHoraria,
                    descricao
                },
            })
            console.log("Created user")
            return response.status(201).json(user)
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(prismaErrorCodes[e.code] || 500).json(e.message)
            }
            return response.status(500).json("Unknown error. Try again later")
        }
    },

    update: async (request: Request, response: Response) => { // atualizar um curso 
        try {
            const { id } = request.params
            const { nome, professor, cargaHoraria, descricao } = request.body

            const user = await prisma.cursos.update({
                data: {
                    nome,
                    professor,
                    cargaHoraria,
                    descricao
                },
                where: {
                    id: +id 
                    }
            })
            console.log("Usuario atualizado")
            return response.status(201).json(user)
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(prismaErrorCodes[e.code] || 500).json(e.message)
            }
            return response.status(500).json("Unknown error. Try again later")
        }
    },

    getById: async (request: Request, response: Response) => { // pegar um curso esécofico pelo id
        try {
            const { id } = request.params
            const user = await prisma.cursos.findUnique({ where: { id: +id } })
            return response.status(200).json(user)
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(prismaErrorCodes[e.code] || 500).json(e.message)
            }
            return response.status(500).json("Unknown error. Try again later")
        }
    },

    delete: async (request: Request, response: Response) => { /// deletar um curso por id
        try {
            const { id } = request.params

            const user = await prisma.cursos.delete({
                where: { id: +id }
            })
            console.log("Usuario deletado")
            return response.status(200).json(user)
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(prismaErrorCodes[e.code] || 500).json(e.message)
            }
            return response.status(500).json("Unknown error. Try again later")
        }
    }
}