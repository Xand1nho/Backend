import { Request, Response } from "express"
import { prisma } from "../../config/prisma"
import { handleErrors } from "../helpers/handleErrors"

export default {



    list: async (request: Request, response: Response) => { // criar a lista para listar os cursos
        try {
            const users = await prisma.cursos.findMany()
            return response.status(200).json(users)
        } catch (e) {
            return handleErrors(e, response);

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

            return response.status(201).json(user)
        } catch (e) {
            return handleErrors(e, response);

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

            return response.status(201).json(user)
        } catch (e) {
            return handleErrors(e, response);

        }
    },


    getById: async (request: Request, response: Response) => { // pegar um curso esécofico pelo id
        try {
            const { id } = request.params
            const user = await prisma.cursos.findUnique({ where: { id: +id } })
            return response.status(200).json(user)

        } catch (e) {
            return handleErrors(e, response);

        }
    },


    delete: async (request: Request, response: Response) => { /// deletar um curso por id
        try {
            const { id } = request.params

            const user = await prisma.cursos.delete({
                where: { id: +id }
            })

            return response.status(200).json(user)
        } catch (e) {
            return handleErrors(e, response);

        }
    }
}