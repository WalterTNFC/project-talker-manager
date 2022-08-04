const fs = require('fs').promises;

async function readJson(jsonTalker) {
  return JSON.parse(await fs.readFile(jsonTalker));
}

module.exports = {
  readJson,
};
