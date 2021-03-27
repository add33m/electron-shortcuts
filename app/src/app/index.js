import * as React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hello: "hi",
    };
  }

  render() {
    return (
      <h2>Hello from React!</h2>
    )
  }
}