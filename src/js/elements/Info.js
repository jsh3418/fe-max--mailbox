import { Element } from "./Element.js";

export class Info extends Element {
  constructor(parent) {
    super(parent);
  }

  init(parent) {
    this.parent = parent;
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

    confirmButton.addEventListener(
      "click",
      this.confirmButtonHandler.bind(this),
      { once: true }
    );
  }

  initText() {
    const hasMailBoxTowns = this.dom
      .selectAll("Town")
      .filter((town) => town.mailbox);

    const townNames = hasMailBoxTowns.map((town) => town.name);

    const totalCount = document.createElement("P");
    totalCount.className = "info__content";
    totalCount.innerHTML = `${townNames.join(", ")}<br /><br />총 ${
      hasMailBoxTowns.length
    }개의 마을입니다.`;
    this.domNode.appendChild(totalCount);

    function mailboxSizeGetter(town) {
      return parseInt(town.mailbox.style.width);
    }

    for (let i = hasMailBoxTowns.length - 1; i >= 0; i--) {
      for (let j = 0; j < i; j++) {
        if (
          mailboxSizeGetter(hasMailBoxTowns[j]) <
          mailboxSizeGetter(hasMailBoxTowns[j + 1])
        ) {
          [hasMailBoxTowns[j], hasMailBoxTowns[j + 1]] = [
            hasMailBoxTowns[j + 1],
            hasMailBoxTowns[j],
          ];
        }
      }
    }

    const sortByMailbox = document.createElement("P");
    sortByMailbox.className = "info__content";
    sortByMailbox.innerHTML = `우체통의 크기는<br /><br />${hasMailBoxTowns
      .map((town) => town.name)
      .join(", ")}<br /><br />순입니다`;
    this.domNode.appendChild(sortByMailbox);
  }
}

Info.prototype.confirmButtonHandler = function () {
  setTimeout(() => {
    const hasMailBoxTowns = this.dom
      .selectAll("Town")
      .filter((town) => town.mailbox);
    hasMailBoxTowns.forEach((town) => {
      town.domNode.className = "town town--confirm";
    });
    this.initText();
  }, 1000);
};
