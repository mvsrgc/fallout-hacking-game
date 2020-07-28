import React from "react";

function Character({ character, checkWinner }) {
  function handleClick(character) {
    if (character.length > 1) {
      // sound
      checkWinner(character);
    } else {
      // sound
    }
  }

  return (
    <span onClick={() => handleClick(character)} className="character">
      {character}
    </span>
  );
}

export default Character;
