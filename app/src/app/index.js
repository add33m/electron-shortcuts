import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      noShortcuts: false, // Display a message if no shortcuts have been added
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
      if (err || !data) return this.setState({ shortcuts: [], loading: false, loadError: "An error occured loading 'shortcuts.json'. Does it exist?\n" + err });

      // Wrap JSON parse and display error if something happens (parse will fail if JSON is not correctly formatted)
      try {
        const read = JSON.parse(data);
        this.setState({ shortcuts: read, loading: false, noShortcuts: !(read.length > 0) });
      } catch (parseErr) {
        this.setState({ shortcuts: [], loading: false, loadError: "An error occured reading 'shortcuts.json'. Is the JSON properly formatted?\n" + parseErr });
      }
    });
  }

  render() {
    return (
      <div className="main-container">

        {/* { this.state.loading && (<p>Loading...</p>) } */}
        { this.state.loadError && (<p className="main-error">{this.state.loadError}</p>) }
        { this.state.noShortcuts && (
          <p className="main-message">
            It looks like you haven't added any shortcuts yet!<br />
            Click the <FontAwesomeIcon icon="pencil-alt" /> at the bottom right to start editing the 'shortcuts.json' file,
            then click <FontAwesomeIcon icon="sync-alt" /> to load 'em in!
          </p>
        ) }

        <div className="shortcuts-bg">
          { this.state.shortcuts.length > 0 && this.state.shortcuts.map(shortcut => <Shortcut {...shortcut} />) }
        </div>
        
        <Overlay update={this.updateConfig} />
      </div>
    )
  }
}