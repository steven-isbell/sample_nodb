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
    // this ternary is making sure that term being passed in has a value.
    return term
      ? this.setState({ term: term.toLowerCase() })
      : this.setState({ term: "" });
  }
  trackCoin(coin) {
    // This is our post to the server with the info of the coin we want to add to the tracker array
    axios
      .post("/api/post", coin)
      .then(response => alert(response.data.message))
      .catch(err => alert(err.message));
  }
  handlePaginate(val) {
    // This function invokes the paginate function on props and passes in "next" or "previous"
    // This will allow us to get the next or previous page of data from the server.
    this.props.paginate(val);
    // setState takes an optional callback function which allows us to do some logic.
    // Then return the object with the updates to state we want to make.
    // Here we're clearing the input then setting state.
    this.setState(() => {
      document.getElementById("search").value = "";
      return { term: "" };
    });
  }
  render() {
    const { coins } = this.props;
    const { term } = this.state;
    // contruct an object called 'props' with the data we want to pass as props
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
        {/* Here we're using Object Rest Spread to pass props. Check it out if you haven't already.
            https://github.com/tc39/proposal-object-rest-spread
          */}
        <CoinMap {...props} />
        <div>
          {/* event.target.innerHTML is grabbing the text of the button. It's a built in property on DOM Nodes, vanilla */}
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
