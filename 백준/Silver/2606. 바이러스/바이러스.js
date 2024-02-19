let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const pair = input.slice(2).map((item) => item.split(' ').map(Number));

const graph = {};

pair.forEach((item) => {
  const [x, y] = item;

  graph[x] = [...(graph[x] || []), y];
  graph[y] = [...(graph[y] || []), x];
});

let queue = [1];
let visited = { 1: true };

let index = 0;
while (index < queue.length) {
  const node = queue[index];
  let items = graph[node] ?? [];

  items.forEach((item) => {
    if (visited[item]) return;

    queue.push(item);
    visited[item] = true;
  });

  index += 1;
}

console.log(queue.length - 1);
