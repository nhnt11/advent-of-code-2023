const fs = require('fs').promises;

(async () => {
  // console.time('foo');
  const data = await fs.readFile('./input.txt', 'utf8');
  const lines = data.split('\n');
  const cardMatches = [];
  for (const line of lines) {
    const [_, data] = line.split(':');
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
    cardMatches.push(matches);
  }

  // cache results to speed up recursion
  // without this it takes ~60ms and with it it takes ~2.5ms on my M1 macbook lol
  const cache = {};
  function getAddedCardsForCard(cardId) {
    if (cache[cardId]) {
      return cache[cardId];
    }
    let addedCards = 1; // the card itself
    for (let i = 1; i <= cardMatches[cardId] && cardId + i < cardMatches.length; i++) {
      addedCards += getAddedCardsForCard(cardId + i);
    }
    cache[cardId] = addedCards;
    return addedCards;
  }
  let sum = 0;
  for (i = 0; i < cardMatches.length; i++) {
    sum += getAddedCardsForCard(i);
  }
  console.log(sum)
  // console.timeEnd('foo');
})();