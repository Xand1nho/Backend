import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { handleErrors } from "../helpers/handleErrors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {

    //Rota para login de funcionarios
    login: async (request: Request, response: Response) => { // rota para login de funcionarios
        try {
            const { email, senha } = request.body; // cria uma variavel para pega o email e senha do corpo da requisição

            const employee = await prisma.funcionarios.findUnique({
                where: {
                    email,
                }
            });

            if (!employee || !bcrypt.compareSync(senha, employee.senha)) {
                return response.status(404).json({ error: "Email ou senha inválidos" });
            }

            const token = jwt.sign(employee, process.env.JWT_SECRET!, { // Cria o tojen jwt 
                expiresIn: "10s" // dia, hora, minuto, segundo, milissegundo
            });

            return response.status(200).json({ access_token: token });
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    list: async (request: Request, response: Response) => { // criar a lista para listar os funcionarios
        try {
            const users = await prisma.funcionarios.findMany({

            });
            return response.status(200).json(users);
        } catch (e) {
            return handleErrors(e, response);
        }
    },


    create: async (request: Request, response: Response) => { // cria um alno
        try { 
            const { nome, email, senha, admin, user } = request.body;

            if (!user.admin) {
                return response.status(403).json("Acesso negado");
            }


            if (!nome || !email || !senha) {
                return response.status(400).json("Dados do funcionário incompletos");
            }

            const employee = await prisma.funcionarios.create({
                data: {
                    nome,
                    email,
                    senha: bcrypt.hashSync(senha, +process.env.BCRYPT_ROUNDS!), // Hash da senha usando bcrypt
                    admin,
                },
            });
            return response.status(201).json(employee);
        } catch (e: any) {
            return handleErrors(e, response);
        }
    },

    getById: async (request: Request, response: Response) => { // pega um aluno pelo id
        try {
            const { id } = request.params
            const employee = await prisma.funcionarios.findUnique({
                where: {
                    id: +id
                }
            })
            return response.status(200).json(employee)
        } catch (e) {
            return handleErrors(e, response);

        }
    },


    update: async (request: Request, response: Response) => { // atualizar o aluno pelko id
        try {
            const { id } = request.params
            const { nome, email, user, admin } = request.body

            if(!user.admin && user.id !== +id) {
            return response.status(403).json("Não autorizado")

            }

            const employee = await prisma.funcionarios.update({
                data: {
                    nome,
                    email,
                    admin: user.admin ? admin: false,
                },
                where: {
                    id: +id
                },

            })
            return response.status(200).json(employee)
        } catch (e) {
            return handleErrors(e, response);

        }
    },


    delete: async (request: Request, response: Response) => { // deletar um aluno por id
        try {
            const { id } = request.params
            const { user } = request.body


            if (!user.admin) {
                return response.status(403).json("Não autorizado");
            }

            const employee = await prisma.funcionarios.delete({
                where: {
                    id: +id
                },
            })

            return response.status(200).json(user)
        } catch (e) {
            return handleErrors(e, response);
        }
    },
}




