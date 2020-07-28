/**
 * Generate a random integer between 0 inclusive and max exclusive
 * @param {number} max maximum random value range, exclusive
 */
export const random = (max) => Math.floor(Math.random() * max);

/**
 * Generates a string from filler characters. Ex: "*.!++}/.,.#^"
 * @param {string} characters the characters to randomly choose from
 * @param {number} length the length of the filler string
 */
export function generateFiller(characters, length) {
  let filler = "";

  for (let i = 0; i < length; i++) {
    filler += characters.charAt(random(characters.length));
  }

  return filler;
}

/**
 * Each row is preceded by 0x${HEXCODE}.
 * @param {number} hexStart the decimal number to use as a starting point.
 * @param {number} i number of times to multiply increment by.
 * @param {number} increment the increment to use when adding to hexStart.
 */
export function generateHex(hexStart, i, increment) {
  // Each row has a HEX identifier which starts at 61623 (decimal) and increases by 12 every row.
  // Ex: 0xF0B7, 0xF0C3, etc.
  return `0x${(hexStart + increment * i).toString(16).toLocaleUpperCase()}`;
}

/**
 * Generates an array of sequences in the Fallout terminal format.
 * Ex: 0xEF8B %^ABILITY/.}
 * @param {number} amount how many sequences to put in the array.
 * @param {string} characters the characters to randomly choose from
 */
export function generateSequences(amount, characters) {
  const sequences = [];

  for (let i = 0; i < amount; i++) {
    let sequence = `${generateHex(61323, i, 12)} ${generateFiller(characters, 12)}`;
    sequences.push(sequence);
  }

  return sequences;
}

/**
 * Randomly adds words from a word list to an array of sequences.
 * @param {string[]} sequences the array of sequences to add words to.
 * @param {string[]} words the word list to choose from.
 * @param {number} amount the amount of words to add in the sequences array.
 * @return {string[]} updated sequences array
 */
export function addWords(sequences, words, amount) {
  // Length of a HEX, including whitespace.
  const lengthOfHex = 7;

  // create shallow copy to not mutate passed argument
  const updatedSequences = [...sequences];
  const updatedWords = [...words];

  for (let i = 0; i < amount; i++) {
    // Choose a word in the word list and remove it after (prevent duplicates).
    const wordIndex = random(updatedWords.length);
    const word = updatedWords[wordIndex];
    updatedWords.splice(wordIndex, 1);

    // Choose a random number that will determine where the word starts in the sequence.
    // (12 - word.length) is the remaining spaces for filler characters.
    const wordStart = random(12 - word.length);

    // Choose a random sequence to add a word to. TODO: Prevent duplicates.
    const index = random(sequences.length);
    updatedSequences[index] = sequences[index].substring(0, wordStart + lengthOfHex) + word + sequences[index].substring(wordStart + word.length + lengthOfHex);
  }

  // return new sequences array
  return updatedSequences;
}