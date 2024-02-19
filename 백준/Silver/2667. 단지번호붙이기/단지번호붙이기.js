let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const N = Number(input[0]);
const map = input.slice(1).map((item) => item.split('').map(Number));

const answer = [];

const moving = [
  (x, y) => [x + 1, y],
  (x, y) => [x - 1, y],
  (x, y) => [x, y + 1],
  (x, y) => [x, y - 1],
];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    const value = map[i][j];

    if (value !== 1) continue;

    const queue = [[i, j]];
    map[i][j] = 2;

    let index = 0;
    while (index < queue.length) {
      moving.forEach((item) => {
        const [_x, _y] = queue[index];

        const [x, y] = item(_x, _y);
        if (x < N && x >= 0 && y < N && y >= 0 && map[x][y] === 1) {
          map[x][y] = 2;
          queue.push([x, y]);
        }
      });

      index += 1;
    }

    answer.push(queue.length);
  }
}

console.log([answer.length, ...answer.sort((a, b) => a - b)].join('\n'));
