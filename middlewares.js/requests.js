const { readJson } = require('./helpers');

const jsonTalker = './talker.json';

async function getTalker(_req, res) {
  const talker = await readJson(jsonTalker);
  return res.status(200).json(talker);
}

module.exports = {
  getTalker,
};