let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const moving = [
  (x, y) => [x + 1, y],
  (x, y) => [x - 1, y],
  (x, y) => [x, y + 1],
  (x, y) => [x, y - 1],
  (x, y) => [x + 1, y + 1],
  (x, y) => [x + 1, y - 1],
  (x, y) => [x - 1, y + 1],
  (x, y) => [x - 1, y - 1],
];

const answers = [];

const solution = (w, h, maps) => {
  let answer = 0;

  for (let i = 0; i < w * h; i++) {
    const x = Math.floor(i / w);
    const y = i % w;
    const value = maps[x][y];

    if (value !== 1) continue;

    answer += 1;

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

          if (x < 0 || x >= h) return;
          if (y < 0 || y >= w) return;
          if (maps[x][y] !== 1) return;

          maps[x][y] = 2;
          queue[deps + 1].push([x, y]);
        });
      }

      deps += 1;
    }
  }

  answers.push(answer);
};

for (let i = 0; i < input.length; i++) {
  const [w, h] = input[i].split(' ').map(Number);

  if (h === 0) break;
  const maps = input
    .slice(i + 1, i + 1 + h)
    .map((item) => item.split(' ').map(Number));

  solution(w, h, maps);

  i += h;
}

console.log(answers.join('\n'));
