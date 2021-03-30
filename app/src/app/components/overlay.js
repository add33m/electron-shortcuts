import React from 'react';
import { shell } from 'electron';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import '../styles/overlay.css';

// Renders the overlay (buttons for editing/updating config)
export default class Overlay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="overlayButton-container">
        <li className="overlayButton-item"
          onClick = {() => {
            // Open folder with shortcuts.json file and highlight file
            shell.showItemInFolder(process.cwd() + "\\config\\shortcuts.json");
          }}
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </li>
        <li className="overlayButton-item">
          <FontAwesomeIcon icon={faSyncAlt} />
        </li>
      </ul>
    )
  }
}