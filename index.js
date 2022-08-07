const express = require('express');
const bodyParser = require('body-parser');
const {
  getTalker,
  getTalkerById,
  getAndValidateToken, 
  verifyToken,
  verifyNameAge,
  verifyTalk,
  verifyValue,
  verifyRate,
  getOtherTalker,
 } = require('./middlewares.js/requests');
const { tokenValidation } = require('./middlewares.js/validation');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Requisito 1:
app.get('/talker', getTalker);

// Requisito 2:
app.get('/talker/:id', getTalkerById);

// Requisito 3 e 4;
app.post('/login', tokenValidation, getAndValidateToken);

// Requisito 5
app.post(
  '/talker',
  verifyToken,
  verifyNameAge,
  verifyTalk,
  verifyValue,
  verifyRate,
  getOtherTalker,
);

// não remova esse endpoint, e para o avaliador funcionar!
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
