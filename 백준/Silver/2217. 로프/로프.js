let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const N = Number(input[0]);
const rope = input.slice(1).map(Number);
rope.sort((a, b) => a - b);

let answer = 0;

for (let i = 0; i < N; i++) {
  answer = Math.max(answer, rope[i] * (N - i));
}

console.log(answer);
