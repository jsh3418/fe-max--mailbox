export class Point {
  #x;
  #y;
  constructor(x, y) {
    this.init(x, y);
    this.coord = { x: this.#x, y: this.#y };
  }
  get x() {
    return this.#x;
  }

  set x(x) {
    this.#x = x;
  }

  get y() {
    return this.#x;
  }

  set y(y) {
    this.#y = y;
  }
}

Point.prototype.init = function (x, y) {
  this.x = x;
  this.y = y;
};
