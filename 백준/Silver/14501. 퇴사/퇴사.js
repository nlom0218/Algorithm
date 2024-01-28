let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const N = Number(input[0]);
const S = input.slice(1).map((item) => item.split(' ').map(Number));

const dp = Array.from({ length: N + 1 }).fill(0);

for (let i = 0; i < N; i++) {
  const [T, P] = S[i];

  if (i + T > N) continue;
  dp[i + T] = Math.max(P + Math.max(...dp.slice(0, i + 1)), dp[i + T]);
}

console.log(Math.max(...dp));
