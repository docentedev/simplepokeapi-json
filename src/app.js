const express = require('express');
const pokemonRoutes = require('./routes/pokemonRoutes');

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: 'SimplePokeAPI JSON activa',
    endpoints: {
      list: 'GET /api/pokemons',
      byId: 'GET /api/pokemons/:id',
      create: 'POST /api/pokemons',
      update: 'PUT/PATCH /api/pokemons/:id',
      delete: 'DELETE /api/pokemons/:id',
    },
  });
});

app.use('/api/pokemons', pokemonRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

module.exports = app;
