// let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const input = require('fs').readFileSync(0, 'utf-8').trim();

const [A, B] = input.split(' ').map(Number);

const queue = [[], [A]];
let deps = 1;
let isEnd = false;

while (true) {
  const numbers = queue[deps];
  queue[deps + 1] = [];

  if (numbers.length === 0) {
    deps = -1;
    break;
  }

  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];

    if (number === B) {
      isEnd = true;
      break;
    }

    const value1 = number * 10 + 1;
    if (value1 <= B) queue[deps + 1].push(value1);

    const value2 = number * 2;
    if (value2 <= B) queue[deps + 1].push(value2);
  }

  if (isEnd) break;
  deps += 1;
}

console.log(deps);
