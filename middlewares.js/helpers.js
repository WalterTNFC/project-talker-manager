const crypto = require('crypto');
const fs = require('fs').promises;

async function readJson(jsonTalker) {
  return JSON.parse(await fs.readFile(jsonTalker));
}

async function writeJson(fileContent, json) {
  await fs.writeFile(fileContent, JSON.stringify(json));
}

// Referencia: https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = {
  readJson,
  generateToken,
  writeJson,
};