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
      <div>
        <input
          type="text"
          placeholder="Search Available Currencies"
          onChange={event => search(event.target.value)}
        />
        <CoinMap coins={coins} />
        <button
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
    );
  }
}
