import { Element } from "./Element.js";

export class Info extends Element {
  constructor(parent) {
    super(parent)
  }

  init(parent) {
    this.parent = parent
    this.domNode = document.createElement("ASIDE");
    this.domNode.id = "info";

    const h1 = document.createElement("H1");
    h1.className = "blind";
    h1.textContent = "지도 설명";
    this.domNode.appendChild(h1);

    const confirmButton = document.createElement("BUTTON");
    confirmButton.className = "confirm";
    confirmButton.textContent = "빨간 우체통 확인";
    this.domNode.appendChild(confirmButton);

    const totalCount = document.createElement("P");
    totalCount.className = "info__content";
    totalCount.textContent = `총 3개의 마을입니다.`;
    this.domNode.appendChild(totalCount);

    const sortByMailbox = document.createElement("P");
    sortByMailbox.className = "info__content";
    sortByMailbox.textContent = `우체통의 크기는 L,K,J순입니다`;
    this.domNode.appendChild(sortByMailbox);
  }
}