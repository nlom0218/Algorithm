let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const [N, M] = input[0].split(' ').map(Number);
const map = input.slice(1).map((item) => item.split(' ').map(Number));

const house = [];
const old = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    const value = map[i][j];

    if (value === 1) house.push([i, j]);
    if (value === 2) old.push([i, j]);
  }
}

const chicken = [];

const 재귀 = (array, index) => {
  if (index > old.length) return;

  if (array.length === M) {
    chicken.push(array);
  }

  재귀([...array, old[index]], index + 1);
  재귀(array, index + 1);
};

재귀([], 0);

let answer = Infinity;

for (let k = 0; k < chicken.length; k++) {
  const chickenPositions = chicken[k];

  let totalDistance = 0;

  for (let i = 0; i < house.length; i++) {
    let distance = Infinity;

    const [_x, _y] = house[i]; // 집 위치

    for (let j = 0; j < chickenPositions.length; j++) {
      const [x, y] = chickenPositions[j]; // 치킨 위치

      const temp = Math.abs(_x - x) + Math.abs(_y - y);

      distance = Math.min(distance, temp);
    }

    totalDistance += distance;

    if (totalDistance > answer) break;
  }

  answer = Math.min(answer, totalDistance);
}

console.log(answer);
