export const customQuerySelector = (selector: string): Element | null => {
  const firstChar = selector[0];
  const selectorString = selector.slice(1, selector.length);

  if (firstChar === ".") {
    return findElement(document.body, "className", selectorString);
  }

  if (firstChar === "#") {
    return findElement(document.body, "id", selectorString);
  }

  return findElement(document.body, "tagName", selector);
};

const findElement = (
  element: Element,
  searchType: "className" | "id" | "tagName",
  keyword: string
): Element | null => {
  if (
    (searchType === "className" && element.classList.contains(keyword)) ||
    (searchType === "id" && element.id === keyword) ||
    (searchType === "tagName" && element.tagName === keyword.toLocaleUpperCase())
  ) {
    return element;
  }

  if (element.children) {
    let findElementResult: Element | null = null;
    Array.from(element.children).some((child) => {
      const result = findElement(child, searchType, keyword);

      if (result) {
        findElementResult = result;
        return true;
      }
    });

    return findElementResult;
  }

  return null;
};
