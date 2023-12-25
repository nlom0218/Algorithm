// let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const input = require('fs').readFileSync(0, 'utf-8').trim();

let zero = 0;
let one = 0;
let prev;

for (let i = 0; i < input.length; i++) {
  if (!prev) {
    if (input[i] === '0') {
      zero += 1;
      prev = '0';
    }
    if (input[i] === '1') {
      one += 1;
      prev = '1';
    }
  }

  if (prev !== input[i] && input[i] === '0') {
    zero += 1;
    prev = '0';
  }
  if (prev !== input[i] && input[i] === '1') {
    one += 1;
    prev = '1';
  }
}

console.log(Math.min(zero, one));
