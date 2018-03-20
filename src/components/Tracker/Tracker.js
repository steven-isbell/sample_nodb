import React, { Component } from "react";
import axios from "axios";
import "./Tracker.css";
import CoinMap from "../CoinContainer/components/CoinMap";

export default class Tracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: []
    };
    this.deleteCoin = this.deleteCoin.bind(this);
  }
  componentDidMount() {
    // We'll go get the coins that have been added to tracker when this component renders.
    // This component won't render until we click the link, making tracker true in the parent state
    // and the conditional rendering renders the component.
    // React doesn't render something just because it's imported, it has to be rendered on the DOM

    // the tracked=true after the ? is our query and will be available on the server as req.query
    // It will build an object with the key being tracked and the value being the string true.
    // If I had additional queries they would be additional key/value pairs on the object.
    axios
      .get("/api/get?tracked=true")
      .then(response => this.setState({ coins: response.data }))
      .catch(err => alert(err));
  }
  // Remove a coin from our array of tracked coins
  // We're using name, but you'd probably want to use an id
  // name will be received on the server as req.params.id
  deleteCoin(coin) {
    axios
      .delete(`/api/delete/${coin.name}`)
      .then(response => {
        this.setState({ coins: response.data });
        alert("Coin UnTracked!");
      })
      .catch(err => alert(err.message));
  }

  render() {
    // Destructure our state and props values
    const { coins } = this.state;
    const { editTitle, updateTitle, edit, title } = this.props;
    // build a 'props' object that has the data we want to pass as props to the child component.
    const props = {
      coins,
      coinFunc: this.deleteCoin,
      action: "Delete Coin",
      defaultVal: "You're Not Tracking Any Coins!"
    };
    // This ternary is checking if the value of the edit prop is false
    // If it's not, we'll render the title being passed down from the parent
    // Or My Coins if there is no title passed down
    // If the edit prop is true, It renders an input that allows us to enter a new title.
    // the onBlur on the input is fired when the input loses focus. It's the opposite of onFocus
    return (
      <div className="flex column">
        {!edit ? (
          <h1
            className="pointer tracker-title"
            title="Click To Change"
            onClick={editTitle}
          >
            {title || "My Coins"}
          </h1>
        ) : (
          <input
            placeholder={title || "My Coins"}
            onChange={event => updateTitle(event)}
            onBlur={editTitle}
            className="margined-bottom"
            maxLength="15"
          />
        )}
        {/* If you haven't already, check out Object Rest Spread to
            understand what's happing with the ..props. on the CoinMap Component
            https://github.com/tc39/proposal-object-rest-spread 
        */}
        <CoinMap {...props} />
      </div>
    );
  }
}
