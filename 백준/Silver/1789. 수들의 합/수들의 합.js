// let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const input = require('fs').readFileSync(0, 'utf-8').trim();

let count = 0;
let sum = 0;
let i = 1;

while (input >= sum) {
  sum += i;
  i += 1;
  count += 1;
}

console.log(count - 1);
