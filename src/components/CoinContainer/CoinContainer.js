import React, { Component } from "react";
import axios from "axios";
import "./CoinContainer.css";

export default class CoinContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textInput: ""
    };
  }
  render() {
    const { coins, paginate } = this.props;
    const coinMap = (
      <div className="coin-container">
        {coins.map((coin, idx) => (
          <div className="coin" key={idx}>
            {coin.name}
          </div>
        ))}
      </div>
    );
    return (
      <div>
        <input type="text" placeholder="Search Available Currencies" />
        {coinMap}
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
