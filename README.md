
# English Dictionary API

## Descrição

Este projeto é uma API RESTful para listar e gerenciar palavras em inglês, utilizando a API Free Dictionary API como base. A aplicação permite visualizar, favoritar e manter um histórico de palavras consultadas. Utiliza Node.js com TypeScript e Prisma ORM para interagir com um banco de dados PostgreSQL.

## Tecnologias Utilizadas

- **Linguagem:** Node.js, TypeScript
- **Framework:** Express
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Cache:** Redis
- **Teste:** Jest
- **Containerização:** Docker
- **CI/CD:** CircleCI
- **Deploy:** Render

## Funcionalidades

- **Autenticação de Usuário:**
  - Signup
  - Login
- **Gerenciamento de Palavras:**
  - Visualizar lista de palavras
  - Visualizar detalhes de uma palavra
  - Favoritar palavras
  - Histórico de palavras visualizadas
- **Documentação da API:** Swagger

## Configuração e Execução

### Pré-requisitos

- Node.js
- Docker
- Conta no Render.com
- Conta no CircleCI

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
REDIS_URL=redis://HOST:PORT
JWT_SECRET=your_jwt_secret
```

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Bubex/english-words-api.git
   cd english-words-api
   ```

### Executando com Docker

1. Construa e inicie os containers:
   ```bash
   docker-compose up --build
   ```

### Testes

Para rodar os testes, execute:
```bash
npm test
```

### Scripts

- **Importar palavras para o banco de dados**:
  ```bash
  npm run import:words
  ```

### CI/CD

A configuração do CircleCI está disponível no arquivo `.circleci/config.yml`. O pipeline inclui passos para:

- Testar
- Gerar o cliente Prisma
- Aplicar migrações
- Construir a aplicação
- Realizar o deploy para o Render

### Deploy

O deploy é feito automaticamente no Render após o pipeline de CI/CD ser concluído com sucesso.

### Documentação da API

A documentação da API está disponível em `/api-docs` quando a aplicação está em execução.
