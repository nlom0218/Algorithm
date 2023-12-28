let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

const size = Number(input[0].split(' ')[1]);
const inkSize = Number(input[0].split(' ')[0]);
const inks = input[1];
let map = input.slice(2, -1);
let stringMap = map.join('').split('');
const commands = input.at(-1);

let inkAmount = 0;
let inkColor = -1;
let initPos = [];
let position = [];
let dumpPos = [];
const notAllowed = [...inks.split(''), '#'];

for (let i = 0; i < stringMap.length; i++) {
  if (stringMap[i] === '@') {
    position = [Math.floor(i / size), i % size];
    initPos = [Math.floor(i / size), i % size];
  }

  if (stringMap[i] === '#') {
    dumpPos.push([Math.floor(i / size), i % size]);
  }
}

for (let i = 0; i < commands.length; i++) {
  const command = commands[i];

  if (command === 'U' && position[0] > 0) {
    position = [position[0] - 1, position[1]];
    const stringPos = position[0] * size + position[1];
    if (notAllowed.includes(stringMap[stringPos]))
      position = [position[0] + 1, position[1]];
  }
  if (command === 'D' && position[0] < size - 1) {
    position = [position[0] + 1, position[1]];
    const stringPos = position[0] * size + position[1];
    if (notAllowed.includes(stringMap[stringPos]))
      position = [position[0] - 1, position[1]];
  }
  if (command === 'L' && position[1] > 0) {
    position = [position[0], position[1] - 1];
    const stringPos = position[0] * size + position[1];
    if (notAllowed.includes(stringMap[stringPos]))
      position = [position[0], position[1] + 1];
  }
  if (command === 'R' && position[1] < size - 1) {
    position = [position[0], position[1] + 1];
    const stringPos = position[0] * size + position[1];
    if (notAllowed.includes(stringMap[stringPos]))
      position = [position[0], position[1] - 1];
  }

  if (command === 'j') {
    inkAmount += 1;
  }

  if (command === 'J') {
    inkColor += 1;

    if (inkAmount === 0) continue;

    for (let i = 0; i < dumpPos.length; i++) {
      const dump = dumpPos[i];
      const x = Math.abs(dump[0] - position[0]);
      const y = Math.abs(dump[1] - position[1]);
      if (x + y <= inkAmount) {
        stringMap[dump[0] * size + dump[1]] = inks[inkColor % inkSize];
      }
    }

    inkAmount = 0;
  }
}

stringMap[initPos[0] * size + initPos[1]] = '.';
stringMap[position[0] * size + position[1]] = '@';

const answer = [];

for (let i = 0; i < stringMap.length; i += size) {
  answer.push(stringMap.slice(i, i + size));
}

console.log(answer.map((item) => item.join('')).join('\n'));
