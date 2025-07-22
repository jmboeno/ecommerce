Projeto de E-commerce: Plataforma de Gestão de Negócios
Descrição do Projeto
Este é um projeto full-stack abrangente para a gestão de um negócio de e-commerce. Ele oferece uma plataforma robusta para administrar usuários, produtos, categorias, fornecedores, vendas e transações, com um sistema de autenticação e autorização baseado em roles e permissões. O projeto é dividido em um backend (API RESTful) e um frontend (Single-Page Application - SPA), ambos desenvolvidos com tecnologias JavaScript modernas para garantir escalabilidade e uma experiência de usuário eficiente.

Tecnologias Utilizadas
Backend
Node.js: Ambiente de execução JavaScript.

Express.js: Framework web para Node.js, para construção da API.

PostgreSQL: Banco de dados relacional.

Sequelize: ORM (Object-Relational Mapper) para interação com o banco de dados.

JWT (JSON Web Tokens): Para autenticação e autorização seguras.

Bcrypt.js: Para hash de senhas.

Dotenv: Gerenciamento de variáveis de ambiente.

Helmet: Proteção contra vulnerabilidades web comuns.

Morgan: Logger de requisições HTTP.

Swagger-JSODC & Swagger-UI-Express: Para documentação interativa da API.

ESLint: Análise de código estática para garantir a qualidade.

Frontend
React: Biblioteca JavaScript para construção da interface do usuário.

Vite: Ferramenta de build rápida para desenvolvimento frontend.

React Router DOM: Para roteamento e navegação na SPA.

Axios: Cliente HTTP para comunicação com a API do backend.

React Toastify: Para notificações e mensagens de feedback ao usuário.

ESLint: Análise de código estática.

Estrutura do Projeto
O projeto é organizado em dois diretórios principais: backend e frontend.

ecommerce/
├── backend/
│   ├── src/
│   │   ├── config/            # Configurações do ambiente e JWT
│   │   ├── controllers/       # Lógica de controle das requisições
│   │   ├── middleware/        # Middlewares de autenticação, roles e permissões
│   │   ├── migrations/        # Migrações do banco de dados (Sequelize)
│   │   ├── models/            # Modelos de dados (Sequelize)
│   │   ├── routes/            # Definição das rotas da API
│   │   ├── services/          # Lógica de negócios e interação com o DB
│   │   ├── swagger/           # Definições do Swagger
│   │   └── app.js             # Configuração principal do Express
│   ├── .env.example           # Exemplo de variáveis de ambiente
│   ├── package.json           # Dependências e scripts do backend
│   └── ... outros arquivos de configuração
├── frontend/
│   ├── public/                # Arquivos estáticos (ícones, HTML principal)
│   ├── src/
│   │   ├── components/
│   │   │   ├── atoms/         # Componentes UI básicos (botões, inputs, ícones)
│   │   │   ├── mols/          # Componentes UI combinando átomos (campos de formulário, cartões)
│   │   │   ├── orgs/          # Seções complexas da UI (formulários de login, sidebar, estatísticas)
│   │   │   ├── pages/         # Componentes de página (Login, Registro, Dashboard)
│   │   │   └── templates/     # Layouts de página (AuthLayout, DashboardLayout)
│   │   ├── context/           # Contextos React para estado global (Autenticação, Loading)
│   │   ├── routes/            # Configuração das rotas React
│   │   ├── services/          # Funções para chamadas à API
│   │   ├── styles/            # Estilos globais e variáveis de tema
│   │   └── App.jsx            # Componente raiz da aplicação React
│   ├── index.html             # Arquivo HTML principal do frontend
│   ├── package.json           # Dependências e scripts do frontend
│   ├── vite.config.js         # Configuração do Vite
│   └── ... outros arquivos de configuração
└── package.json               # Gerenciador de scripts para ambos os projetos

Funcionalidades Principais
Autenticação e Autorização Seguras
Registro de Usuários: Criação de novas contas.

