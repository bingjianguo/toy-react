import * as ToyReact from './ToyReact.js';

class MyComponent extends ToyReact.Component {

  render() {
    return (
      <div>cool</div>
    )
  }

}
let a = <MyComponent />;

ToyReact.render(
  a,
  document.body
)
