import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { handleErrors}  from "../helpers/handleErrors";

export default {


    list: async (request: Request, response: Response) => { // criar a lista para listar os alunos
        try {
            const users = await prisma.alunos.findMany({
                include: { cursos: true }
            });
            return response.status(200).json(users);
        } catch (e) {
            return handleErrors(e, response);
        }
    },


    create: async (request: Request, response: Response) => { // cria um alno
        try {
            const { name, email, idade, cpf } = request.body;

            if(!name || !cpf || !email || !idade){
            return response.status(400).json("Dados do aluno incompletos");
            }


            const student = await prisma.alunos.create({
                data: {
                    name,
                    email,
                    idade,
                    cpf,
                },
            })

            return response.status(201).json(student);
        } catch (e: any) {
            return handleErrors(e, response);

        }
    },


    getById: async (request: Request, response: Response) => { // pega um aluno pelo id
        try {
            const { id } = request.params
            const user = await prisma.alunos.findUnique({
                where: {
                    id: +id
                },
                include: { cursos: true }
            })
            return response.status(200).json(user)
        } catch (e) {
                       return handleErrors(e, response);

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
                        return handleErrors(e, response);

        }
    },


    delete: async (request: Request, response: Response) => { // deletar um aluno por id
        try {
            const { id } = request.params

            const user = await prisma.alunos.delete({ where: { id: +id } })

            return response.status(200).json(user)
        } catch (e) {
            return handleErrors(e, response);
        }
    },
}




