import { Element } from "./Element.js";

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

    const map = document.createElement("MAIN");
    map.id = "map";
    inner.appendChild(map);

    const mapH1 = document.createElement("H1");
    mapH1.className = "blind";
    mapH1.textContent = "메인";
    map.appendChild(mapH1);

    const article = document.createElement("ARTICLE");
    article.id = "child";
    map.appendChild(article);

    const info = document.createElement("ASIDE");
    info.id = "info";
    inner.appendChild(info);

    const infoH1 = document.createElement("H1");
    infoH1.className = "blind";
    infoH1.textContent = "지도 설명";
    info.appendChild(infoH1);

    const confirmButton = document.createElement("BUTTON");
    confirmButton.className = "confirm";
    confirmButton.textContent = "빨간 우체통 확인";
    info.appendChild(confirmButton);

    const totalCount = document.createElement("P");
    totalCount.className = "info__content";
    totalCount.textContent = `총 3개의 마을입니다.`;
    info.appendChild(totalCount);

    const sortByMailbox = document.createElement("P");
    sortByMailbox.className = "info__content";
    sortByMailbox.textContent = `우체통의 크기는 L,K,J순입니다`;
    info.appendChild(sortByMailbox);
  }
}
