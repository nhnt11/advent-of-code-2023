const fs = require('fs').promises;

// Thanks ChatGPT!
function replaceDigitWords(inputString) {
  const digitWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  // Create a regular expression pattern for matching digit words
  const pattern = new RegExp(digitWords.join('|'), 'g');

  // Replace digit words with corresponding digits
  const resultString = inputString.replace(pattern, (match) => {
    const digit = digitWords.indexOf(match.toLowerCase()) + 1;
    const replacement = (digit > 0) ? digit.toString() : match;
    return replacement;
  });

  return resultString;
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

function replaceDigitWordsReversed(inputString) {
  const digitWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].map(reverseString);

  // Create a regular expression pattern for matching digit words
  const pattern = new RegExp(digitWords.join('|'), 'g');

  // Replace digit words with corresponding digits
  const resultString = reverseString(inputString).replace(pattern, (match) => {
    const digit = digitWords.indexOf(match.toLowerCase()) + 1;
    const replacement = (digit > 0) ? digit.toString() : match;
    return replacement;
  });

  return reverseString(resultString);
}


(async () => {
  const data = await fs.readFile('./input.txt', 'utf8');
  const lines = data.split('\n').map(line => line.trim().toLowerCase());
  let sum = 0;
  for (let line of lines) {
    const first = replaceDigitWords(line).match(/[^\d]*(\d).*/)[1];
    const last = replaceDigitWordsReversed(line).match(/.*(\d)[^\d]*/)[1];
    const toAdd = 10 * parseInt(first) + parseInt(last);
    sum += toAdd;
  }
  console.log(sum)
})();