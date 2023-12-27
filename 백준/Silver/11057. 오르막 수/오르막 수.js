// let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
const input = require('fs').readFileSync(0, 'utf-8').trim();

const dp = [[1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n]];

for (let i = 1; i < Number(input); i++) {
  dp[i] = [1n];
  for (let j = 1; j < 10; j++) {
    dp[i][j] = dp[i][j - 1] + dp[i - 1][j];
  }
}

console.log(Number(dp.at(-1).reduce((acc, cur) => acc + cur, 0n) % 10007n));
