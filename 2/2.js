const fs = require('fs').promises;

(async () => {
  const data = await fs.readFile('./input.txt', 'utf8');
  const lines = data.split('\n');
  let sum = 0;
  linesLoop: for (const line of lines) {
    const gameId = line.split(':')[0].split(' ')[1];
    const subsets = line.split(':')[1].split(';').map(s => s.trim());
    // each subset is like '3 blue, 4 red, 5 green'
    for (const subset of subsets) {
      const colorCounts = subset.split(',').map(s => s.trim());
      for (const colorCount of colorCounts) {
        const [count, color] = colorCount.split(' ');
        if ((color === "red" && count > 12) || (color === "green" && count > 13) || (color === "blue" && count > 14)) {
          // impossible
          continue linesLoop;
        }
      }
    }
    sum += parseInt(gameId);
  }
  console.log(sum)
})();