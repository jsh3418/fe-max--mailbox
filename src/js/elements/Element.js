export class Element {
  constructor(parent) {
    this.parent = null;
    this.domNode = null;
    this.init(parent);
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
