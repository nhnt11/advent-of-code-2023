const fs = require('fs').promises;

(async () => {
  const data = await fs.readFile('./input.txt', 'utf8');
  const lines = data.split('\n');
  let sum = 0;
  for (const line of lines) {
    const first = line.match(/[^\d]*(\d).*/)[1];
    const last = line.match(/.*(\d)[^\d]*/)[1];
    sum += 10 * parseInt(first) + parseInt(last);
  }
  console.log(sum)
})();