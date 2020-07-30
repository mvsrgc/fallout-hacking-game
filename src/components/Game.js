import React, { useState } from "react";

import CharacterSequence from "./CharacterSequence";
import History from "./History";

import { addWords, generateSequences, random } from "./utils";

const characters = "./@.!@#$%^&*()-=+><,[]{}";
const words = ["STORY", "SYNOPSIS", "THE", "PLAYER", "CHARACTER", "STUMBLES", "IRRADIATED", "PRESSURE", "ABILITY"];

function Game() {
  const [history, setHistory] = useState([]);
  const [hasWon, setHasWon] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);

  const [winnerWord] = useState(() => {
    return words[random(words.length)];
  });

  const [sequences] = useState(() => {
    return addWords(generateSequences(34, characters), words, 9);
  });

  const checkWinner = (word) => {
    if (hasWon || attemptsLeft === 0) {
      return;
    }

    setHistory((history) => history.concat([word]));

    if (word === winnerWord) {
      setHistory((history) => history.concat(["Success!"]));
      setHasWon(true);
      return;
    }

    setAttemptsLeft(attemptsLeft - 1);

    if (attemptsLeft - 1 === 0) {
      setHistory((history) => history.concat(["You are locked out!"]));
    } else {
      setHistory((history) => history.concat(["Incorrect attempt!"]));
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
