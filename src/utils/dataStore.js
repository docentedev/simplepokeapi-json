const fs = require('fs/promises');
const path = require('path');

const DATA_PATH = path.resolve(process.cwd(), 'data.json');

async function ensureDataFile() {
  try {
    await fs.access(DATA_PATH);
  } catch {
    await fs.writeFile(DATA_PATH, '[]\n', 'utf8');
  }
}

async function readData() {
  await ensureDataFile();

  const fileContent = await fs.readFile(DATA_PATH, 'utf8');
  if (!fileContent.trim()) {
    return [];
  }

  try {
    const parsed = JSON.parse(fileContent);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeData(data) {
  await fs.writeFile(DATA_PATH, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

module.exports = {
  readData,
  writeData,
};
