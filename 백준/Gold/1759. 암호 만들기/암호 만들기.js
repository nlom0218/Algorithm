let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const [L, C] = input[0].split(' ').map(Number);
const chars = input[1].split(' ').sort();

const gather = ['a', 'e', 'i', 'o', 'u'];
const answer = [];

const 재귀 = (string, index) => {
  if (index > chars.length) return;

  if (string.length === L) {
    let gatherCount = 0;

    for (let i = 0; i < L; i++) {
      const char = string[i];
      if (gather.includes(char)) gatherCount += 1;
    }

    if (gatherCount >= 1 && gatherCount <= L - 2) answer.push(string);

    return;
  }

  재귀(string + chars[index], index + 1);
  재귀(string, index + 1);
};

재귀('', 0);

console.log(answer.join('\n'));
