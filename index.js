const express = require("express");
const pokemonDB = require("./data/pokemonDb.json");
const app = express();

app.get("/", (req, res) => {
  res.send("👍");
});

app.get("/pokemon", (req, res) => {
  res.type("json");
  res.send(pokemonDB);
});

app.get("/pokemon/:id", (req, res) => {
  res.type("json");

  if (!isNaN(req.params.id)) {
    const result = pokemonDB.pokemons.filter((e) => {
      return e.id == req.params.id;
    });

    if (result.length === 0) {
      res.send({ Error: "Pokemon not found" });
    }
    return res.send(result);
  } else {
    const result = pokemonDB.pokemons.filter((e) => {
      return e.name == req.params.id;
    });

    if (result.length === 0) {
      res.send({ Error: "Pokemon not found" });
    }
    return res.send(result);
  }
});

app.get("/pokemon/raridade/:tipo", (req, res) => {
  res.type("json");

  const raridade = pokemonDB.pokemons.filter((e) => {
    return e.raridade == req.params.tipo;
  });

  if (raridade.length === 0) {
    res.send({ Error: "type not found" });
  }

  return res.send(result);
});

app.get("/pokemon/raridade/:tipo/:idName", (req, res) => {
  res.type("json");

  const result = pokemonDB.pokemons.filter(
    (e) => e.raridade == req.params.tipo
  );

  if (result.length === 0) {
    res.send({ Error: "type not found" });
  }

  if (!isNaN(req.params.idName)) {
    const result2 = result.filter((e) => e.id == req.params.idName);
    if (result2.length === 0) {
      res.send({ Error: "pokemon not found" });
    }
    return res.send(result2);
  } else {
    const result2 = result.filter((e) => e.name == req.params.idName);
    if (result2.length === 0) {
      res.send({ Error: "pokemon not found" });
    }
    return res.send(result2);
  }

  return res.send(result);
});

app.listen(process.env.PORT || 8080, () => {
  console.log("server running on port 8080");
});
