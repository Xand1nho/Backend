import { Request, Response } from "express"
import { prisma } from "../../config/prisma"
import { handleErrors } from "../helpers/handleErrors"

export default {
    create: async (request: Request, response: Response) => { // criar um alno
        try {
            const { id } = request.params
            const { cursosId } = request.body;

            const student = await prisma.alunos.update({
                where: { id: +id },
                data: {
                    cursos: {
                        connect: cursosId.map((cursoId: number) => ({ id: cursoId }))
                    },
                },
                include: {
                    cursos: true,
                },
            });
            return  response.status(201).json(student)
;        } catch (e) {
            return handleErrors(e, response);
        }
    },

    delete: async (request: Request, response: Response) => { // desmatricular um aluno de um curso
        try {
            const { id } = request.params
            const { cursoId } = request.body;

            const student = await prisma.alunos.update({
                where: { id: +id },
                data: {
                    cursos: {
                        disconnect: cursoId.map((cursoId: number) => ({ id: +cursoId }))
                    }
                },
            })
            return response.status(200).json(student)
        } catch (e) {
            return handleErrors(e, response);
        }
        }
        
}
