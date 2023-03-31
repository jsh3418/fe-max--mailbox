import { numToAlpha } from "../utils.js";
import { Container } from "./Container.js";
import { Element } from "./Element.js";
import { Header } from "./Header.js";

export class App extends Element {
  constructor($body) {
    super($body);
  }

  init(parent) {
    this.parent = parent;
    this.domNode = parent.children[0];
    this.domNode.innerHTML = "";

    const header = new Header(this.domNode);
    header.render();
    const container = new Container(this.domNode);
    container.render();

    const townMap = this.dom.select("TownMap");
    
    townMap.generateTown()
    // townMap.generateTown();
  }
}
