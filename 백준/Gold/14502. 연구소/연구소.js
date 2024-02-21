let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const moving = [
  (x, y) => [x + 1, y],
  (x, y) => [x - 1, y],
  (x, y) => [x, y + 1],
  (x, y) => [x, y - 1],
];

const [N, M] = input[0].split(' ').map(Number);
const maps = input.slice(1).map((item) => item.split(' ').map(Number));

const value0 = []; // 빈공간
const value2 = []; // 초기 바이러스 위치

for (let x = 0; x < N; x++) {
  for (let y = 0; y < M; y++) {
    const value = maps[x][y];

    if (value === 0) value0.push([x, y]);
    if (value === 2) value2.push([x, y]);
  }
}

const combination = [];

const recursion = (array, index) => {
  if (array.filter(Boolean).length === 3) {
    combination.push(array);
    return;
  }

  if (index + 1 > value0.length) return;

  recursion(array, index + 1);
  recursion([...array, value0[index]], index + 1);
};

recursion([], -1);

let answer = 0;

for (let i = 0; i < combination.length; i++) {
  const newMaps = JSON.parse(JSON.stringify(maps));

  combination[i].forEach((item) => {
    if (!item) return;
    const [x, y] = item;
    newMaps[x][y] = 1;
  });

  const queue = [value2];
  let deps = 0;

  while (true) {
    const values = queue[deps];

    if (values.length === 0) break;

    queue[deps + 1] = [];

    for (let j = 0; j < values.length; j++) {
      const [_x, _y] = values[j];

      moving.forEach((fn) => {
        const [x, y] = fn(_x, _y);

        if (x < 0 || x >= N) return;
        if (y < 0 || y >= M) return;

        if (newMaps[x][y] === 0) {
          newMaps[x][y] = 2;
          queue[deps + 1].push([x, y]);
        }
      });
    }

    deps += 1;
  }

  const safe = newMaps.flat().filter((item) => item === 0).length;

  answer = Math.max(answer, safe);
}

console.log(answer);
