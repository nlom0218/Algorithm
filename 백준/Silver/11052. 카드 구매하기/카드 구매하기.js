let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const P = [0, ...input.slice(1)[0].split(' ').map(Number)];

const dp = [0, P[1]];

for (let i = 2; i <= Number(input[0]); i++) {
  dp[i] = P[i];
  for (let j = 1; j < i; j++) {
    dp[i] = Math.max(dp[i], dp[j] + dp[i - j]);
  }
}

console.log(dp.at(-1));
