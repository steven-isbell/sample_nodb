import React from "react";
import "./CoinMap.css";

// Here we're destructuring the props off the props object passed to the functional component.
// We're using default values on the props to make sure that none of them are undefined at runtime.
// Then we're checking to see if the coins array being passed down has content.
// If it does then we're filtering based on the search term passed down to see if it's in the name or ticker.
// Once we've filtered we're chaining a .map to map over the remaining elements in the filtered array and render them to the DOM.
// If coins has no content, we're rendering the string stating that there's nothing there.
// That defaultVal is coming from either CoinContainer or Tracker.
// By using props, we're able to reuse this component to render in both our coins view and our tracker view.
// You could move the search to the server so you can search all coins and not just those on the screen if you wanted to improve the UX.
const CoinMap = ({
  coins = [],
  coinFunc = null,
  term = "",
  action = "",
  defaultVal = ""
}) =>
  coins.length > 0 ? (
    <div className="flex coin-map-container">
      {coins
        .filter(
          coin =>
            coin.name.toLowerCase().includes(term) ||
            coin.ticker.toLowerCase().includes(term)
        )
        .map((coin, idx) => (
          <div className="coin-card flex" key={idx}>
            <h2>{coin.name}</h2>
            <div className="wide flex column margined-bottom">
              <p>BTC Value// </p>
              <p>{coin.btc} BTC</p>
            </div>
            <div className="wide flex column margined-bottom">
              <p>Rank// </p>
              <p>{coin.rank}</p>
            </div>
            <div className="wide flex column margined-bottom">
              <p>Ticker// </p>
              <p>{coin.ticker}</p>
            </div>
            <div className="wide flex column margined-bottom">
              <p>USD Value// </p>
              <p>$ {coin.usd}</p>
            </div>
            <button onClick={() => coinFunc(coin)}>{action}</button>
          </div>
        ))}
    </div>
  ) : (
    defaultVal
  );

export default CoinMap;
