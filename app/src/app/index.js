import * as React from 'react';

import Shortcut from './components/shortcut';
import Overlay from './components/overlay';

const fs = require("fs");

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shortcuts: [],
      loading: true,
      loadError: "",
    };

    this.updateConfig = this.updateConfig.bind(this);
  }

  componentDidMount() {
    this.updateConfig();
  }

  updateConfig() {
    // Read contents of shortcuts file and save to state
    fs.readFile("./config/shortcuts.json", (err, data) => {
      // Display error if file was not able to be loaded
      if (err) this.setState({ loadError: "An error occured loading 'shortcuts.json'. Does it exist?\n" + err });

      // Wrap JSON parse and display error if something happens (parse will fail if JSON is not correctly formatted)
      try {
        const read = JSON.parse(data);
        this.setState({ shortcuts: read, loading: false });
      } catch (e) {
        this.setState({ loadError: "An error occured reading 'shortcuts.json'. Is the JSON properly formatted?\n" + err });
      }
    });
  }

  render() {
    return (
      <div className="main-container">
        <div className="shortcuts-bg">
          {/* <p>{JSON.stringify(this.state.shortcuts)}</p> */}

          { this.state.shortcuts.map(shortcut => <Shortcut {...shortcut} />) }
        </div>
        
        <Overlay update={this.updateConfig} />
      </div>
    )
  }
}