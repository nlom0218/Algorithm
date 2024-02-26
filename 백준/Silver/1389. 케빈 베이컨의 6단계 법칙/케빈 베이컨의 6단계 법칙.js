let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const [N, M] = input[0].split(' ').map(Number);
const relation = input.slice(1).map((item) => item.split(' ').map(Number));

const graph = {};

for (let i = 0; i < M; i++) {
  const [a, b] = relation[i];

  graph[a] = [...(graph[a] || []), b];
  graph[b] = [...(graph[b] || []), a];
}

let answer = [Infinity, 0];

const solution = (start) => {
  const queue = [[start]];
  let deps = 0;
  let visited = {};
  visited[start] = true;

  while (true) {
    const person = queue[deps];

    if (person.length === 0) break;

    queue[deps + 1] = [];

    for (let i = 0; i < person.length; i++) {
      const item = person[i];

      graph[item].forEach((i) => {
        if (visited[i]) return;

        visited[i] = true;
        queue[deps + 1].push(i);
      });
    }

    deps += 1;
  }

  const count = queue.reduce((acc, cur, index) => acc + cur.length * index, 0);
  if (count < answer[0]) answer = [count, start];
};

for (let i = 1; i <= N; i++) {
  solution(i);
}

console.log(answer[1]);
