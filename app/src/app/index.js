import * as React from 'react';

import Overlay from './components/overlay';

const fs = require("fs");

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      readContent: "",
      code: "",
    };
  }

  componentDidMount() {
    // Test read/write of json containing shortcuts
    fs.writeFileSync("./config/shortcuts.json", '{"test": 123}');
    const read = fs.readFileSync("./config/shortcuts.json").toString();
    this.setState({ readContent: read });
  }

  componentDidUpdate() {
    console.log("Updated");
  }

  render() {
    return (
      <div className="main-container">
        <div className="shortcuts-bg">
          <h2>Hello from React!</h2>
          <p>{this.state.readContent}</p>
        </div>
        
        <Overlay />
      </div>
    )
  }
}