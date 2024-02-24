let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const [M, N, K] = input[0].split(' ').map(Number);
const positions = input.slice(1).map((item) => item.split(' ').map(Number));

const moving = [
  (x, y) => [x, y + 1],
  (x, y) => [x, y - 1],
  (x, y) => [x + 1, y],
  (x, y) => [x - 1, y],
];

let maps = [];

for (let i = 0; i < M; i++) {
  maps[i] = [];
  for (let j = 0; j < N; j++) {
    maps[i][j] = 0;
  }
}

positions.forEach((item) => {
  const [y, x, _y, _x] = item;

  for (let i = x; i < _x; i++) {
    for (let j = y; j < _y; j++) {
      maps[i][j] = 1;
    }
  }
});

let count = 0;
let lengths = [];

for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (maps[i][j] === 1) continue;

    maps[i][j] = 1;
    count += 1;

    const queue = [[[i, j]]];
    let deps = 0;

    while (true) {
      const positions = queue[deps];

      if (positions.length === 0) break;

      queue[deps + 1] = [];

      for (let i = 0; i < positions.length; i++) {
        const [_x, _y] = positions[i];

        moving.forEach((fn) => {
          const [x, y] = fn(_x, _y);

          if (x < 0 || x >= M) return;
          if (y < 0 || y >= N) return;

          const value = maps[x][y];

          if (value === 1) return;

          maps[x][y] = 1;
          queue[deps + 1].push([x, y]);
        });
      }

      deps += 1;
    }

    lengths.push(queue.flat().length);
  }
}

console.log(count);
console.log(lengths.sort((a, b) => a - b).join(' '));
