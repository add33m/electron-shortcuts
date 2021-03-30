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

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

render();