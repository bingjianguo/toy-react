import * as ToyReact from './ToyReact.js';

class MyComponent extends ToyReact.Component {

  render() {
    return (
      <div>
        <span>hello</span>
        <span>world!</span>
        <div>
          {this.children}
        </div>
      </div>
    )
  }

}
let a = <MyComponent name="a" id="ida"><div>ddd</div></MyComponent>;

ToyReact.render(
  a,
  document.body
)
