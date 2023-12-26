// let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const input = require('fs').readFileSync(0, 'utf-8').trim();
const number = Number(input);

if (number === 0) {
  console.log([0, 0].join('\n'));
  return;
}

if (number === 1) {
  console.log([1, 1].join('\n'));
  return;
}

if (number === -1) {
  console.log([1, 1].join('\n'));
  return;
}

let prev = 1n;
let cur = 1n;

for (let i = 2; i < Math.abs(number); i++) {
  const _cur = cur;

  cur = (cur % 1000000000n) + (prev % 1000000000n);
  prev = _cur;
}

const firstNumber =
  number === 0 ? 0 : number < 0 ? (number % 2 === 0 ? -1 : 1) : 1;

const answer = [firstNumber, (cur % 1000000000n).toString()].join('\n');

console.log(answer);