Login e Logout: Gerenciamento de sessões de usuário com tokens de acesso e refresh tokens.

Ativação de Conta: Processo de ativação de conta via token.

Controle de Acesso Baseado em Papéis (RBAC): Definição de Roles (Cargos) e Permissions (Permissões) para controlar o acesso a diferentes funcionalidades da API.

Gestão de ACL (Access Control List): Atribuição dinâmica de roles e permissões a usuários e roles.

Gestão de E-commerce
Usuários: CRUD completo para gerenciamento de usuários.

Produtos: Gerenciamento de produtos com detalhes, preço, SKU, status, e associação a categorias e fornecedores.

Categorias: Organização de produtos por categorias.

Fornecedores: Gestão de informações de fornecedores.

Transações: Registro e acompanhamento de transações de vendas.

Pedidos (Orders): Controle de pedidos, incluindo itens do pedido e status.

Dashboard e Visão Geral
Estatísticas: Painel com estatísticas de usuários, vendas, produtos e fornecedores.

Atividade Recente: Exibição de um feed de atividades recentes no sistema.

Ações Rápidas: Botões para ações comuns diretamente do dashboard.

Como Executar o Projeto
Para configurar e executar o projeto em sua máquina local, siga os passos abaixo:

Pré-requisitos
Node.js (versão 18 ou superior)

PostgreSQL

npm ou Yarn

1. Configuração do Backend
Navegue até o diretório do backend:

cd backend

Instale as dependências:

npm install
# ou yarn install

Crie o arquivo .env:
Crie um arquivo .env na raiz do diretório backend e configure as variáveis de ambiente necessárias para a conexão com o banco de dados e segredos JWT. Use o backend/.env.example como referência.

DB_USERNAME=seu_usuario_postgres
DB_PASSWORD=sua_senha_postgres
DB_NAME=nome_do_seu_banco_de_dados
DB_HOST=localhost # ou o IP do seu servidor Postgres
DB_PORT=5432
SECRET=um_segredo_aleatorio_para_jwt
REFRESH_SECRET=outro_segredo_aleatorio_para_refresh_jwt
ACTIVATION_SECRET=segredo_para_ativacao_de_conta

DEU CERTO: As informações sensíveis do banco de dados e JWT foram externalizadas para um arquivo .env para maior segurança e flexibilidade.

Execute as migrações do banco de dados:
Certifique-se de que seu servidor PostgreSQL está em execução.

npx sequelize-cli db:migrate

Isso criará as tabelas necessárias no seu banco de dados.

Inicie o servidor backend:

npm start
# ou yarn start

O servidor será iniciado em http://localhost:8000 (ou na porta definida em seu .env).

2. Configuração do Frontend
Navegue até o diretório do frontend:

cd frontend

Instale as dependências:

npm install
# ou yarn install

Inicie o servidor de desenvolvimento do frontend:

npm run dev
# ou yarn dev

O aplicativo frontend será iniciado em http://localhost:5173 (ou em uma porta diferente, conforme configurado pelo Vite).

3. Executando Ambos (Opcional, com concurrently)
Você pode usar o script dev do arquivo package.json principal para iniciar ambos os servidores simultaneamente.

Navegue para o diretório raiz do projeto (onde está o package.json principal):

cd .. # Se você estiver no diretório frontend ou backend

Certifique-se de que as dependências do concurrently estejam instaladas na raiz:

npm install
# ou yarn install

Execute o script dev:

npm run dev
# ou yarn dev

Isso iniciará tanto o backend quanto o frontend, permitindo o desenvolvimento e testes integrados.

Documentação da API (Swagger)
A documentação interativa da API está disponível através do Swagger UI. Uma vez que o backend esteja em execução, acesse:

http://localhost:8000/docs

Contribuições
Sinta-se à vontade para explorar o código, sugerir melhorias ou relatar problemas.

Licença
Este projeto está licenciado sob a Licença ISC.