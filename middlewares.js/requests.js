const { readJson } = require('./helpers');

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

module.exports = {
  getTalker,
  getTalkerById,
};