import React, { Component } from "react";
import "./CoinContainer.css";

export default class CoinContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textInput: ""
    };
  }
  displayMore() {
    // if ()
  }
  render() {
    const { coins } = this.props;
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
        <button onClick={this.displayMore}>Show More</button>
      </div>
    );
  }
}
