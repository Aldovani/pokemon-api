const express = require("express");
const { json } = require("express/lib/response");
const { pokemons } = require("./data/pokemonDb.json");
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
  // const wishlist = JSON.parse(req.query?.pokemon) || false;
  while (true) {
    const pokemonId = randomNumber(0, 897);
    const chance = chancesSpawn[pokemons[pokemonId].rarity];

    // if (Array.isArray(wishlist) && wishlist.length > 0) {
    //   if (wishlist.some((e) => e == pokemonId + 1)) {
    //     res.send(pokemons[pokemonId + 1]);
    //   }
    // }

    if (randomNumber(1, 20) === 1) {
      res.status = 204;
      return res.send({ statusCode: 204 });
    } else if (randomNumber(1, 100) <= chance) {
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
  const pokemon = pokemons.find((e) => e.name === idOrName.toLowerCase());
  if (!pokemon) {
    res.statusCode = 404;
    return res.send({ Error: `pokemon ${idOrName} not found` });
  }

  return res.send(pokemon);
});

app.listen(process.env.PORT || 8080, () => {
  console.log("server running on port 8080");
});

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
