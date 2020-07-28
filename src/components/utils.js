/**
 * Generate a random integer between 0 inclusive and max exclusive
 * @param {number} max maximum random value range, exclusive
 */
export const random = (max) => Math.floor(Math.random() * max);

/**
 * Shuffle an array using the Fisher-Yates algorithm.
 * @param {Array} array the array to shuffle.
 */
export const shuffle = (array) => {
  const copiedArray = [...array];

  var currentIndex = copiedArray.length,
    temporaryValue,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = copiedArray[currentIndex];
    copiedArray[currentIndex] = copiedArray[randomIndex];
    copiedArray[randomIndex] = temporaryValue;
  }

  return copiedArray;
};

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

  // Create shallow copy to not mutate passed argument.
  const copiedSequences = [...sequences];
  const copiedWords = [...words];

  // Create shallow copy to not mutate passed argument.
  // Array containing the indexes of the sequences array in random order.
  const sequencesArrayIndexes = shuffle([...sequences.keys()]);

  for (let i = 0; i < amount; i++) {
    // Pick a word from copiedWords and remove it, preventing duplicates.
    const wordIndex = random(copiedWords.length);
    const word = copiedWords[wordIndex];
    copiedWords.splice(wordIndex, 1);

    // Pick a random spot in the 12-character sequence to place the word.
    // Filler will be put around it.
    const wordStart = random(12 - word.length);

    // Put filler around the word.
    const sequenceIndex = sequencesArrayIndexes[i];
    const fillerOne = copiedSequences[sequenceIndex].substring(0, wordStart + lengthOfHex);
    const fillerTwo = copiedSequences[sequenceIndex].substring(wordStart + word.length + lengthOfHex);
    copiedSequences[sequenceIndex] = fillerOne + word + fillerTwo;
  }

  // return new sequences array
  return copiedSequences;
}
