import express from "express"; // Importa o módulo Express para criar o servidor web
import cors from "cors"; // Importa o módulo CORS para habilitar o Cross-Origin Resource Sharing, permitindo que o servidor aceite requisições de outros domínios
import routes from "./routes";

//Inicializa o express

const app = express(); // Cria uma instância do Express para configurar o servidor

//Define regras do servidor

app.use(express.json()); // Permite o servidor entender requisições com corpo em JSON
app.use(express.urlencoded({ extended: true })); // Permite o servidor entender requisições com corpo em JSON e URL-encoded
app.use(cors()); // Habilita o CORS para permitir requisições de outros domínios

app.use(routes); // Rota de teste para verificar se o servidor está funcionando

export default app; // Exporta a instância do Express para ser usada em outros arquivos, como o index.ts onde o servidor é criado e iniciado