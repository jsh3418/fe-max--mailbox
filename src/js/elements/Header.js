import { Element } from "./Element.js";

export class Header extends Element {
  constructor(parent) {
    super(parent);
  }

  init(parent) {
    this.parent = parent;
    this.domNode = document.createElement("HEADER");

    const inner = document.createElement("DIV");
    inner.className = "inner";
    this.domNode.appendChild(inner);

    const h1 = document.createElement("H1");
    h1.setAttribute("aria-label", "마을 지도");
    h1.setAttribute("tabindex", "1");
    inner.appendChild(h1);

    const flagImg = document.createElement("IMG");
    flagImg.src = "./src/img/kr.svg";
    flagImg.alt = "태극기";
    h1.appendChild(flagImg);

    const span = document.createElement("SPAN");
    span.textContent = " 마을지도 ";
    h1.appendChild(span);

    const mapImg = document.createElement("IMG");
    mapImg.src = "./src/img/map.svg";
    mapImg.alt = "지도 이미지";
    h1.appendChild(mapImg);
  }
}
