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
async function getAndValidateToken(req, res) {
  const token = generateToken();
  return res.status(200).json({ token });
}

// Requisito 5
function verifyWatched(date) {
  const dividedDate = date.split('/');
  if (dividedDate[0].length === 2
    && dividedDate[1].length === 2
    && dividedDate[2].length === 4) {
    return false;
  }
  return true;
}

function verifyToken(req, res, next) {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
}
// Verificação nome e idade Req-4
function verifyNameAge(req, res, next) {
  const { name, age } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (Number(age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

function verifyTalk(req, res, next) {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }

  next();
}

function verifyValue(req, res, next) {
  const { talk: { watchedAt, rate } } = req.body;
  if (!watchedAt || !rate) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }
  if (verifyWatched(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
}

function verifyRate(req, res, next) {
  const { talk: { rate } } = req.body;

  if (rate < 1 || rate > 6) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
}

async function getOtherTalker(req, res) {
  const { name, age, talk } = req.body;
  // const talkers = JSON.parse(await fs.readFile('./talker.json'));
  const talkers = await readJson('./talker.json');
  const newTalker = { id: talkers.length + 1, name, age, talk };
  talkers.push(newTalker);

  // await fs.writeFile('./talker.json', JSON.stringify(talkers));
  await writeJson('./talker.json', talkers);
  res.status(201).json(newTalker);
}

module.exports = {
  getTalker,
  getTalkerById,
  getAndValidateToken,
  verifyToken,
  verifyNameAge,
  verifyTalk,
  verifyValue,
  verifyRate,
  getOtherTalker,
};