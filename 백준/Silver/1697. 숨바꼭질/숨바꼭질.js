// let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const input = require('fs').readFileSync(0, 'utf-8').trim();
const [N, K] = input.split(' ').map(Number);

const queue = [[N]];
const visited = [];
visited[N] = true;

let deps = 0;
while (true) {
  let isEnd = false;

  queue[deps + 1] = [];

  for (let i = 0; i < queue[deps].length; i++) {
    const value = queue[deps][i];

    if (value === K) {
      isEnd = true;
      break;
    }

    if (!visited[value - 1] && value - 1 >= 0 && value - 1 <= 100000) {
      visited[value - 1] = true;
      queue[deps + 1].push(value - 1);
    }
    if (!visited[value + 1] && value + 1 >= 0 && value + 1 <= 100000) {
      visited[value + 1] = true;
      queue[deps + 1].push(value + 1);
    }
    if (!visited[value * 2] && value * 2 >= 0 && value * 2 <= 100000) {
      visited[value * 2] = true;
      queue[deps + 1].push(value * 2);
    }
  }

  if (isEnd) break;
  deps += 1;
}

console.log(deps);
