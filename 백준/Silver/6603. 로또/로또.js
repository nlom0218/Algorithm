// let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const input = require('fs').readFileSync(0, 'utf-8').trim();

const cases = input
  .slice(0, input.length - 1)
  .split('\n')
  .map((item) => item.split(' ').map(Number));

const solution = (k, s) => {
  const answer = [];

  const recursion = (array, index) => {
    if (index > k) return;

    if (array.length === 6) {
      answer.push(array);
      return;
    }

    recursion([...array, s[index]], index + 1);
    recursion(array, index + 1);
  };

  recursion([], 0);

  console.log(answer.map((item) => item.join(' ')).join('\n') + '\n');
};

for (let i = 0; i < cases.length; i++) {
  const k = cases[i][0];
  const s = cases[i].slice(1);

  if (k !== 0) {
    solution(k, s);
  }
}
