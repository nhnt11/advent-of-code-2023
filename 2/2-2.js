const fs = require('fs').promises;

(async () => {
  const data = await fs.readFile('./input.txt', 'utf8');
  const lines = data.split('\n');
  let sum = 0;
  for (const line of lines) {
    const subsets = line.split(':')[1].split(';').map(s => s.trim());
    const minCubes = {
      red: 1,
      green: 1,
      blue: 1,
    };
    // each subset is like '3 blue, 4 red, 5 green'
    for (const subset of subsets) {
      const colorCounts = subset.split(',').map(s => s.trim());
      for (const colorCount of colorCounts) {
        const [count, color] = colorCount.split(' ');
        if (minCubes[color] < parseInt(count)) {
          minCubes[color] = parseInt(count);
        }
      }
    }
    sum += minCubes.red * minCubes.green * minCubes.blue;
  }
  console.log(sum)
})();