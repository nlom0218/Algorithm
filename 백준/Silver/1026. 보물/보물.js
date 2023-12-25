let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const A = input[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => b - a);
const B = input[2]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);

const S = A.reduce((acc, cur, index) => {
  return acc + cur * B[index];
}, 0);

console.log(S);
