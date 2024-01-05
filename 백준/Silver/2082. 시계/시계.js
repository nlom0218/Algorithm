let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');

let time = Array.from({ length: 4 }).map(() => []);

for (let i = 0; i < input.length; i++) {
  const temp = input[i].split(' ');
  temp.forEach((item, index) => {
    time[index].push(item);
  });
}

time = time.map((item) => item.join(''));

const emptyNumber = Array.from({ length: 4 }).map(() => []);

for (let i = 0; i < time.length; i++) {
  const temp = time[i].split('');
  for (let j = 0; j < temp.length; j++) {
    if (temp[j] === '.') emptyNumber[i].push(j + 1);
  }
}

const map = {
  0: [5, 8, 11],
  1: [1, 2, 4, 5, 7, 8, 10, 11, 13, 14],
  2: [4, 5, 11, 12],
  3: [4, 5, 10, 11],
  4: [2, 5, 10, 11, 13, 14],
  5: [5, 6, 10, 11],
  6: [5, 6, 11],
  7: [4, 5, 7, 8, 10, 11, 13, 14],
  8: [5, 11],
  9: [5, 10, 11],
};

const min = [];

for (let i = 0; i < emptyNumber.length; i++) {
  for (let j = 0; j < 10; j++) {
    const numbers = map[j];
    const isEveryIncludes = numbers.every((item) =>
      emptyNumber[i].includes(item)
    );

    if (isEveryIncludes) {
      min.push(j);
      break;
    }
  }
}

console.log(`${min[0]}${min[1]}:${min[2]}${min[3]}`);
