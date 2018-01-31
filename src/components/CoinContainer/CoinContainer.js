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
    this.handlePaginate = this.handlePaginate.bind(this);
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
  handlePaginate(val) {
    this.props.paginate(val);
    this.setState(() => {
      document.getElementById("search").value = "";
      return { term: "" };
    });
  }
  render() {
    const { coins } = this.props;
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
          id="search"
          type="text"
          placeholder="Search Currencies"
          onChange={event => this.search(event.target.value)}
        />
        <CoinMap {...props} />
        <div>
          <button
            className="margined-right"
            onClick={event =>
              this.handlePaginate(event.target.innerHTML.toLowerCase())
            }
          >
            Previous
          </button>
          <button
            onClick={event =>
              this.handlePaginate(event.target.innerHTML.toLowerCase())
            }
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
