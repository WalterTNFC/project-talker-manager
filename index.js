const express = require('express');
const bodyParser = require('body-parser');
const {
  getTalker,
  getTalkerById,
  addNewTalker,
  getToken,
  editTalker,
 } = require('./middlewares.js/requests');
const {
  nameValidation,
  ageValidation,
  talkerValidation, 
  rateValidation,
  watchedAtValidation, 
  loginValidation, 
  tokenValidation } = require('./middlewares.js/validation');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Requisito 1:
app.get('/talker', getTalker);

// Requisito 2:
app.get('/talker/:id', getTalkerById);

// Requisito 3 e 4;
app.post('/login', loginValidation, getToken);

// Requisito 5
app.post(
  '/talker',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkerValidation,
  rateValidation,
  watchedAtValidation,
  addNewTalker,
);

// Requisito 6
app.put('/talker/:id',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkerValidation,
  rateValidation,
  watchedAtValidation,
  editTalker);

// não remova esse endpoint, e para o avaliador funcionar!
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
