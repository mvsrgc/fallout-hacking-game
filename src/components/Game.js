import React, { useReducer } from "react";

import CharacterSequence from "./CharacterSequence";
import History from "./History";

import { addWords, generateSequences, random } from "./utils";

const characters = "./@.!@#$%^&*()-=+><,[]{}";
const words = ["STORY", "SYNOPSIS", "THE", "PLAYER", "CHARACTER", "STUMBLES", "IRRADIATED", "PRESSURE", "ABILITY"];

const gameReducer = (state, action) => {
  switch (action.type) {
    case "attempt":
      return {
        ...state,
        attemptsLeft: state.attemptsLeft - 1,
      };
    case "add-to-history":
      return {
        ...state,
        history: state.history.concat(action.payload),
      };
    case "win":
      return {
        ...state,
        hasWon: true,
      };
    default:
      break;
  }
};

const initialState = {
  history: [],
  hasWon: false,
  attemptsLeft: 3,
  winnerWord: words[random(words.length)],
  sequences: addWords(generateSequences(34, characters), words, 9),
};

function Game() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const { history, hasWon, attemptsLeft, winnerWord, sequences } = state;

  const checkWinner = (word) => {
    if (hasWon || attemptsLeft === 0) {
      return;
    }

    dispatch({ type: "add-to-history", payload: word });

    if (word === winnerWord) {
      dispatch({ type: "add-to-history", payload: "Success!" });
      dispatch({ type: "win" });
      return;
    }

    dispatch({ type: "attempt" });

    if (attemptsLeft - 1 === 0) {
      dispatch({ type: "add-to-history", payload: "You are locked out!" });
    } else {
      dispatch({ type: "add-to-history", payload: "Incorrect attempt!" });
    }
  };

  return (
    <div id="terminal">
      {/* Header displaying information about the state of the game. */}
      <div className="header">
        <p>ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL</p>
        <p>ENTER PASSWORD NOW</p>
        <p>Winner word: {winnerWord}</p>
      </div>

      {/* Display the remaining attemps. */}
      <div className="attempts">
        <p>
          <span className="attemptsLeft">{attemptsLeft} ATTEMPT(S) LEFT:</span>
          {Array.from({ length: attemptsLeft }, (index) => (
            <span key={index} className="attempt">
              ▇
            </span>
          ))}
        </p>
      </div>

      <div className="main">
        {/* The randomly generated sequences of characters and words. */}
        <div className="sequences">
          {sequences.map((sequence, index) => (
            <CharacterSequence key={index} sequence={sequence} checkWinner={checkWinner}></CharacterSequence>
          ))}
        </div>

        {/* Shows past selections, and whether an attempt was correct or not. */}
        <div className="history">
          {history.map((entry, index) => (
            <History key={index} entry={entry}></History>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Game;
