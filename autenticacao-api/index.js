
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'senha1234';

const users = [];

app.use(bodyParser.json());


app.post('/signup', (req, res) => {
  const { nome, email, senha, telefones } = req.body;

  // verifica se o email ja esta cadastrado
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ mensagem: 'E-mail já existente' });
  }

  // criar um novo usuário
  const newUser = {
    id: generateGUID(),
    nome,
    email,
    senha: bcrypt.hashSync(senha, 10),
    telefones,
    data_criacao: new Date(),
    ultimo_login: null,
  };

  // gerando token JWT
  const token = generateToken(newUser.id);

  // atualiza o ultimo login do usuário
  newUser.ultimo_login = new Date();

  // adc o novo usario a lista
  users.push(newUser);

  res.json({
    id: newUser.id,
    data_criacao: newUser.data_criacao,
    ultimo_login: newUser.ultimo_login,
    token,
  });
});

// Endpoint para o Sign In
app.post('/signin', (req, res) => {
  const { email, senha } = req.body;

  // Verifica se o usuário existe
  const user = users.find(u => u.email === email);

  if (!user || !bcrypt.compareSync(senha, user.senha)) {
    return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
  }

  // Gera um novo token JWT
  const token = generateToken(user.id);

  // Atualiza o último login do usuário
  user.ultimo_login = new Date();

  res.json({
    id: user.id,
    data_criacao: user.data_criacao,
    ultimo_login: user.ultimo_login,
    token,
  });
});

// Endpoint para buscar usuário
app.get('/user', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.userId);

  if (!user) {
    return res.status(401).json({ mensagem: 'Não autorizado' });
  }

  res.json({
    id: user.id,
    data_criacao: user.data_criacao,
    ultimo_login: user.ultimo_login,
  });
});

// Função para gerar GUID
function generateGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Função para gerar Token JWT
function generateToken(userId) {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '30m' });
}

// Middleware para autenticação com Token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensagem: 'Não autorizado' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ mensagem: 'Sessão inválida' });
    }

    req.userId = user.userId;
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
