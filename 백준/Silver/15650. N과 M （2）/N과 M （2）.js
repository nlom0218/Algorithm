// let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const input = require('fs').readFileSync(0, 'utf-8').trim();

const [N, M] = input.split(' ').map(Number);
const numbers = Array.from({ length: N }).map((_, index) => index + 1);

const answer = [];

const recursion = (array, index) => {
  if (index > numbers.length) return;

  if (array.length === M) {
    answer.push(array);
    return;
  }

  recursion([...array, numbers[index]], index + 1);
  recursion(array, index + 1);
};

recursion([], 0);

console.log(answer.map((item) => item.join(' ')).join('\n'));
