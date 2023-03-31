const dom = {};

export class FakeDom {
  constructor() {}

  addElement(elem) {
    const name = elem.constructor.name;
    if (name in dom) {
      dom[name].push(elem);
    } else {
      dom[name] = [elem];
    }
  }

  select(name) {
    if (!(name in dom)) return null;
    return dom[name][0];
  }

  selectAll(name) {
    if (!(name in dom)) return [];
    return dom[name];
  }
}
