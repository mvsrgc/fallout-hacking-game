import React from "react";

import Character from "./Character";

function CharacterSequence({ sequence }) {
  // Ex: ["0xF123", "^.SATIN:-;|^"]
  const split = sequence[1].split(/([A-Z]+)/);

  const output = split.map(w => {
    // If w has a letter in [A-Z] then it is a word, we pass it to Character componenent.
    if ([...w][0].charAt(0).match(/[A-Z]/)) {
      return <Character character={w}></Character>;
    }
    // w is not a word, each of it's letters gets it's own Character component.
    return [...w].map(c => <Character character={c}></Character>);
})

  return (
    <p>
      {sequence[0]} {output}
    </p>
  );
}

export default CharacterSequence;
