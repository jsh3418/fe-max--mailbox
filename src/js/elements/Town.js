import { Point } from "../Point.js";
import { gridInRange, markingGrid, numToAlpha, overLapCheck } from "../utils.js";
import { getRandomBetween } from "../utils/getRandomBetween.js";
import { Element } from "./Element.js";


const WIDTH_LIMIT = 8;
const HEIGHT_LIMIT = 8;

const GRID_UNIT = 5;
const MAX_TRY_COUNT = 10;

const MIN_MAILBOX_SIZE = 20;
const MAX_MAILBOX_SIZE = 80;

export class Town extends Element {
  constructor(parent, p1, p2) {
    super(parent);
    this.initPos(p1, p2);
    this.mailbox = null;
  }

  init(parent) {
    this.parent = parent;
    this.id = this.dom.selectAll("Town").length ?? 0;

    this.domNode = document.createElement("ARTICLE");
    this.domNode.className = "town";

    const h1 = document.createElement("H1");
    h1.textContent = numToAlpha(this.id);
    this.domNode.appendChild(h1);
  }

  initPos(p1, p2) {
    this.domNode.style.left = `${p1.coord.x * 5}px`;
    this.domNode.style.top = `${p1.coord.y * 5}px`;
    const width = (p2.coord.x - p1.coord.x) * 5;
    const height = (p2.coord.y - p1.coord.y) * 5;
    this.domNode.style.width = `${width}px`;
    this.domNode.style.height = `${height}px`;

    const hasMailbox = Math.random() > 0.5;

    if(hasMailbox) {
      this.generateMailbox()
    }

    this.render();
    this.generateTown()
  }

  generateMailbox() {
    this.mailbox = document.createElement("IMG");
    this.mailbox.className = "mailbox";
    this.mailbox.src = "./src/img/mailbox.svg";
    this.mailbox.alt = "우체통";
    const size = getRandomBetween(MIN_MAILBOX_SIZE, MAX_MAILBOX_SIZE);
    this.mailbox.style.width = `${size}px`;
    this.mailbox.style.height = `${size}px`;
    this.domNode.appendChild(this.mailbox);
  }

  async generateTown() {
    if (!this.body) {
      this.body = document.createElement("DIV");
      this.body.className = "town__body";
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
