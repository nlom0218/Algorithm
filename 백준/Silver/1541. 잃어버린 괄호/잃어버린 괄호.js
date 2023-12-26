// let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const input = require('fs').readFileSync(0, 'utf-8').trim();

console.log(
  input
    .split('-')
    .map((item) => item.split('+').map(Number))
    .map((item) => item.reduce((acc, cur) => acc + cur, 0))
    .reduce((acc, cur, index) => {
      if (index === 0) return acc + cur;
      else return acc - cur;
    }, 0)
);
