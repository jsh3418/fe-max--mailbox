const ALPHA = [];

for (let i = 65; i < 91; i++) {
  ALPHA.push(String.fromCharCode(i));
}

export const getRandomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export function numToAlpha(num) {
  if (num === 0) return "A";
  let str = "";
  let current = num;
  while (current > 0) {
    str = ALPHA[current % 26] + str;
    current = parseInt(current / 26);
  }

  return str;
}

export function gridInRange(grid, point) {
  if (point.coord.y < 0 || grid.length <= point.coord.y) {
    return false;
  }
  if (point.coord.x < 0 || grid[0].length <= point.coord.x) {
    return false;
  }
  return true;
}

export function overLapCheck(grid, p1, p2) {
  for (let row = p1.coord.y; row <= p2.coord.y; row++) {
    for (let col = p1.coord.x; col <= p2.coord.x; col++) {
      if (grid[row][col]) return true;
    }
  }

  return false;
}

export function markingGrid(grid, p1, p2) {
  return new Promise((resolve, reject) => {
    for (let row = p1.coord.y; row <= p2.coord.y; row++) {
      for (let col = p1.coord.x; col <= p2.coord.x; col++) {
        grid[row][col] = true;
      }
    }
    resolve();
  });
}
