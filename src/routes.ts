import { Router } from "express";

import alunosController from "./controllers/alunos";
import cursosController from "./controllers/cursos";
import { prisma } from "../config/prisma";


const routes = Router();

routes.get("/", (request, response) =>
    response.status(200).json({ success: true })
);


// Rotas de alunos
// routes.get("/alunos", (request, response) =>

routes.get("/alunos", alunosController.list); // routes.get("/alunos", alunosController.list); para listar os alunos usando o método list do controller de alunos

routes.get("/alunos/:id", alunosController.getById); // routes.get("/alunos/:id", alunosController.getById); para obter um aluno específico usando o método getById do controller de alunos, passando o id como parâmetro

routes.post("/alunos", alunosController.create); // routes.post("/alunos", alunosController.create); para criar um novo aluno usando o método create do controller de alunos

routes.put("/alunos/:id", alunosController.update); // routes.put("/alunos/:id", alunosController.update); para atualizar um aluno específico usando o método update do controller de alunos, passando o id como parâmetro

routes.delete("/alunos/:id", alunosController.delete); // routes.delete("/alunos/:id", alunosController.delete); para deletar um aluno específico usando o método delete do controller de alunos, passando o id como parâmetro

// Cursos

routes.get("/cursos", cursosController.list); // lista curso 

routes.get("/cursos/:id", cursosController.getById); // pega um curso

routes.post("/cursos", cursosController.create); // cria um curso

routes.put("/cursos/:id", cursosController.update); // atualizar curso

routes.delete("/cursos/:id", cursosController.delete); // rota para deletar um curso 



routes.post('/alunosMatricular', alunosController.matricular) // rota para matricular um aluno em um curso

routes.delete('/alunosDesmatricular', alunosController.desmatricular) // rota para desmatricular aluno de um curso

export default routes;