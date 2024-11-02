import { useContext } from "react";
import { UserContext } from "./UserContext";
import { Button }from "@mui/material";

export default function Results({ element, pokemonData }) {
  // reference the context for the "name".
  const { name } =  useContext(UserContext);

  function handleRestart(){
    window.location.assign("../");
  }

  return (
    <div>
      <p>
        Hey <strong>{name}</strong>, your type is: {element}.
      </p>
      {pokemonData ? (
        <div className="artwork">
            <p>Your Pokémon is <strong> {pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1)}</strong></p>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.forms.name} />
        </div>
      ) : (
        <p>No Pokémon found.</p>
      )}
      <nav className="navbar">
        <Button onClick={handleRestart}>Restart Quiz</Button>
      </nav>
    </div>
  );
}