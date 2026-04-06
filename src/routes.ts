import { Router } from "express";

import alunosController from "./controllers/alunos";
import cursosController from "./controllers/cursos";
import matriculasController from "./controllers/matriculas";
import funcionariosController from "./controllers/funcionarios";
import { authentication } from "./middlewares/authentication";

const routes = Router();

routes.get("/", (request, response) =>
    response.status(200).json({ success: true })
);


// Rotas de alunos
// routes.get("/alunos", (request, response) =>

routes.get("/alunos", authentication, alunosController.list); // routes.get("/alunos", alunosController.list); para listar os alunos usando o método list do controller de alunos

routes.get("/alunos/:id", authentication, alunosController.getById); // routes.get("/alunos/:id", alunosController.getById); para obter um aluno específico usando o método getById do controller de alunos, passando o id como parâmetro

routes.post("/alunos", authentication, alunosController.create); // routes.post("/alunos", alunosController.create); para criar um novo aluno usando o método create do controller de alunos

routes.put("/alunos/:id", authentication, alunosController.update); // routes.put("/alunos/:id", alunosController.update); para atualizar um aluno específico usando o método update do controller de alunos, passando o id como parâmetro

routes.delete("/alunos/:id", authentication, alunosController.delete); // routes.delete("/alunos/:id", alunosController.delete); para deletar um aluno específico usando o método delete do controller de alunos, passando o id como parâmetro

// Cursos

routes.get("/cursos", authentication, cursosController.list); // lista curso 

routes.get("/cursos/:id", authentication, cursosController.getById); // pega um curso

routes.post("/cursos", authentication, cursosController.create); // cria um curso

routes.put("/cursos/:id", authentication, cursosController.update); // atualizar curso

routes.delete("/cursos/:id", authentication, cursosController.delete); // rota para deletar um curso 



routes.post('/alunosMatricular/:id', authentication, matriculasController.create) // rota para matricular um aluno em um curso

routes.delete('/alunosDesmatricular/:id', authentication, matriculasController.delete) // rota para desmatricular aluno de um curso


// Funcionarios

routes.post("/funcionarios/login", funcionariosController.login);

routes.get("/funcionarios", authentication, funcionariosController.list); // lista funcionarios

routes.get("/funcionarios/:id", authentication, funcionariosController.getById); // pega um funcionario

routes.post("/funcionarios", authentication, funcionariosController.create); // cria um funcionario

routes.put("/funcionarios/:id", authentication, funcionariosController.update); // atualizar funcionario

routes.delete("/funcionarios/:id", authentication, funcionariosController.delete); // rota para deletar um funcionario

export default routes;