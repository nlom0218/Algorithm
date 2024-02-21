let input = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
// const input = require('fs').readFileSync(0, 'utf-8').trim();

const moving = [
  (x, y) => [x + 1, y],
  (x, y) => [x - 1, y],
  (x, y) => [x, y + 1],
  (x, y) => [x, y - 1],
];

const N = Number(input[0]);

const maps = input.slice(1).map((item) => item.split(' ').map(Number));

const max = Math.max(...maps.flat());

let answer = 1;

// 물의 높이가 max보다 크면 모두 잠기기 때문에 안전 영역은 0임
for (let i = 1; i <= max; i++) {
  const newMaps = JSON.parse(JSON.stringify(maps));
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: N }).fill(false)
  );

  let count = 0;

  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      const value = newMaps[x][y];

      if (value > i && !visited[x][y]) {
        count += 1;
        visited[x][y] = true;

        const queue = [[[x, y]]];
        let deps = 0;
        while (true) {
          const positions = queue[deps];

          if (positions.length === 0) break;

          queue[deps + 1] = [];

          for (let j = 0; j < positions.length; j++) {
            moving.forEach((fn) => {
              const [_x, _y] = fn(positions[j][0], positions[j][1]);

              if (_x < 0 || _x >= N) return;
              if (_y < 0 || _y >= N) return;

              if (visited[_x][_y]) return;

              if (newMaps[_x][_y] > i) {
                queue[deps + 1].push([_x, _y]);
                visited[_x][_y] = true;
              }
            });
          }

          deps += 1;
        }
      }
    }
  }
  answer = Math.max(answer, count);
}

console.log(answer);
