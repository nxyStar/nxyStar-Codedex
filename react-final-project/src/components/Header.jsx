import { Link } from "react-router-dom";
import { Button }from "@mui/material";

export default function Header() {
    return (
        <nav className="navbar">
          <h1>Who's Your Pokémon ?</h1>
        <Link to="/"><Button>Home</Button></Link>
        <Link to="/quiz"><Button>Quiz</Button></Link>
      </nav>
    );
}