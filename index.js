const express = require("express");
const pokemonDB = require("./data/pokemonDb.json");
const app = express();

app.get("/", (req, res) => {
  res.type("json");
  res.send(pokemonDB);
});

app.get("/pokemon/:id", (req, res) => {
  res.type("json");

  const result = pokemonDB.pokemons.filter((e) => {
    return e.id == req.params.id;
  });

  if (result.length === 0) {
    res.send({"Error":"Pokemon not found"});    
  }

  res.send(result);
});


app.get("/pokemon/raridade/:tipo", (req, res) => {
  res.type("json");

  const result = pokemonDB.pokemons.filter((e) => {
    return e.raridade == req.params.tipo;
  });

  if (result.length === 0) {
    res.send({"Error":"type not found"});    
  }

  res.send(result);
});


app.listen(8080, () => {
  console.log("server running on port 8080");
});
