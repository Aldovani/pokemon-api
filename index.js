const express = require("express");
const res = require("express/lib/response");
const { pokemons } = require("./data/pokemonDb.json");
const app = express();

const chancesSpawn = {
  "ultra-beast": 1,
  legendary: 1,
  mythical: 3,
  rare: 10,
  uncommon: 30,
  common: 90,
};

app.get("/", (req, res) => {
  res.send("👍");
});

app.get("/pokemon", (req, res) => {
  res.send(pokemons);
});
app.get("/pokemon/random", (req, res) => {
  while (true) {
    const pokemonId =randomNumber(898,1)
    
    const chance = chancesSpawn[pokemons[pokemonId].rarity];

    if (randomNumber(12,1) === 1) {
      res.status=204
      return res.send({ statusCode: 204 });
    } else if (randomNumber(100,1) <= chance) {
      return res.send(pokemons[pokemonId]);
    }
  }
});

// traz apenas um pokemons   pelo  id ou nome
app.get("/pokemon/:idOrName", (req, res) => {
  const { idOrName } = req.params;

  if (!isNaN(req.params.idOrName)) {
    const pokemon = pokemons.find((e) => e.id == idOrName);

    if (!pokemon) {
      res.statusCode = 404;
      return res.send({ Error: `Pokemon id ${idOrName} not found` });
    }

    return res.send(pokemon);
  }
  const pokemon = pokemons.find(
    (e) => e.name === idOrName.toLowerCase()
  );
  if (!pokemon) {
    res.statusCode = 404;
    return res.send({ Error: `pokemon ${idOrName} not found` });
  }

  return res.send(pokemon);
});



app.listen(process.env.PORT || 8080, () => {
  console.log("server running on port 8080");
});


function randomNumber(min, max) {  
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}