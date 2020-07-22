import React from "react";

import CharacterSequence from "./CharacterSequence";

function Game() {
  let nbAttempsLeft = 3;

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
        <CharacterSequence sequence={["0xF0B7", "@\\.........%#"]}></CharacterSequence>
        <CharacterSequence sequence={["0xF123", "^.SATIN:-;|^"]}></CharacterSequence>
      </div>
    </div>
  );
}

export default Game;
