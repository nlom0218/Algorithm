// let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const input = require('fs').readFileSync(0, 'utf-8').trim();

let count = 0;
let answer = '';

for (let i = 0; i < input.length; i++) {
  const char = input[i];
  if (char === '.') {
    if (count === 4) answer += 'AAAA';
    else if (count === 2) answer += 'BB';
    else if (count !== 0) {
      answer = -1;
      break;
    }

    count = 0;
    answer += '.';
    continue;
  }

  count += 1;

  if (count === 4) {
    answer += 'AAAA';
    count = 0;
  }
}

if (count === 2) answer += 'BB';
else if (count !== 0) answer = -1;

console.log(answer);
