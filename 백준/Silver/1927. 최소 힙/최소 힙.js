let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

class Heap {
  constructor() {
    this.heap = [null];
  }

  // 힙에 요소 추가하기
  push(value) {
    this.heap.push(value);
    let cur_index = this.heap.length - 1;
    let parents_index = Math.floor(cur_index / 2);

    while (cur_index !== 1 && this.heap[parents_index] > value) {
      [this.heap[parents_index], this.heap[cur_index]] = [
        this.heap[cur_index],
        this.heap[parents_index],
      ];
      cur_index = parents_index;
      parents_index = Math.floor(cur_index / 2);
    }
  }

  // 힙에 요소 제거하기
  pop() {
    const value = this.heap[1];

    if (this.heap.length <= 2) this.heap = [null];
    else this.heap[1] = this.heap.pop();

    let cur_index = 1;
    let left_index = cur_index * 2;
    let right_index = cur_index * 2 + 1;

    if (!this.heap[left_index]) return value;
    if (!this.heap[right_index]) {
      if (this.heap[left_index] < this.heap[cur_index]) {
        [this.heap[left_index], this.heap[cur_index]] = [
          this.heap[cur_index],
          this.heap[left_index],
        ];
      }
      return value;
    }

    while (
      this.heap[left_index] < this.heap[cur_index] ||
      this.heap[right_index] < this.heap[cur_index]
    ) {
      let min_index =
        this.heap[left_index] > this.heap[right_index]
          ? right_index
          : left_index;

      [this.heap[min_index], this.heap[cur_index]] = [
        this.heap[cur_index],
        this.heap[min_index],
      ];

      cur_index = min_index;
      left_index = cur_index * 2;
      right_index = cur_index * 2 + 1;
    }
    return value;
  }
}

const commands = input.slice(1).map(Number);

const heap = new Heap();

const answer = [];

for (let i = 0; i < commands.length; i++) {
  const command = commands[i];

  if (command === 0) {
    if (heap.heap.length === 1) answer.push(0);
    else {
      const value = heap.pop();
      answer.push(value);
    }
  } else {
    heap.push(command);
  }
}

console.log(answer.join('\n'));
