let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const cases = input.slice(1);

function solution(commands, length, array) {
  commands = commands.split('');
  const countD = commands.filter((item) => item === 'D').length;

  if (countD > length) {
    console.log('error');
    return;
  }

  array = array.substring(1, array.length - 1);
  array = array.split(',');

  let pos = 'head';
  let deleteHead = 0;
  let deleteTail = 0;

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];

    if (command === 'D' && pos === 'head') deleteHead += 1;
    else if (command === 'D' && pos === 'tail') deleteTail += 1;

    if (command === 'R' && pos === 'head') pos = 'tail';
    else if (command === 'R' && pos === 'tail') pos = 'head';
  }

  array = array.slice(deleteHead, array.length - deleteTail);

  if (pos === 'tail') array.reverse();

  console.log('[' + array.join(',') + ']');
}

for (let i = 0; i < cases.length; i += 3) {
  solution(cases[i], cases[i + 1], cases[i + 2]);
}
