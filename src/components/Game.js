import React, { useState } from "react";

import CharacterSequence from "./CharacterSequence";

import { addWords, generateSequences, random } from "./utils";

const characters = "./@.!@#$%^&*()-=+><,[]{}";
const words = ["STORY", "SYNOPSIS", "THE", "PLAYER", "CHARACTER", "STUMBLES", "IRRADIATED", "PRESSURE", "ABILITY"];

function Game() {
  const [attemptsLeft, setAttemptsLeft] = useState(3);

  const [sequences] = useState(() => {
    return addWords(generateSequences(34, characters), words, 9);
  });

  const [winnerWord] = useState(() => {
    return words[random(words.length)];
  });

  const checkWinner = (word) => {
    if (word === winnerWord) {
      console.log("You win!");
      return;
    }

    if (attemptsLeft > 0) {
      setAttemptsLeft(attemptsLeft - 1);
    } else {
      console.log("You lose!");
    }
  };

  return (
    <div id="terminal">
      <div className="header">
        <p>ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL</p>
        <p>ENTER PASSWORD NOW</p>
        <p>Winner word: {winnerWord}</p>
      </div>
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
      {sequences.map((sequence, index) => (
        <CharacterSequence key={index} sequence={sequence} checkWinner={checkWinner}></CharacterSequence>
      ))}
    </div>
  );
}

export default Game;
