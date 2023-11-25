# Desafio 2 - Escribo

Este projeto é uma API de autenticação simples construída com Node.js, Express, JWT (JSON Web Tokens) e bcrypt. A API permite que os usuários se registrem (sign up), façam login (sign in) e acessem informações do usuário autenticado.

## Como funciona

A API possui três endpoints principais:

- `POST /signup`: Este endpoint é usado para registrar um novo usuário. Ele aceita um corpo de requisição JSON com `nome`, `email`, `senha` e `telefones`. Se o e-mail já estiver registrado, a API retornará um erro. Caso contrário, um novo usuário será criado, um token JWT será gerado e as informações do usuário serão retornadas na resposta.

- `POST /signin`: Este endpoint é usado para fazer login como um usuário existente. Ele aceita um corpo de requisição JSON com `email` e `senha`. Se o e-mail e a senha corresponderem a um usuário existente, um novo token JWT será gerado e as informações do usuário serão retornadas na resposta. Caso contrário, a API retornará um erro.

- `GET /user`: Este endpoint é usado para acessar as informações do usuário autenticado. Ele requer um token JWT válido no cabeçalho de autorização da requisição. Se o token for válido, as informações do usuário serão retornadas na resposta. Caso contrário, a API retornará um erro.

## Como fazer as requisições

As requisições podem ser feitas usando qualquer cliente HTTP, como curl, Postman ou fetch no navegador. Aqui estão alguns exemplos usando curl:

### Sign Up

```bash
curl -X POST -H "Content-Type: application/json" -d '{"nome": "Nome do Usuário", "email": "usuario@email.com", "senha": "senha123", "telefones": [{"numero": "123456789", "ddd": "11"}]}' https://api-escribo-rfqv.onrender.com/signup
```

### Sign In

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email": "usuario@email.com", "senha": "senha123"}' https://api-escribo-rfqv.onrender.com/signin
```

### Get User

```bash
curl -X GET -H "Authorization: Bearer TOKEN_JWT" https://api-escribo-rfqv.onrender.com/user
```

Substitua `TOKEN_JWT` pelo token recebido nas respostas das requisições de Sign Up ou Sign In.

## Instalação e execução local

Para instalar e executar a API localmente, você precisa ter Node.js e npm instalados. Depois, siga estes passos:

1. Clone o repositório: `git clone https://github.com/usuario/projeto.git`
2. Entre no diretório do projeto: `cd projeto`
3. Instale as dependências: `npm install`
4. Inicie o servidor: `npm start`

A API estará disponível em `http://localhost:3000`.
