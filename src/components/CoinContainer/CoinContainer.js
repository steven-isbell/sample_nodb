import React, { Component } from "react";
import axios from "axios";

import CoinMap from "./components/CoinMap";
import "./CoinContainer.css";

export default class CoinContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };
    this.search = this.search.bind(this);
    this.trackCoin = this.trackCoin.bind(this);
  }
  search(term) {
    return term ? this.setState({ term }) : this.setState({ term: "" });
  }
  trackCoin(coin) {
    axios
      .post("/api/post", coin)
      .then(response => alert(response.data.message))
      .catch(err => alert(err.message));
  }
  render() {
    const { coins, paginate } = this.props;
    const { term } = this.state;
    const props = {
      coins,
      term,
      coinFunc: this.trackCoin,
      action: "Track Coin",
      defaultVal: "No Matching Coins"
    };
    return (
      <div className="flex coin-container">
        <input
          type="text"
          placeholder="Search Currencies"
          onChange={event => this.search(event.target.value)}
        />
        <CoinMap {...props} />
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
