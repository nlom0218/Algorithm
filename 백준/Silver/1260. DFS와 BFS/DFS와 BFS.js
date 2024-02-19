let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const [N, M, V] = input[0].split(' ').map(Number);
const edges = input.slice(1).map((item) => item.split(' ').map(Number));

const graph = Array.from({ length: N + 1 }).map(() => []);

for (let [start, end] of edges) {
  graph[start].push(end);
  graph[end].push(start);
}

const dfs = [];
const stack = [V];
while (stack.length > 0) {
  const src = stack.pop();
  if (!dfs.includes(src)) dfs.push(src);
  const next = graph[src];
  next.sort((a, b) => b - a);
  for (const dest of next) {
    if (!dfs.includes(dest)) stack.push(dest);
  }
}

const bfs = [];
const queue = [V];
while (queue.length > 0) {
  const src = queue.shift();
  if (!bfs.includes(src)) bfs.push(src);
  const next = graph[src];
  next.sort((a, b) => a - b);
  for (const dest of next) {
    if (!bfs.includes(dest)) queue.push(dest);
  }
}

console.log(dfs.join(' '));
console.log(bfs.join(' '));
