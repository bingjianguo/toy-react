/**
 * 描述一个真实的Dom元素
 */
class Wrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }

  setAttributes(name, value) {
    this.root.setAttribute(name, value);
  }

  appendChild(vchild) {
    vchild.mountTo(this.root);
  }
}


class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }

  setAttributes(name, value) {
    this.root.setAttribute(name, value);
  }

  appendChild(vchild) {
    vchild.mountTo(this.root);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

export class Component {
    /**
   * 后续用作继承的成员函数
   * @param {*} parent 
   */
  mountTo(parent) {
    let vdom = this.render();
    vdom.mountTo(parent);
  }

  setAttribute(name, value) {
    this[name] = value;
  }
}

/**
 * 
 * @param {*} type 
 * @param {*} attributes 
 * @param  {...any} children 
 */
export function createElement(type, attributes, ...children) {
  let element;
  if (typeof type === 'string') {
    debugger;
    element = new ElementWrapper(type);
  } else {
    element = new type;
  }

  for (let name in attributes) {
    element.setAttribute(name, attributes[name]);
  }

  for (let child of children) {
    if (typeof child === 'string') {
      child = new TextWrapper(child);
    }
    element.appendChild(child);
  }
  return element;
}
/**
 * 
 * @param {*} vdom 
 * @param {*} element 
 */
export function render(vdom, element) {
  debugger;
  vdom.mountTo(element);
  // element.appendChild(vdom);
}