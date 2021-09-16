const express = require("express");
const pokemonDB = require("./data/pokemonDb.json");
const app = express();

app.get("/", (req, res) => {
  res.send("👍");
});

app.get("/pokemon", (req, res) => {
  res.send(pokemonDB);
});

// traz apenas um pokemons   pelo  id ou nome
app.get("/pokemon/:idOrName", (req, res) => {
  const { idOrName } = req.params;

  if (!isNaN(req.params.idOrName)) {
    const pokemon = pokemonDB.pokemons.find((e) => e.id == idOrName);

    if (!pokemon) {
      res.statusCode = 404;
      return res.send({ Error: `Pokemon id ${idOrName} not found` });
    }

    return res.send(pokemon);
  }
  const pokemon = pokemonDB.pokemons.find(
    (e) => e.name === idOrName.toLowerCase()
  );
  if (!pokemon) {
    res.statusCode = 404;
    return res.send({ Error: `pokemon ${idOrName} not found` });
  }

  return res.send(pokemon);
});

// Pega os pokemons  apenas  pelo tipo tipo
app.get("/pokemon/rarity/:type", (req, res) => {
  res.type("json");
  const { type } = req.params;

  const rarity = pokemonDB.pokemons.filter((e) => {
    return e.rarity == type;
  });

  if (rarity.length === 0) {
    res.statusCode = 404;
    return res.send({ Error: "type not found" });
  }
  return res.send(rarity);
});

app.get("/pokemon/raridade/:type/:idOrName", (req, res) => {
  const { idOrName, type } = req.params;
  res.type("json");

  const result = pokemonDB.pokemons.filter(
    (e) => e.rarity.toLowerCase() == type.toLowerCase()
  );

  if (result.length === 0) {
    res.statusCode = 404;
    return res.send({ Error: "type not found" });
  }

  if (!isNaN(idOrName)) {
    const result2 = result.find((e) => e.id == idOrName);
    if (!result2) {
      res.statusCode = 404;
      return res.send({ Error: "pokemon not found" });
    }
    return res.send(result2);
  }
  const result2 = result.find(
    (e) => e.name.toLowerCase() == idOrName.toLowerCase()
  );
  if (!result2) {
    res.statusCode = 404;
    return res.send({ Error: `pokemon ${req.params.idName} not found` });
  }
  return res.send(result2);
});

app.get("/pokemon/types/:type", (req, res) => {
  const { type } = req.params;
  const result = pokemonDB.pokemons.filter((types) =>
    types.types.includes(type)
  );
  if (result.length === 0) {
    res.statusCode = 404;
    return res.send({ Error: `Type ${type} not found` });
  }

  res.send(result);
});
app.listen(process.env.PORT || 8080, () => {
  console.log("server running on port 8080");
});
