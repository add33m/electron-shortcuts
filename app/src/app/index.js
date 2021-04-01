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
    this.setState({ loading: true, loadError: "" });
    // Read contents of shortcuts file and save to state
    fs.readFile("./config/shortcuts.json", (err, data) => {
      // Display error if file was not able to be loaded
      if (err) this.setState({ shortcuts: [], loading: false, loadError: "An error occured loading 'shortcuts.json'. Does it exist?\n" + err });

      // Wrap JSON parse and display error if something happens (parse will fail if JSON is not correctly formatted)
      try {
        const read = JSON.parse(data);
        this.setState({ shortcuts: read, loading: false });
      } catch (parseErr) {
        this.setState({ shortcuts: [], loading: false, loadError: "An error occured reading 'shortcuts.json'. Is the JSON properly formatted?\n" + parseErr });
      }
    });
  }

  render() {
    return (
      <div className="main-container">
        <div className="shortcuts-bg">
          {/* { this.state.loading && (<p>Loading...</p>) } */}
          { this.state.loadError && (<p>{this.state.loadError}</p>) }

          { this.state.shortcuts.length > 0 && this.state.shortcuts.map(shortcut => <Shortcut {...shortcut} />) }
        </div>
        
        <Overlay update={this.updateConfig} />
      </div>
    )
  }
}