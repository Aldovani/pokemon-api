const express = require("express");
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
  res.setHeader("content-type", "application/json");
  const wishlist = wishlistCheck(req.query?.wishlist);
  while (true) {
    const pokemonId = randomNumber(0, 897);
    const chance = chancesSpawn[pokemons[pokemonId].rarity];

    if (randomNumber(1, 20) === 1) {
      res.status = 204;
      return res.send({ statusCode: 204 });
    } else if (randomNumber(1, 100) <= chance) {
      return res.send(pokemons[pokemonId]);
    }
    if (wishlist) {
      if (wishlist.some((e) => e - 1 == pokemonId)) {
        if (randomNumber(1, 100) <= chance)
          return res.send(pokemons[pokemonId]);
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

app.listen(process.env.PORT || 8080, () => {
  console.log("server running on port 8080");
});

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function wishlistCheck(whist) {
  try {
    if (!whist) {
      return false;
    }

    const whistConverted = JSON.parse(whist);

    return Array.isArray(whistConverted) && whistConverted.length > 0
      ? whistConverted
      : false;
  } catch {
    return false;
  }
}


app.get("/teste/:rows", (req, res) => {
  const rows = Number(req.params.rows)

  let fugiu = 0;
  let whist = 0;
  let raros = 0;
  let common = 0;
  let uncommon = 0;
  let lendario = 0;
  let besta = 0;
  let mystical = 0;
  let i = 1; 

  for (i; i <=  rows; i++) {
    while (true) {
      const pokemonId = randomNumber(0, 897);
      const chance = chancesSpawn[pokemons[pokemonId].rarity];
      
      if (randomNumber(1, 20) === 1) {
        fugiu++;
        break;
      } else if (randomNumber(1, 100) <= chance) {
        if (pokemons[pokemonId].rarity == "rare") {
          raros++;
          break;
        }
        if (pokemons[pokemonId].rarity == "legendary") {
          lendario++;
          break;
        }
        if (pokemons[pokemonId].rarity == "ultra-beast") {
          besta++;
          break;
        }
        if (pokemons[pokemonId].rarity == "mythical") {
          mystical++;
          break;
        }
        if (pokemons[pokemonId].rarity == "common") {
          common++
          break
        }
        if (pokemons[pokemonId].rarity == "uncommon") {
          uncommon++;
          break
        }
        break;
        // return res.send();
      }
    }
  }
  res.send({

    common: common,
    uncommon:  uncommon,
    raros: raros,
    mythical: mystical,
    lendarios: lendario,
    besta: besta,
    fugiu: fugiu,
    rows: i - 1,
    // total:common+uncommon+raros+mystical+lendario+besta+fugiu
  })

})

