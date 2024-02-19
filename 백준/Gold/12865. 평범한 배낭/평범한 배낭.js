let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const [N, K] = input[0].split(' ').map(Number);
const inputs = [
  0,
  ...input.slice(1).map((item) => item.split(' ').map(Number)),
];

const dp = Array.from({ length: K + 1 })
  .fill([])
  .map(() => Array.from({ length: N + 1 }).fill(0));

// i = 무게
// j = 물건 순서
for (let i = 1; i <= K; i++) {
  for (let j = 1; j <= N; j++) {
    const [W, V] = inputs[j];

    if (W > i) dp[i][j] = dp[i][j - 1];
    else dp[i][j] = Math.max(dp[i - W][j - 1] + V, dp[i][j - 1]);
  }
}

console.log(dp[K][N]);
