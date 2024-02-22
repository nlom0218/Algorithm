let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const moving = [
  (x, y) => [x + 1, y + 2],
  (x, y) => [x + 2, y + 1],
  (x, y) => [x + 2, y - 1],
  (x, y) => [x + 1, y - 2],
  (x, y) => [x - 1, y - 2],
  (x, y) => [x - 2, y - 1],
  (x, y) => [x - 2, y + 1],
  (x, y) => [x - 1, y + 2],
];

const answers = [];

const solution = (l, start, end) => {
  const maps = Array.from({ length: l }, () =>
    Array.from({ length: l }).fill(false)
  );

  maps[start[0]][start[1]] = true;

  const queue = [[start]];
  let deps = 0;

  while (true) {
    let isEnd = false;
    const positions = queue[deps];

    if (positions.length === 0) break;

    queue[deps + 1] = [];

    for (let i = 0; i < positions.length; i++) {
      const [_x, _y] = positions[i];

      if (_x === end[0] && _y === end[1]) isEnd = true;

      moving.forEach((fn) => {
        const [x, y] = fn(_x, _y);

        if (x < 0 || x >= l) return;
        if (y < 0 || y >= l) return;
        if (maps[x][y]) return;

        maps[x][y] = true;
        queue[deps + 1].push([x, y]);
      });
    }

    if (isEnd) break;
    deps += 1;
  }

  answers.push(deps);
};

for (let i = 1; i < input.length; i += 3) {
  const l = Number(input[i]);
  const start = input[i + 1].split(' ').map(Number);
  const end = input[i + 2].split(' ').map(Number);

  solution(l, start, end);
}

console.log(answers.join('\n'));
