let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const [N, M] = input[0].split(' ').map(Number);
const map = input.slice(1).map((item) => item.split(' ').map(Number));

const moving = [
  (x, y) => [x + 1, y],
  (x, y) => [x - 1, y],
  (x, y) => [x, y + 1],
  (x, y) => [x, y - 1],
];

const queue = [[], []];
let count = 0;
let total = 0;

for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    const value = map[i][j];
    if (value !== -1) total += 1;

    if (value === 1) {
      count += 1;
      queue[1].push([i, j]);
    }
  }
}

let deps = 1;

while (true) {
  if (queue[deps].length === 0) {
    queue.pop();
    break;
  }

  queue[deps + 1] = [];

  for (let i = 0; i < queue[deps].length; i++) {
    const [_x, _y] = queue[deps][i];

    moving.forEach((item) => {
      const [x, y] = item(_x, _y);

      if (x < M && x >= 0 && y < N && y >= 0 && map[x][y] === 0) {
        map[x][y] = 1;
        queue[deps + 1].push([x, y]);
        count += 1;
      }
    });
  }

  deps += 1;
}

console.log(count === total ? queue.length - 2 : -1);
