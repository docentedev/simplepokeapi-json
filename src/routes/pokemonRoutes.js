const { Router } = require('express');
const {
  getAllPokemons,
  getPokemonById,
  createPokemon,
  updatePokemon,
  deletePokemon,
} = require('../controllers/pokemonController');

const router = Router();

router.get('/', getAllPokemons);
router.get('/:id', getPokemonById);
router.post('/', createPokemon);
router.put('/:id', updatePokemon);
router.patch('/:id', updatePokemon);
router.delete('/:id', deletePokemon);

module.exports = router;
