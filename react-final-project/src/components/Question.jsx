import { useContext } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";

export default function Question({ question, options, onAnswer }) {
  const { name } =  useContext(UserContext);
  if (name == "") {
    return (
      <div>
        Please enter a name <Link to="/">here</Link>.
      </div>
    )
  } else {
    return (
      <div>
        <h2>{question}</h2>
        {options.map(function (option) {
          return (
            <button
              key={option}
              onClick={function () {
                onAnswer(option);
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    );
  }
    
}
  
// Question.propTypes = {
//    question: null,
//    options: null,
//    onAnswer: null
// }; 
  