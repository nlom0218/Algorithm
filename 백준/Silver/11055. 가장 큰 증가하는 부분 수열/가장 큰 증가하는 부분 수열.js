let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const numbers = input[1].split(' ').map(Number);

let dp = [];
for (let i = 0; i < numbers.length; i++) {
  dp[i] = numbers[i];
  for (let k = 0; k < i; k++) {
    if (numbers[k] < numbers[i]) {
      dp[i] = Math.max(dp[i], dp[k] + numbers[i]);
    }
  }
}

console.log(Math.max(...dp));
