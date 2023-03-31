import { Element } from "./Element.js";
import { Info } from "./Info.js";
import { TownMap } from "./TownMap.js";

export class Container extends Element {
  constructor(parent) {
    super(parent);
  }

  init(parent) {
    this.parent = parent;
    this.domNode = document.createElement("DIV");
    this.domNode.className = "container";

    const inner = document.createElement("DIV");
    inner.className = "inner";
    this.domNode.appendChild(inner);

    const townMap = new TownMap(inner);
    townMap.render();

    const info = new Info(inner);
    info.render();
  }
}
