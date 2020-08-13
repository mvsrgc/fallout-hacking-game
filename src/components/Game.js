import React, { useReducer } from "react";

import CharacterSequence from "./CharacterSequence";
import History from "./History";

import { addWords, generateSequences, random, countCorrectCharacters } from "./utils";

const characters = "./@.!@#$%^&*()-=+><,[]{}";
const words = ["STORY", "SYNOPSIS", "THE", "PLAYER", "CHARACTER", "STUMBLES", "IRRADIATED", "PRESSURE", "ABILITY"];

/**
 * Concatenates the newest attempt and information relating to it to the history array.
 * @param {string} word the word selected by the user.
 * @param {string} winnerWord the word that wins the game.
 * @param {number} nbCorrectCharacters the amount of correct characters in the word.
 * @param {string} feedback feedback relating to the attempt.
 */
const updateHistory = (word, winnerWord, nbCorrectCharacters, feedback) => {
  const message = `${nbCorrectCharacters}/${winnerWord.length} correct.`;
  return [word, message, feedback];
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case "check-winner":
      if (state.hasWon || state.attemptsLeft === 0) {
        return { ...state };
      }

      if (action.payload === state.winnerWord) {
        return {
          ...state,
          hasWon: true,
          history: state.history.concat([action.payload, "Success!"]),
        };
      }

      if (state.attemptsLeft - 1 === 0) {
        return {
          ...state,
          attemptsLeft: state.attemptsLeft - 1,
          history: state.history.concat([action.payload, `${countCorrectCharacters(state.winnerWord, action.payload)}/${state.winnerWord.length} correct.`, "You are locked out!"]),
        };
      }

      return {
        ...state,
        attemptsLeft: state.attemptsLeft - 1,
        history: state.history.concat([action.payload, `${countCorrectCharacters(state.winnerWord, action.payload)}/${state.winnerWord.length} correct.`, "Incorrect attempt!"]),
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
    dispatch({ type: "check-winner", payload: word });
  };

  return (
    <div className="container mx-auto">
      <div>
        <p>ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL</p>
        <p>ENTER PASSWORD NOW</p>
      </div>

      <div>
        <div className="flex space-x-3">
          <span>{attemptsLeft} ATTEMPT(S) LEFT:</span>
          {Array.from({ length: attemptsLeft }, (index) => (
            <span key={index}>▇</span>
          ))}
        </div>
      </div>

      <div className="mt-3">
        {/* The randomly generated sequences of characters and words. */}
        <div className="flex justify-between sm:space-x-12 sm:justify-start">
          <div className="flex flex-col">
            {sequences.map((sequence, index) => {
              if (index <= 16) {
                return <CharacterSequence key={index} sequence={sequence} checkWinner={checkWinner}></CharacterSequence>;
              }
            })}
          </div>
          <div className="flex flex-col">
            {sequences.map((sequence, index) => {
              if (index > 16) {
                return <CharacterSequence key={index} sequence={sequence} checkWinner={checkWinner}></CharacterSequence>;
              }
            })}
          </div>
          <div className="hidden mt-3 sm:flex sm:flex-col sm:justify-end">
            {history.map((entry, index) => (
              <History key={index} entry={entry}></History>
            ))}
          </div>
        </div>
        <div className="flex flex-col-reverse mt-3 sm:hidden">
          {history.map((entry, index) => (
            <History key={index} entry={entry}></History>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Game;
