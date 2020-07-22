import React from "react";

function Character({ character }) {
  return (
    <span onClick={() => {console.log(character)}} className="character">
      {character}
    </span>
  );
}

export default Character;
