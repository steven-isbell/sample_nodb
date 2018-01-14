import React, { Component } from "react";
import axios from "axios";

import CoinMap from "./components/CoinMap";
import "./CoinContainer.css";

export default class CoinContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { coins, paginate, search } = this.props;
    return (
      <div className="flex coin-container">
        <input
          type="text"
          placeholder="Search Currencies"
          onChange={event => search(event.target.value)}
        />
        <CoinMap coins={coins} />
        <div>
          <button
            className="margined-right"
            onClick={event => paginate(event.target.innerHTML.toLowerCase())}
          >
            Previous
          </button>
          <button
            onClick={event => {
              paginate(event.target.innerHTML.toLowerCase());
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
