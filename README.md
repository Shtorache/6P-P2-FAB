# P2 - Frontend React + Backend T2

Este repositorio contem a entrega completa da P2:

- `frontend/`: aplicacao React com Tailwind CSS.
- `T2/`: API Node.js/Express com PostgreSQL, MongoDB, JWT, Swagger e testes.

## Como subir com Docker

Execute na raiz do projeto:

```bash
docker compose up --build
```

Apos os containers subirem, acesse:

- Frontend: `http://localhost:3001`
- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/api-docs`
- Health check: `http://localhost:3000/health`

Credenciais de exemplo criadas pelo seed do backend:

- Email: `admin@p2.local`
- Senha: `senha123`

## Variaveis de ambiente

O frontend usa as variaveis em `frontend/.env.example`:

```env
VITE_API_URL=http://localhost:3000
VITE_AUTH_TOKEN_KEY=app_token
```

No Docker Compose da raiz, `VITE_API_URL` e configurada como `http://localhost:3000`, porque as requisicoes partem do navegador do usuario.

## Funcionalidades

- Login integrado com JWT.
- Rotas protegidas no frontend.
- Navegacao entre dashboard, usuarios, carros, motos e marcas de roupa.
- CRUD de usuarios usando rota protegida do backend.
- CRUD de carros, motos e marcas de roupa.
- Mensagens de sucesso e erro nas operacoes.
- Layout responsivo com Tailwind CSS.

## Testes

Backend:

```bash
cd T2
npm test
```

Frontend:

```bash
cd frontend
npm run build
```

Observacao: os testes do backend limpam as tabelas/colecoes usadas. Se voce rodar testes contra os mesmos bancos do Docker Compose, reaplique o seed com:

```bash
docker exec p2_backend npm run seed
```
