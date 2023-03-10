// Requisito 4
async function loginValidation(req, res, next) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!(email.match(/^[^\s@!#$%"'&*()]+@[^\s@!#$%"'&*()]+\.com+$/))) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
}

// Requisito 5
function tokenValidation(req, res, next) {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
}

function nameValidation(req, res, next) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
}
function ageValidation(req, res, next) {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

function talkerValidation(req, res, next) {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório' },
    );
  }

  next();
}

function rateValidation(req, res, next) {
  const { talk } = req.body;
  if (talk.rate === undefined) {
    return res.status(400).json(
      { message: 'O campo "rate" é obrigatório' },
    );
  }

  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
}

function watchedAtValidation(req, res, next) {
  const { talk } = req.body;
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!talk.watchedAt) {
    return res.status(400).json(
      { message: 'O campo "watchedAt" é obrigatório' },
    );
  }
  if (!dateRegex.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
}

module.exports = {
  loginValidation,
  tokenValidation,
  nameValidation,
  ageValidation,
  talkerValidation,
  rateValidation,
  watchedAtValidation,
};
