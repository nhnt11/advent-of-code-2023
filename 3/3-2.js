const fs = require('fs').promises;

const getNumberLookingToTheLeft = (line, i) => {
  let number = "";
  for (let j = i; j >= 0; j--) {
    if (isNaN(parseInt(line[j]))) {
      break;
    }
    number += line[j];
  }
  return number.split('').reverse().join('');
}

const getNumberLookingToTheRight = (line, i) => {
  let number = "";
  for (let j = i; j < line.length; j++) {
    if (isNaN(parseInt(line[j]))) {
      break;
    }
    number += line[j];
  }
  return number;
}

const findAdjacentNumbers = (line, i) => {
  const ret = [];

  if (isNaN(parseInt(line[i]))) {
    if (i > 0 && !isNaN(parseInt(line[i - 1]))) {
      ret.push(getNumberLookingToTheLeft(line, i - 1));
    }
    if (i + 1 < line.length && !isNaN(parseInt(line[i + 1]))) {
      ret.push(getNumberLookingToTheRight(line, i + 1));
    }
    return ret;
  }

  const left = getNumberLookingToTheLeft(line, i);
  const right = getNumberLookingToTheRight(line, i);
  ret.push(left.concat(right.slice(1)));
  return ret;
}

(async () => {
  const data = await fs.readFile('./input.txt', 'utf8');
  const lines = data.split('\n');
  let sum = 0;
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];
    for (let i = 0; i < line.length; i++) {
      if (line[i] !== '*') continue;

      const adjacents = [];
      if (i > 0 && !isNaN(parseInt(line[i - 1]))) {
        adjacents.push(getNumberLookingToTheLeft(line, i - 1));
      }
      if (i + 1 < line.length && !isNaN(parseInt(line[i + 1]))) {
        adjacents.push(getNumberLookingToTheRight(line, i + 1));
      }
      if (lineIndex > 0) {
        adjacents.push(...findAdjacentNumbers(lines[lineIndex - 1], i));
      }
      if (lineIndex + 1 < lines.length) {
        adjacents.push(...findAdjacentNumbers(lines[lineIndex + 1], i));
      }

      if (adjacents.length === 2) {
        sum += parseInt(adjacents[0]) * parseInt(adjacents[1]);
      }
    }
  }
  console.log(sum)
})();