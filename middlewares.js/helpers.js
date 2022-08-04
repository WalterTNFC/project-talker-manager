const crypto = require('crypto');
const fs = require('fs').promises;

async function readJson(jsonTalker) {
  return JSON.parse(await fs.readFile(jsonTalker));
}

// Referencia: https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = {
  readJson,
  generateToken,
};