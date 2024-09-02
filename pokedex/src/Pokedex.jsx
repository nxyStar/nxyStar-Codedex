import { useState, useEffect } from "react";

export default function Pokedex() {
  // Define pokemonList state here 💖
  const [pokemonList, setPokemonList] = useState([]);
  // Define filteredPokemonList state here 💖
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);

  useEffect(function () {
    async function fetchData() {
      try {
        // Fetch from PokeAPI here 💖
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=25");
        const data = await response.json();
        console.log("data: ",data);
        const pokemonDataList = [];
        for (const pokemon of data.results) {
          const pokemonResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonResponse.json();
          pokemonDataList.push(pokemonData);
        }
        // Update state variables here 💖
        setPokemonList(pokemonDataList);
        setFilteredPokemonList(pokemonDataList);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }
    fetchData();
  }, []);

  function handleFilterChange(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredList = [];
    // Filter Pokémon array by search term here 💖
    pokemonList.filter(function(pokemon){
      if (pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())){
          filteredList.push(pokemon);
      }
    })
    // Update filteredPokemonList here 💖
    setFilteredPokemonList(filteredList);
  }

  return (
    <div>
      <h1>Pokemon List</h1>
      <div>
        <input
          type="text"
          placeholder="Search Pokemon..."
          onChange={handleFilterChange}
        />
      </div>
      <ul>
        {filteredPokemonList.map(function (pokemon, index) {
          return (
            <li key={index} className="pokemon">
              <p>
                {pokemon.id}.{" "}
                {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
              </p>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
