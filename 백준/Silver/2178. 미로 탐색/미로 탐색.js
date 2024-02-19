let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const [N, M] = input[0].split(' ');
const map = input.slice(1).map((item) => item.split(''));
map[0][0] = '2';

const queue = [[], [[0, 0]]];
let deps = 1;

while (true) {
  let isEnd = false;
    
  if (!queue[deps + 1]) queue[deps + 1] = [];

  for (let i = 0; i < queue[deps].length; i++) {
    const [x, y] = queue[deps][i];

    if (x === N - 1 && y === M - 1) {
      isEnd = true;
      break;
    }

    if (x + 1 < N && map[x + 1][y] === '1') {
      map[x + 1][y] = '2';
      queue[deps + 1].push([x + 1, y]);
    }
    if (x - 1 >= 0 && map[x - 1][y] === '1') {
      map[x - 1][y] = '2';
      queue[deps + 1].push([x - 1, y]);
    }
    if (y + 1 < M && map[x][y + 1] === '1') {
      map[x][y + 1] = '2';
      queue[deps + 1].push([x, y + 1]);
    }
    if (y - 1 >= 0 && map[x][y - 1] === '1') {
      map[x][y - 1] = '2';
      queue[deps + 1].push([x, y - 1]);
    }
  }

  if (isEnd) break;
  deps += 1;
}

console.log(deps);
