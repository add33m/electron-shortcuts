import * as React from 'react';
const fs = require("fs");

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      readContent: "",
    };
  }

  componentDidMount() {
    console.log("Mounted");
    // Test read/write of json containing shortcuts
    fs.writeFileSync("shortcuts.json", '{"test": 123}');
    const read = fs.readFileSync("shortcuts.json").toString();
    this.setState({ readContent: read });
  }

  componentDidUpdate() {
    console.log("Updated");
  }

  render() {
    return (
      <div className="main-bg">
        <h2>Hello from React!</h2>
        <p>{this.state.readContent}</p>
      </div>
    )
  }
}