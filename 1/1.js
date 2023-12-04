const fs = require('fs').promises;

(async () => {
  const data = await fs.readFile('./input.txt', 'utf8');
  const lines = data.split('\n');
  let sum = 0;
  for (const line of lines) {
    const first = line.match(/[^\d]*(\d).*/)[1];
    const last = line.match(/.*(\d)[^\d]*/)[1];
    sum += parseInt(first.concat(last));
  }
  console.log(sum)
})();