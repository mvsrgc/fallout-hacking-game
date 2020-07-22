import React from "react";

import CharacterSequence from "./CharacterSequence";

function Game() {
  let nbAttempsLeft = 3;

  let characters = "./@.!@#$%^&*()-=+><,[]{}";
  let words = ["STORY", "SYNOPSIS", "THE", "PLAYER", "CHARACTER", "STUMBLES", "IRRADIATED", "PRESSURE", "ABILITY"];

  /**
   * Generates a string from filler characters. Ex: "*.!++}/.,.#^"
   * @param {*} characters the characters to randomly choose from
   * @param {*} length the length of the filler string
   */
  function generateFiller(characters, length) {
    let filler = "";

    for (let i = 0; i < length; i++) {
      filler += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return filler;
  }

  /**
   * Each row is preceded by 0x${HEXCODE}.
   * @param {*} hexStart the decimal number to use as a starting point.
   * @param {*} i number of times to multiply increment by.
   * @param {*} increment the increment to use when adding to hexStart.
   */
  function generateHex(hexStart, i, increment) {
    // Each row has a HEX identifier which starts at 61623 (decimal) and increases by 12 every row.
    // Ex: 0xF0B7, 0xF0C3, etc.
    const hex = `0x${(hexStart + increment * i).toString(16).toLocaleUpperCase()}`;

    return hex;
  }

  /**
   * Generates an array of sequences in the Fallout terminal format.
   * Ex: 0xEF8B %^ABILITY/.}
   * @param {*} amount how many sequences to put in the array.
   */
  function generateSequences(amount) {
    let sequences = [];

    for (let i = 0; i < amount; i++) {
      let sequence = `${generateHex(61323, i, 12)} ${generateFiller(characters, 12)}`;
      sequences.push(sequence);
    }

    return sequences;
  }

  /**
   * Randomly adds words from a word list to an array of sequences.
   * @param {*} sequences the array of sequences to add words to.
   * @param {*} words the word list to choose from.
   * @param {*} amount the amount of words to add in the sequences array.
   */
  function addWords(sequences, words, amount) {
    const lengthOfHex = 7;

    for (let i = 0; i < amount; i++) {
      // Choose a word in the word list and remove it after (prevent duplicates).
      let wordIndex = Math.floor(Math.random() * words.length);
      let word = words[wordIndex];
      words.splice(wordIndex, 1);

      // Choose a random number that will determine where the word starts in the sequence.
      // (12 - word.length) is the remaining spaces for filler characters.
      let wordStart = Math.floor(Math.random() * (12 - word.length));

      // Choose a random sequence to add a word to. TODO: Prevent duplicates.
      let index = Math.floor(Math.random() * sequences.length);
      sequences[index] = sequences[index].substr(0, wordStart + lengthOfHex) + word + sequences[index].substr(wordStart + word.length + lengthOfHex);
    }
  }

  let sequences = generateSequences(34);

  addWords(sequences, words, 9);

  return (
    <div id="App">
      <div id="terminal">
        <div className="header">
          <p>ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL</p>
          <p>ENTER PASSWORD NOW</p>
        </div>
        <div className="attempts">
          <p>{nbAttempsLeft} ATTEMPT(S) LEFT...</p>
        </div>
        {sequences.map((sequence) => (
          <CharacterSequence sequence={`${sequence}`}></CharacterSequence>
        ))}
      </div>
    </div>
  );
}

export default Game;
