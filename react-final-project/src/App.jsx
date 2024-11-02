import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';

import "./App.css";

import { UserProvider } from "./components/UserContext.jsx";
import Header from "./components/Header";
import Question from "./components/Question";
import UserForm from "./components/UserForm";
import Results from "./components/Results";


export default function App() {
  const { userName, setUserName } = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [element, setElement] = useState("");
  const [pokemonData, setPokemonData] = useState(null);

  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
    {
      question: "Which is your favourite move?",
      options: ["Thunderbolt⚡", "Flamethrower🔥", "Water Gun💦", "Seed Bomb🍃"],
    },
    {
      question: "What's your favourite fruit?",
      options: ["Apple 🍎", "Banana 🍌", "Kiwi 🥝", "Grapes 🍇"],
    },
    {
      question: "How would your friends describe you?",
      options: ["The greatest friend in the world", "Kind and Silly", "Cute and Funny", "Abit grumpy"],
    },
    {
      question: "Are you pretty popular?",
      options: ["Everybody knows about me 😍", "I have alot of friends 😆", "I have a few friends ❤️", "I have a friend 😄"],
    }
  ];

  const keywords = {
    Fire: "charmander",
    Water: "squirtle",
    Grass: "bulbasaur",
    Electric: "pikachu",
  };

  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Grass",
    "Yellow 🟡": "Electric",
    // Continue mapping all your possible options to a keyword
    "Flamethrower🔥": "Fire",
    "Water Gun💦": "Water",
    "Seed Bomb🍃": "Grass",
    "Thunderbolt⚡": "Electric",

    "Apple 🍎": "Fire",
    "Grapes 🍇": "Water",
    "Kiwi 🥝": "Grass",
    "Banana 🍌": "Electric",

    "Kind and Silly": "Fire",
    "Cute and Funny": "Water",
    "Abit grumpy": "Grass",
    "The greatest friend in the world": "Electric",

    "I have a friend": "Fire",
    "I have alot of friends": "Water",
    "I have a few friends": "Grass",
    "Everybody knows about me": "Electric",
  };

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  function handleUserFormSubmit(name) {
    
    setUserName(name);
  };

  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    });
  };

  async function fetchPokemon(pokemonName) {
    async function fetchPokemon() {
      try {
        // Fetch from PokeAPI here 💖
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/"+pokemonName);
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }
    fetchPokemon();
    []
  }

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchPokemon(keywords[selectedElement]);
      }
    },
    [currentQuestionIndex]
  );

  return (
      <UserProvider value={{ name: userName, setName: setUserName }}>
      <Header />
        <Routes>
          <Route path="/" element={<UserForm  onSubmit={handleUserFormSubmit}/>} />
          <Route path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
              ) : (
                <Results element={element} pokemonData={pokemonData} />
              )
            }/>
        </Routes>
      </UserProvider>
  );
  
}
