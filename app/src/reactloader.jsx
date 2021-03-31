import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from "./app";

const fs = require('fs');

// Make sure a config directory and shortcuts.json file exist
if (!fs.existsSync("./config")) {
  fs.mkdirSync("./config");
  if (!fs.existsSync("./config/shortcuts.json")) {
    fs.writeFileSync("./config/shortcuts.json", "[]");
  }
}

// Add all fas icons so that shortcuts.json can use them
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

render();