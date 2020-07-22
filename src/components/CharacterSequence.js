import React from "react";

import Character from "./Character";

function CharacterSequence({ sequence }) {
  // Ex: "0xEF8B ^%PRESSURE!%"
  let split = sequence.split(" ");

  // "0xEF8B"
  const hex = split[0];

  // ["^%", "PRESSURE", "!%"]
  const characters = split[1].split(/([A-Z]+)/)

  const output = characters.map(w => {
    // If w has a letter in [A-Z] then it the word in the sequence, we pass it to Character componenent.
    if ([...w][0] && [...w][0].charAt(0).match(/[A-Z]/)) {
      return <Character character={w}></Character>;
    }

    // w is not a word, each of it's letters gets it's own Character component.
    return [...w].map(c => <Character character={c}></Character>);
})

  return (
    <p>
      {hex} {output}
    </p>
  );
}

export default CharacterSequence;
