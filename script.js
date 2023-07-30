let pokemons = [];

fetch("pokemons.json")
  .then((response) => response.json())
  .then((data) => {
    pokemons = data;
    displayPokemons(pokemons);
  });

function displayPokemons(pokemons) {
  // Elimina todas las tarjetas existentes
  const container = document.querySelector("#cards");
  container.innerHTML = "";

  // Crea una tarjeta para cada Pokémon
  pokemons.forEach((pokemon) => {
    // Crea un elemento <div> para la tarjeta
    const card = document.createElement("div");
    card.classList.add("card");

    // Crea un elemento <img> para la imagen del Pokémon
    const image = document.createElement("img");
    image.src = pokemon.ThumbnailImage;
    card.appendChild(image);

    // Crea un elemento <h3> para el nombre del Pokémon
    const name = document.createElement("h3");
    name.textContent = pokemon.name;
    card.appendChild(name);

    // Crea un elemento <p> para el tipo del Pokémon
    const type = document.createElement("p");
    type.textContent = `Tipo: ${pokemon.type.join(", ")}`;
    card.appendChild(type);

    // Agrega la tarjeta al contenedor
    container.appendChild(card);

    // Agrega un controlador de eventos de clic a la tarjeta
    card.addEventListener("click", () => showPokemonDetails(pokemon));
  });
}

const searchInput = document.querySelector("#search");
searchInput.addEventListener("keyup", handleSearch);

function handleSearch(event) {
  // Obtiene el texto ingresado por el usuario
  const searchText = event.target.value.toLowerCase();

  // Filtra la lista de Pokémon por nombre
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchText)
  );

  // Muestra solo los Pokémon que coinciden con el texto ingresado
  displayPokemons(filteredPokemons);
}

// Agrega una función para mostrar los detalles del Pokémon en un modal
function showPokemonDetails(pokemon) {
  // Muestra la información del Pokémon en un modal
  const modalBody = document.querySelector("#pokemon-modal .modal-body");
  modalBody.innerHTML = `
        <h4>${pokemon.name} (#${pokemon.number})</h4>
        <img src="${pokemon.ThumbnailImage}" alt="${pokemon.name}">
        <p>Altura: ${pokemon.height} cm</p>
        <p>Peso: ${pokemon.weight} kg</p>
        ${
          pokemon.moves
            ? `<p>Movimientos: ${pokemon.moves.join(", ")}</p>`
            : ""
        }
    
        ${
            pokemon.weakness
              ? `<p>Debilidades: ${pokemon.weakness.join(", ")}</p>`
              : ""
        }
      ${
        pokemon.abilities
          ? `<p>Habilidades: ${pokemon.abilities.join(", ")}</p>`
          : ""
      }
      <a href="${pokemon.detailPageURL}" target="_blank">Más información</a>
    `;
  const modal = new bootstrap.Modal(
    document.querySelector("#pokemon-modal")
  );
  modal.show();
}