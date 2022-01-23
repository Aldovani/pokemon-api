const express = require("express");
const PokemonController = require("./src/controller/PokemonController");
const routes = express.Router()


routes.get("/", (req, res) => {
  res.send("👍");
});

routes.get("/pokemon", PokemonController.ListarTodos);

routes.get("/pokemon/random", PokemonController.PokemonRandom);

routes.get("/pokemon/:idOrName", PokemonController.ListarPokemonNameOrId);

routes.get("/teste/:rows", PokemonController.TesteChanceSpawn);


module.exports = routes;