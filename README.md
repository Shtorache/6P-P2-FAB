# P2 Frontend + Backend

Este repositório contém:

- `T2/`: backend Node.js/Express com PostgreSQL, MongoDB e JWT.
- `frontend/`: frontend React + Tailwind que consome o backend.

## Como subir a aplicação completa

1. Instalar dependências na raiz do frontend:
   - `cd frontend`
   - `npm install`

2. Subir os containers com Docker Compose:
   - `docker compose up --build`

3. Acessar no navegador:
   - Frontend: `http://localhost:3001`
   - API: `http://localhost:3000`

## Configuração de ambiente

- O frontend usa `VITE_API_URL` para acessar o backend.
- A variável `VITE_AUTH_TOKEN_KEY` define a chave do token JWT no `localStorage`.
- Um arquivo de exemplo está em `frontend/.env.example`.

## O que já está implementado

- Login integrado com a API do backend.
- Token JWT armazenado no `localStorage`.
- Controle de acesso para rotas privadas no frontend.
- Navegação entre telas com React Router.
- Páginas para listar usuários, carros, motos e marcas de roupa.
- Container Docker para o frontend.
- Integração de frontend e backend via `docker-compose.yml`.

## Notas

- O backend é construído a partir de `T2/`.
- O frontend roda em `http://localhost:3001` e consome a API em `http://localhost:3000` quando executado via Docker.
- O backend gera dados iniciais automaticamente ao iniciar, incluindo um usuário admin e 3 itens de exemplo para carros, motos e marcas de roupa.
- Credenciais de exemplo: `admin@p2.local / senha123`.
