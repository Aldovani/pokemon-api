const express = require("express");
const { pokemons } = require("./data/pokemonDb.json");
const { randomNumber } = require("./src/utils/math");
const { wishlistCheck } = require("./src/utils/validations");

const app = express();

const chancesSpawn = {
  "ultra-beast": 1,
  legendary: 2,
  mythical: 7,
  rare: 5,
  uncommon: 35,
  common: 50,
};

app.get("/", (req, res) => {
  res.send("👍");
});

app.get("/pokemon", (req, res) => {
  res.send(pokemons);
});

app.get("/pokemon/random", (req, res) => {
  res.setHeader("content-type", "application/json");
  const wishlist = wishlistCheck(req.query?.wishlist);
  while (true) {
    const pokemonId = randomNumber(0, 897);
    const chance = chancesSpawn[pokemons[pokemonId].rarity];
    if (randomNumber(1, 20) === 1) {
      res.status = 204;
      return res.send({ statusCode: 204 });
    } else if (randomNumber(0, 100) <= chance) {
      return res.send(pokemons[pokemonId]);
    }
    if (wishlist) {
      if (wishlist.some((e) => e - 1 == pokemonId)) {
        if (randomNumber(1, 80) <= chance) return res.send(pokemons[pokemonId]);
      }
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
  const pokemon = pokemons.find((e) => e.name === idOrName.toLowerCase());
  if (!pokemon) {
    res.statusCode = 404;
    return res.send({ Error: `pokemon ${idOrName} not found` });
  }

  return res.send(pokemon);
});

app.get("/test/:rows", (req, res) => {
  const rows = Number(req.params.rows);
  if (rows > 10000) return res.send("Ta maluco FDP");
  
  const stats = {
    common: 0,
    uncommon: 0,
    rare: 0,
    mythical: 0,
    legendary: 0,
    "ultra-beast": 0,
    escaped: 0,
    rows: 0,
  };


  for (stats.rows; stats.rows < rows; stats.rows++) {
    while (true) {
      const pokemonId = randomNumber(0, 897);
      const chance = chancesSpawn[pokemons[pokemonId].rarity];

      if (randomNumber(1, 20) === 1) {
        stats.escaped+=1;
        break;
      } else if (randomNumber(0, 100) <= chance) {
        stats[pokemons[pokemonId].rarity]+=1;
        break;
      }
    }
  }
  res.send(stats);
});

app.listen(process.env.PORT || 8080, () => {
  console.log("server running on port 8080");
});