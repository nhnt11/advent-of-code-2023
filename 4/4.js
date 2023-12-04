const fs = require('fs').promises;

(async () => {
  const data = await fs.readFile('./input.txt', 'utf8');
  const lines = data.split('\n');
  let sum = 0;
  for (const line of lines) {
    const data = line.split(':')[1];
    const [winners, actuals] = data.split("|").map(s => s.trim().split(/\s+/));
    const map = {};
    let matches = 0;
    actuals.forEach(a => {
      map[a] = true;
    });
    winners.forEach(w => {
      if (map[w]) {
        matches++;
      }
    });
    if (matches) {
      sum += Math.pow(2, matches - 1);
    }
  }
  console.log(sum)
})();