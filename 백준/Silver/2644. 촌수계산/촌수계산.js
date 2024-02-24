let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const [start, end] = input[1].split(' ').map(Number);
const maps = input.slice(3).map((item) => item.split(' ').map(Number));

const graph = {};

for (let i = 0; i < maps.length; i++) {
  const [x, y] = maps[i];

  graph[x] = [...(graph[x] || []), y];
  graph[y] = [...(graph[y] || []), x];
}

const queue = [[start]];
let deps = 0;
let isEnd = false;
const visited = [];
visited[start] = true;

while (true) {
  const values = queue[deps];

  if (values.length === 0) {
    deps = -1;
    break;
  }

  queue[deps + 1] = [];

  for (let i = 0; i < values.length; i++) {
    const value = values[i];

    if (value === end) {
      isEnd = true;
      break;
    }

    for (let j = 0; j < graph[value].length; j++) {
      if (!visited[graph[value][j]]) {
        visited[graph[value][j]] = true;
        queue[deps + 1].push(graph[value][j]);
      }
    }
  }

  if (isEnd) {
    break;
  }
  deps += 1;
}

console.log(deps);
