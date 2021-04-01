import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const https = require('https');

import '../styles/shortcut.css';

// Renders the overlay (buttons for editing/updating config)
export default class Shortcut extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "ready", // Show status of request when it's finished
    };

    this.debounce = false; // Prevent reactivation before previous request has been finished

    this.action = this.action.bind(this);
  }

  action() {
    if (this.debounce === true) return;

    const it = this; // This context will be lost in anon funcs in setTimeout, so save in var

    const { url, options={}, data="" } = this.props.http;

    if (url) {
      // Prevent other requests while performing this one
      this.debounce = true;

      const req = https.request(url, options, (res) => {
        const ok = res.statusCode.toString().startsWith("2");
        if (ok) {
          // OK request
          this.setState({ status: "ok" });
          setTimeout(() => {it.setState({ status: "ready" }); it.debounce = false}, 2000);
        } else {
          // Something other than 2XX was given
          this.setState({ status: "warn" });
          setTimeout(() => {it.setState({ status: "ready" }); it.debounce = false}, 2000);
        }

        res.on("data", (chunk) => {
          if (!ok) console.log(chunk.toString());
        })
      });

      req.on("error", () => {
        // Request failed
        this.setState({ status: "err" });
        setTimeout(() => {it.setState({ status: "ready" }); it.debounce = false}, 2000);
      });

      // Add data before sending
      if (data && options.method !== "GET") req.write(data);
      req.end();
    } 
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