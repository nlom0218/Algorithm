function solution(friends, gifts) {
  const map = {};

  for (let i = 0; i < friends.length; i++) {
    const friend = friends[i];

    map[friend] = {
      준선물: 0,
      받은선물: 0,
      받을선물: 0,
    };
  }

  for (let i = 0; i < gifts.length; i++) {
    const [from, to] = gifts[i].split(' ');

    if (!map[from]) map[from] = {};
    if (!map[to]) map[to] = {};

    map[from]['준선물'] += 1;
    map[to]['받은선물'] += 1;
    map[from][to] = (map[from][to] || 0) + 1;
  }

  function recursion(array, i) {
    if (i > friends.length) return;
    if (array.length === 2) {
      const [friend1, friend2] = array;

      // 조건1
      if ((map[friend1][friend2] || 0) > (map[friend2][friend1] || 0)) {
        map[friend1]['받을선물'] = (map[friend1]['받을선물'] || 0) + 1;
      } else if ((map[friend1][friend2] || 0) < (map[friend2][friend1] || 0)) {
        map[friend2]['받을선물'] = (map[friend2]['받을선물'] || 0) + 1;
      }

      // 조건2
      else {
        const gift1 = map[friend1]['준선물'] - map[friend1]['받은선물'];
        const gift2 = map[friend2]['준선물'] - map[friend2]['받은선물'];
        if (gift1 > gift2) {
          map[friend1]['받을선물'] = map[friend1]['받을선물'] + 1;
        } else if (gift1 < gift2) {
          map[friend2]['받을선물'] = map[friend2]['받을선물'] + 1;
        }
      }

      return;
    }

    recursion([...array, friends[i]], i + 1);
    recursion(array, i + 1);
  }

  recursion([], 0);

  return Math.max(...Object.values(map).map((item) => item['받을선물'] || 0));
}
