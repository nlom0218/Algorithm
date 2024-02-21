let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const moving = [
  (z, x, y) => [z + 1, x, y],
  (z, x, y) => [z - 1, x, y],
  (z, x, y) => [z, x + 1, y],
  (z, x, y) => [z, x - 1, y],
  (z, x, y) => [z, x, y + 1],
  (z, x, y) => [z, x, y - 1],
];

// 가로(y), 세로(x), 높이
const [M, N, H] = input[0].split(' ').map(Number);

const inputs = input.slice(1).map((item) => item.split(' ').map(Number));
const maps = [];
for (let i = 0; i < inputs.length; i += N) {
  maps.push(inputs.slice(i, i + N));
}

const queue = [[]];
let deps = 0;
let total = 0;

for (let z = 0; z < H; z++) {
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < M; y++) {
      const value = maps[z][x][y];

      if (value === 0) total += 1;
      if (value === 1) queue[deps].push([z, x, y]);
    }
  }
}

while (true) {
  const positions = queue[deps];

  if (positions.length === 0) break;

  queue[deps + 1] = [];

  for (let i = 0; i < positions.length; i++) {
    const [_z, _y, _x] = positions[i];

    moving.forEach((fn) => {
      const [z, x, y] = fn(_z, _y, _x);

      if (z < 0 || z >= H) return;
      if (x < 0 || x >= N) return;
      if (y < 0 || y >= M) return;

      const value = maps[z][x][y];

      if (value !== 0) return;

      maps[z][x][y] = 1;
      queue[deps + 1].push([z, x, y]);
    });
  }

  deps += 1;
}

const _total = queue.slice(1).reduce((acc, cur) => acc + cur.length, 0);

if (total === 0) console.log(0);
else {
  console.log(total === _total ? deps - 1 : -1);
}
