import { numToAlpha } from "../utils.js";
import { Container } from "./Container.js";
import { Element } from "./Element.js";
import { Header } from "./Header.js";

export class App extends Element {
  constructor($body) {
    super($body);
  }

  async init(parent) {
    this.parent = parent;
    this.domNode = parent.children[0];
    this.domNode.innerHTML = "";

    const header = new Header(this.domNode);
    header.render();
    const container = new Container(this.domNode);
    container.render();

    const townMap = this.dom.select("TownMap");
    await townMap.generateTown();
    const info = this.dom.select("Info");
  }
}
