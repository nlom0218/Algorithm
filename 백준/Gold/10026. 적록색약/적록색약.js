let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const N = Number(input[0]);
let map = input.slice(1).map((item) => item.split(''));

const moving = [
  (x, y) => [x + 1, y],
  (x, y) => [x - 1, y],
  (x, y) => [x, y + 1],
  (x, y) => [x, y - 1],
];

let answer1 = 0;
let answer2 = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    const value = map[i][j];

    if (value === 0) continue;

    const queue = [[i, j]];

    let index = 0;
    while (index < queue.length) {
      const [_x, _y] = queue[index];

      moving.forEach((item) => {
        const [x, y] = item(_x, _y);

        if (x < N && x >= 0 && y < N && y >= 0 && map[x][y] === value) {
          map[x][y] = 0;
          queue.push([x, y]);
        }
      });

      index += 1;
    }

    answer1 += 1;
  }
}

map = input.slice(1).map((item) => item.split(''));

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    const value = map[i][j];

    if (value === 0) continue;

    const queue = [[i, j]];

    let index = 0;
    while (index < queue.length) {
      const [_x, _y] = queue[index];

      moving.forEach((item) => {
        const [x, y] = item(_x, _y);

        if (x < N && x >= 0 && y < N && y >= 0) {
          if (value === 'R') {
            if (map[x][y] === value || map[x][y] === 'G') {
              map[x][y] = 0;
              queue.push([x, y]);
            }
          }
          if (value === 'G') {
            if (map[x][y] === value || map[x][y] === 'R') {
              map[x][y] = 0;
              queue.push([x, y]);
            }
          }

          if (value === 'B') {
            if (map[x][y] === value) {
              map[x][y] = 0;
              queue.push([x, y]);
            }
          }
        }
      });

      index += 1;
    }

    answer2 += 1;
  }
}

console.log(answer1, answer2);
