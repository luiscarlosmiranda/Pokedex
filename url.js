const fs = require("fs");

// Lee el archivo JSON
const data = JSON.parse(fs.readFileSync("pokemons.json", "utf8"));

// Modifica los valores de la propiedad detailPageURL
data.forEach((pokemon) => {
  pokemon.detailPageURL = `https://www.pokemon.com${pokemon.detailPageURL}`;
});

// Guarda los cambios en el archivo
fs.writeFileSync("pokemons.json", JSON.stringify(data, null, 2));