import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styles/shortcut.css';

// Renders the overlay (buttons for editing/updating config)
export default class Shortcut extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "ready",
    };

    this.action = this.action.bind(this);
  }

  action() {
    const it = this;
    setTimeout(() => it.setState({ status: "ok" }), 0);
    setTimeout(() => it.setState({ status: "err" }), 2000);
    setTimeout(() => it.setState({ status: "warn" }), 4000);
    setTimeout(() => it.setState({ status: "ready" }), 6000);


  }

  render() {
    const { status } = this.state;
    const { name, color, icon, http } = this.props;

    if (name && color && icon && http)
      return (
        <div className="shortcut-container" onClick={this.action}>
          <div className="shortcut-main" style={{backgroundColor: color}}>
            <div className="shortcut-icon">
              <FontAwesomeIcon icon={icon} />
            </div>

            <h2 className="shortcut-name"> {name} </h2>

            <div className="shortcut-status"
              style = {{
                backgroundColor:
                // Set different color depending on current http req status
                status === "ready" ? "transparent" // hidden when not used
                : status === "ok" ? "#33cc33" // green when request got ok
                : status === "err" ? "#ff4d4d" // red when request failed
                : status === "warn" ? "#ffd633" // yellow when request didn't get ok but succeeded
                : "",
                borderColor: status !== "ready" ? "white" : "transparent"
              }}
            >
            </div>
          </div>
        </div>
      )
    else
      return (
        <div className="shortcut-main" style={{backgroundColor: "#ff4d4d"}}>
          <div className="shortcut-icon">
            <FontAwesomeIcon icon="times-circle" />
          </div>
          <h2 className="shortcut-name">
            Error
          </h2>
        </div>
      )
  }
}