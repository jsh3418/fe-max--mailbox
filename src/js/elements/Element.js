import { FakeDom } from "../FakeDom.js";

export class Element {
  constructor(parent) {
    this.parent = null;
    this.domNode = null;
    this.dom = new FakeDom();
    this.init(parent);
    this.dom.addElement(this);
  }

  init(parent) {
    this.parent = parent;
    this.domNode = document.createElement("DIV");
  }

  render() {
    return this.parent ? this.parent.appendChild(this.domNode) : null;
  }

  view() {
    return this.domNode ? this.domNode.outerHTML : null;
  }
}
