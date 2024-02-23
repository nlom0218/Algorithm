let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const N = Number(input[0]);
const maps = input.slice(1).map((item) => item.split(' ').map(Number));

const graph = {};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (i === j || maps[i][j] === 0) continue;
    graph[i] = [...(graph[i] || []), j];
  }
}

const answer = [];

for (let i = 0; i < N; i++) {
  answer[i] = [];
  for (let j = 0; j < N; j++) {
    const queue = [[i]];
    const visited = [];

    let isEnd = false;
    let deps = 0;

    while (true) {
      const values = queue[deps];
      if (values.length === 0) break;
      queue[deps + 1] = [];

      for (let v = 0; v < values.length; v++) {
        const value = values[v];

        if (deps !== 0 && value === j) {
          isEnd = true;
          break;
        }

        if (graph[value] && !visited[value]) {
          visited[value] = true;
          queue[deps + 1] = [...queue[deps + 1], ...graph[value]];
        }
      }

      deps += 1;
    }

    answer[i][j] = isEnd ? 1 : 0;
  }
}

console.log(answer.map((item) => item.join(' ')).join('\n'));
