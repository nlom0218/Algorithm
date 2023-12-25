let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

input = input.slice(1);

function solution(arr1, arr2) {
  let dp = [[arr1[0], arr2[0]]];

  for (let i = 1; i < arr1.length; i++) {
    dp[i] = [];
    if (i === 1) {
      dp[i][0] = dp[i - 1][1] + arr1[i];
      dp[i][1] = dp[i - 1][0] + arr2[i];

      continue;
    }

    dp[i][0] = Math.max(dp[i - 1][1] + arr1[i], dp[i - 2][1] + arr1[i]);
    dp[i][1] = Math.max(dp[i - 1][0] + arr2[i], dp[i - 2][0] + arr2[i]);
  }

  console.log(Math.max(...dp.at(-1)));
}

for (let i = 0; i < input.length; i += 3) {
  solution(
    input[i + 1].split(' ').map(Number),
    input[i + 2].split(' ').map(Number)
  );
}
