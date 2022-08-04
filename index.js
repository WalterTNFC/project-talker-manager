const express = require('express');
const bodyParser = require('body-parser');
const { getTalker, getTalkerById } = require('./middlewares.js/requests');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Requisito 1:
app.get('/talker', getTalker);

// Requisito 2:
app.get('/talker/:id', getTalkerById);

// não remova esse endpoint, e para o avaliador funcionar!
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
