let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const [n, m] = input[0].split(' ').map(Number);
const maps = input.slice(1).map((item) => item.split(' ').map(Number));

const moving = [
  (x, y) => [x + 1, y],
  (x, y) => [x - 1, y],
  (x, y) => [x, y + 1],
  (x, y) => [x, y - 1],
];

const answer = [];

for (let x = 0; x < n; x++) {
  for (let y = 0; y < m; y++) {
    const value = maps[x][y];

    if (value === 0) continue;

    maps[x][y] = 0;
    const queue = [[[x, y]]];
    let deps = 0;

    while (true) {
      const positions = queue[deps];

      if (positions.length === 0) break;

      queue[deps + 1] = [];

      for (let i = 0; i < positions.length; i++) {
        const [_x, _y] = positions[i];

        moving.forEach((fn) => {
          const [x, y] = fn(_x, _y);

          if (x < 0 || x >= n) return;
          if (y < 0 || y >= m) return;

          const value = maps[x][y];

          if (value === 0) return;

          maps[x][y] = 0;
          queue[deps + 1].push([x, y]);
        });
      }

      deps += 1;
    }

    answer.push(queue.flat().length);
  }
}

console.log(answer.length);
console.log(answer.length === 0 ? 0 : Math.max(...answer));
