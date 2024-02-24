// let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const input = require('fs').readFileSync(0, 'utf-8').trim();

const [N, K] = input.split(' ').map(Number);

// [위치, 시간]
const queue = [[[N, 0]]];
let visited = {};

let deps = 0;
let answer = 0;
let isEnd = false;

while (true) {
  const values = queue[deps];
  queue[deps + 1] = [];

  for (let i = 0; i < values.length; i++) {
    const [pos, time] = values[i];

    if (pos === K) {
      answer = time;
      isEnd = true;
      break;
    }

    if (!visited[pos * 2] && pos * 2 <= 100000) {
      visited[pos * 2] = true;
      queue[deps + 1].push([pos * 2, time]);
    }

    if (!visited[pos - 1] && pos - 1 >= 0) {
      visited[pos - 1] = true;
      queue[deps + 1].push([pos - 1, time + 1]);
    }

    if (!visited[pos + 1]) {
      visited[pos + 1] = true;

      queue[deps + 1].push([pos + 1, time + 1]);
    }
  }

  if (isEnd) break;
  deps += 1;
}

console.log(answer);
