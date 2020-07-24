import React, { useState } from "react";

import CharacterSequence from "./CharacterSequence";

import { addWords, generateSequences } from "./utils";

const characters = "./@.!@#$%^&*()-=+><,[]{}";
const words = ["STORY", "SYNOPSIS", "THE", "PLAYER", "CHARACTER", "STUMBLES", "IRRADIATED", "PRESSURE", "ABILITY"];

function Game() {
  const [attempsLeft, setAttempsLeft] = useState(3);

  const [sequences, setSequences] = useState(() => {
    return addWords(generateSequences(34, characters), words, 9);
  });

  return (
    <div id="terminal">
      <div className="header">
        <p>ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL</p>
        <p>ENTER PASSWORD NOW</p>
      </div>
      <div className="attempts">
        <p>{attempsLeft} ATTEMPT(S) LEFT...</p>
      </div>
      {sequences.map((sequence) => (
        <CharacterSequence sequence={`${sequence}`}></CharacterSequence>
      ))}
    </div>
  );
}

export default Game;
