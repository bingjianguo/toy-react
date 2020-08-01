/**
 * 描述一个真实的Dom元素
 */
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
  constructor() {
    this.children = [];
  }
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

  appendChild(vchild) {
    this.children.push(vchild);
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
    element = new ElementWrapper(type);
  } else {
    element = new type;
  }

  for (let name in attributes) {
    element.setAttribute(name, attributes[name]);
  }

  let insertChildren = (children) => {
    for (let child of children) {
  
      if (typeof child === 'object' && child instanceof Array) {
        insertChildren(child);
      } else {
        if (typeof child === 'string') {
          child = new TextWrapper(child);
        } 
        else if (
          !(child instanceof Component)
          && !(child instanceof ElementWrapper)
          && !(child instanceof TextWrapper)
        ) {
          child = String(child);
        }
        element.appendChild(child);
      }
      
    }
  }
  insertChildren(children);

  return element;
}
/**
 * 
 * @param {*} vdom 
 * @param {*} element 
 */
export function render(vdom, element) {
  vdom.mountTo(element);
  // element.appendChild(vdom);
}