const fs = require('fs').promises;

(async () => {
  const data = await fs.readFile('./input.txt', 'utf8');
  const lines = data.split('\n');
  let sum = 0;
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];
    for (let i = 0; i < line.length; i++) {
      if (isNaN(parseInt(line[i]))) continue;

      // ok we're at the first digit of a number, lets find the index of the last dig
      let j = i;
      while (!isNaN(parseInt(line[j]))) j++;

      const number = parseInt(line.substring(i, j));

      // check if there's a symbol to the left
      if (i > 0 && line[i - 1] !== '.' && isNaN(parseInt(line[i - 1]))) {
        sum += number;
      }
      // check if there's a symbol to the right
      else if (j < line.length && line[j] !== '.' && isNaN(parseInt(line[j]))) {
        sum += number;
      }
      // check if there's a symbol above or below (including diagonally adjacent)
      else {
        // k goes from i - 1 to j inclusive -- these are the indices to check above and below
        for (let k = Math.max(i - 1, 0); k <= Math.min(j, line.length - 1); k++) {
          if (lineIndex > 0 && lines[lineIndex - 1][k] !== '.' && isNaN(parseInt(lines[lineIndex - 1][k]))) {
            sum += number;
            break;
          }
          else if (lineIndex + 1 < lines.length && lines[lineIndex + 1][k] !== '.' && isNaN(parseInt(lines[lineIndex + 1][k]))) {
            sum += number;
            break;
          }
        }
      }

      // keep scanning from j. i will get incremented after this which is ok.
      // we know that line[j] is not a digit.
      i = j;
    }
  }
  console.log(sum)
})();