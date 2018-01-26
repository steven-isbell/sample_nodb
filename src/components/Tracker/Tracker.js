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
    axios
      .get("/api/get?tracked=true")
      .then(response => this.setState({ coins: response.data }))
      .catch(err => alert(err));
  }
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
    const { coins } = this.state;
    const { editTitle, updateTitle, finishEdit, edit, title } = this.props;
    const props = {
      coins,
      coinFunc: this.deleteCoin,
      action: "Delete Coin",
      defaultVal: "You're Not Tracking Any Coins!"
    };
    return (
      <div className="flex column">
        {!edit ? (
          <h1 className="pointer" title="Click To Change" onClick={editTitle}>
            {title || "My Coins"}
          </h1>
        ) : (
          <input
            placeholder={title || "My Coins"}
            onChange={event => updateTitle(event)}
            onBlur={finishEdit}
            className="margined-bottom"
            maxLength="15"
          />
        )}
        <CoinMap {...props} />
      </div>
    );
  }
}
