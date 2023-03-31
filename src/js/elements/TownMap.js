import { Point } from "../Point.js";
import { gridInRange, markingGrid, overLapCheck } from "../utils.js";
import { Element } from "./Element.js";
import { Town } from "./Town.js";

const GRID_UNIT = 5;
const MAX_TRY_COUNT = 100;
const WIDTH_LIMIT = 32;
const HEIGHT_LIMIT = 32;

export class TownMap extends Element {
  constructor(parent) {
    super(parent);
    this.grid = null;
    this.body = null;
  }

  init(parent) {
    this.parent = parent;

    this.domNode = document.createElement("MAIN");
    this.domNode.id = "town-map";

    const h1 = document.createElement("H1");
    h1.className = "blind";
    h1.textContent = "메인";
    this.domNode.appendChild(h1);
  }

  async generateTown() {
    if (!this.body) {
      this.body = document.createElement("DIV");
      this.body.className = "town-map__body";
      this.domNode.appendChild(this.body);
    }

    this.body.innerHTML = "";

    const { width, height } = this.body.getBoundingClientRect();

    this.grid = Array.from({ length: parseInt(height / GRID_UNIT) }, () =>
      Array.from({ length: parseInt(width / GRID_UNIT) }, () => false)
    );

    for (let i = 0; i < MAX_TRY_COUNT; i++) {
      const p1 = new Point(
        parseInt((Math.random() * width) / GRID_UNIT),
        parseInt((Math.random() * height) / GRID_UNIT)
      );
      if (!gridInRange(this.grid, p1)) continue;

      const p2 = new Point(
        parseInt(
          p1.coord.x +
            (Math.random() * (width - p1.coord.x * GRID_UNIT)) / GRID_UNIT
        ),
        parseInt(
          p1.coord.y +
            (Math.random() * (height - p1.coord.y * GRID_UNIT)) / GRID_UNIT
        )
      );

      if (!gridInRange(this.grid, p2)) continue;

      if (overLapCheck(this.grid, p1, p2)) continue;
      if (p2.coord.x - p1.coord.x < WIDTH_LIMIT) continue;
      if (p2.coord.y - p1.coord.y < HEIGHT_LIMIT) continue;
      await markingGrid(this.grid, p1, p2);

      const town = new Town(this.body, p1, p2);
    }
  }
}
