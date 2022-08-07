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
async function getToken(_req, res) {
  const token = generateToken();
  return res.status(200).json({ token });
}

// Requisito 5
async function addNewTalker(req, res) {
  const { name, age, talk } = req.body;
  const talkers = await readJson(jsonTalker);
  const newTalker = { id: talkers.length + 1, name, age, talk };
  talkers.push(newTalker);

  await writeJson('./talker.json', talkers);
  res.status(201).json(newTalker);
}

// Requisito 6
async function editTalker(req, res) {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const talkers = await readJson(jsonTalker);

  const talkerIndex = talkers.findIndex((value) => value.id === +id);
  talkers[talkerIndex] = { id: +id, name, age, talk };

  await writeJson(jsonTalker, talkers);
  res.status(200).json(talkers[talkerIndex]);
}

// Requisito 7
async function deleteTalker(req, res) {
  const { id } = req.params;
  const talkers = await readJson(jsonTalker);
  const talker = talkers.filter((value) => value.id !== +id);

  await writeJson(jsonTalker, talker);
  res.status(204).end();
}

// Requisito 8
async function searchTalker(req, res) {
  const { q } = req.query;
  const talkers = await readJson(jsonTalker);

  if (!q) {
    return res.status(200).json(talkers);
  }

  const talker = talkers.filter((value) => value.name.includes(q));
  if (!talker) {
    return res.status(200).json([]);
  }

  return res.status(200).json(talker);
}

module.exports = {
  getTalker,
  getTalkerById,
  getToken,
  addNewTalker,
  editTalker,
  deleteTalker,
  searchTalker,
};