export const customQuerySelector = (selector: string): Element | null => {
  const firstChar = selector[0];
  const selectorString = selector.slice(1, selector.length);

  if (firstChar === ".") {
    return findElement("className", selectorString);
  }

  if (firstChar === "#") {
    return findElement("id", selectorString);
  }

  return findElement("tagName", selector);
};

const findElement = (
  searchType: "className" | "id" | "tagName",
  keyword: string,
  element: Element = document.body
): Element | null => {
  if (isFound(searchType, keyword, element)) {
    return element;
  }

  if (element.children) {
    let findElementResult: Element | null = null;
    Array.from(element.children).some((child) => {
      const result = findElement(searchType, keyword, child);

      if (result) {
        findElementResult = result;

        return true;
      }
    });

    return findElementResult;
  }

  return null;
};

const isFound = (
  searchType: "className" | "id" | "tagName",
  keyword: string,
  element: Element
): Boolean => {
  return (
    (searchType === "className" && element.classList.contains(keyword)) ||
    (searchType === "id" && element.id === keyword) ||
    (searchType === "tagName" && element.tagName === keyword.toLocaleUpperCase())
  );
};
