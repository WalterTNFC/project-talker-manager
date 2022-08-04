const { readJson, generateToken } = require('./helpers');

const jsonTalker = './talker.json';

// Requisito 1:
async function getTalker(_req, res) {
  const talkers = await readJson(jsonTalker);
  return res.status(200).json(talkers);
}

// Requisito 2:
async function getTalkerById(req, res) {
  const { id } = req.params;
  const talkers = await readJson(jsonTalker);
  const talkerById = talkers.find((value) => value.id === +id);
  if (!talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talkerById);
}

// Requisito 3
async function handleLogin(req, res) {
  const { email, password } = req.body;
  const token = generateToken();
  if (!email || !password) {
    return res.status(400).json({ message: 'Email ou senha não cadastrados' });
  }
  return res.status(200).json({ token });
}

module.exports = {
  getTalker,
  getTalkerById,
  handleLogin,
};