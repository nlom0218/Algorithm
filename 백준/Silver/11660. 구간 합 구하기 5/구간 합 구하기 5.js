let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const [N] = input[0].split(' ').map(Number);

const inputs = input.slice(N + 1).map((item) => item.split(' ').map(Number));

const matrix = [
  0,
  ...input.slice(1, N + 1).map((item) => [0, ...item.split(' ').map(Number)]),
];

const dp = [Array.from({ length: N + 1 }).fill(0)];

for (let i = 1; i <= N; i++) {
  dp[i] = [0];
  for (let j = 1; j <= N; j++) {
    dp[i][j] =
      dp[i - 1][j] +
      (dp[i][j - 1] || 0) -
      (dp[i - 1][j - 1] || 0) +
      matrix[i][j];
  }
}

const answer = [];

inputs.forEach((item) => {
  const [x1, y1, x2, y2] = item;

  answer.push(
    dp[x2][y2] - dp[x1 - 1][y2] - dp[x2][y1 - 1] + dp[x1 - 1][y1 - 1]
  );
});

console.log(answer.join('\n'));
