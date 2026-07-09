const { readData, writeData } = require('../utils/dataStore');

function getNextId(items) {
  if (items.length === 0) {
    return 1;
  }

  return Math.max(...items.map((item) => item.id || 0)) + 1;
}

function parseId(value) {
  return Number.parseInt(value, 10);
}

async function getAllPokemons(_req, res) {
  const pokemons = await readData();
  res.status(200).json(pokemons);
}

async function getPokemonById(req, res) {
  const id = parseId(req.params.id);
  const pokemons = await readData();
  const pokemon = pokemons.find((item) => item.id === id);

  if (!pokemon) {
    return res.status(404).json({ message: 'Pokemon no encontrado' });
  }

  return res.status(200).json(pokemon);
}

async function createPokemon(req, res) {
  const { name, type, imageUrl } = req.body;

  if (!name || !type) {
    return res.status(400).json({ message: 'name y type son obligatorios' });
  }

  const pokemons = await readData();
  const newPokemon = {
    id: getNextId(pokemons),
    name,
    type,
    imageUrl: imageUrl || null,
    createdAt: new Date().toISOString(),
  };

  pokemons.push(newPokemon);
  await writeData(pokemons);

  return res.status(201).json(newPokemon);
}

async function updatePokemon(req, res) {
  const id = parseId(req.params.id);
  const { name, type, imageUrl } = req.body;
  const pokemons = await readData();
  const index = pokemons.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Pokemon no encontrado' });
  }

  const current = pokemons[index];
  pokemons[index] = {
    ...current,
    ...(name !== undefined ? { name } : {}),
    ...(type !== undefined ? { type } : {}),
    ...(imageUrl !== undefined ? { imageUrl } : {}),
    updatedAt: new Date().toISOString(),
  };

  await writeData(pokemons);
  return res.status(200).json(pokemons[index]);
}

async function deletePokemon(req, res) {
  const id = parseId(req.params.id);
  const pokemons = await readData();
  const index = pokemons.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Pokemon no encontrado' });
  }

  pokemons.splice(index, 1);
  await writeData(pokemons);

  return res.status(204).send();
}

module.exports = {
  getAllPokemons,
  getPokemonById,
  createPokemon,
  updatePokemon,
  deletePokemon,
};
