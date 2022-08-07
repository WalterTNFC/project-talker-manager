const { readJson, generateToken, writeJson } = require('./helpers');

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

// Requisito 3 e 4
async function getToken(req, res) {
  const token = generateToken();
  return res.status(200).json({ token });
}

// Requisito 5
async function addNewTalker(req, res) {
  const { name, age, talk } = req.body;
  const talkers = await readJson('./talker.json');
  const newTalker = { id: talkers.length + 1, name, age, talk };
  talkers.push(newTalker);

  await writeJson('./talker.json', talkers);
  res.status(201).json(newTalker);
}

module.exports = {
  getTalker,
  getTalkerById,
  getToken,
  addNewTalker,
};