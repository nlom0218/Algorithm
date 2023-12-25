let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const P = input[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);

const dp = [P[0]];

for (let i = 1; i < P.length; i++) {
  dp[i] = dp[i - 1] + P[i];
}

console.log(dp.reduce((acc, cur) => acc + cur, 0));
