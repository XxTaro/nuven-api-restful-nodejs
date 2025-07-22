# API para Análise de Dados com IA

![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-4.x-black?style=for-the-badge&logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-ORM-teal?style=for-the-badge&logo=prisma)
![Docker](https://img.shields.io/badge/Docker-Compose-blue?style=for-the-badge&logo=docker)
![Swagger](https://img.shields.io/badge/Swagger-API%20Docs-85EA2D?style=for-the-badge&logo=swagger)

API em Node.js/Express para fazer upload de datasets (.csv/.pdf) e realizar consultas em linguagem natural através da API do Google Gemini.

O ambiente é totalmente containerizado com Docker Compose para simplificar a configuração e a execução.

## Funcionalidades

-   **Autenticação:** Sistema de registro e login com tokens JWT para proteger os endpoints.
-   **Upload de Datasets:** Endpoint para receber arquivos nos formatos `.csv` e `.pdf`.
-   **Processamento de Dados:** Os arquivos CSV são lidos e seu conteúdo é armazenado como JSON no banco de dados.
-   **Busca Simples:** Permite a busca por palavra-chave em todos os registros JSON.
-   **Consultas com IA:** Integração com a API do Google Gemini para responder perguntas sobre os dados dos arquivos.
-   **Documentação:** A API é documentada com Swagger (OpenAPI) e fica disponível em `/api-docs`.
-   **Ambiente Docker:** Configuração com Docker Compose para rodar a API e o banco de dados PostgreSQL.

## Tecnologias Utilizadas

-   **Backend:** Node.js, Express.js
-   **ORM:** Prisma
-   **Banco de Dados:** PostgreSQL
-   **Autenticação:** JSON Web Token (JWT), bcryptjs
-   **Upload de Ficheiros:** Multer
-   **IA Generativa:** Google Gemini API
-   **Documentação:** swagger-ui-express, swagger-autogen
-   **Containerização:** Docker, Docker Compose

## Como Rodar

Passos para executar o projeto localmente.

### Pré-requisitos

-   Node.js (v18+)
-   Docker
-   Docker Compose

### Execução

1.  **Clone o repositório:**
    ```bash
    git clone <URL-DO-SEU-REPOSITORIO>
    cd <NOME-DA-PASTA-DO-PROJETO>
    ```

2.  **Configure as variáveis de ambiente:**
    É preciso criar dois arquivos (`.env` e `.env.db`) na raiz do projeto. Use os exemplos abaixo como base.

    -   **`.env`** (para a API):
        ```dotenv
        # URL de conexão do banco de dados na rede Docker
        DATABASE_URL="postgresql://docker_user:docker_password@postgres_db:5432/docker_db?schema=public"

        # Chave para gerar os tokens JWT
        JWT_SECRET="SUA_CHAVE_SECRETA_AQUI"

        # Chave da API do Google Gemini
        GEMINI_API_KEY="SUA_CHAVE_DA_API_GEMINI_AQUI"
        ```

3.  **Inicie os contêineres:**
    Este comando irá construir a imagem da API e iniciar os serviços. As migrações do Prisma são executadas automaticamente na inicialização da API.
    ```bash
    docker-compose up --build
    ```

4.  **Acesso:**
    -   A API estará disponível em `http://localhost:3000`.
    -   A porta do banco de dados (mapeada para o host) é `5433`.

## Documentação da API

A documentação interativa do Swagger fica disponível enquanto a aplicação está rodando. Para acessar:

[**http://localhost:3000/api-docs**](http://localhost:3000/api-docs)

Para testar os endpoints protegidos, é preciso usar o token JWT obtido no endpoint `/auth/login` e inseri-lo no campo de autorização do Swagger.

---
