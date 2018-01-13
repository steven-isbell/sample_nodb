import React from "react";
import "./CoinMap.css";

const CoinMap = ({ coins }) =>
  coins.length > 0 ? (
    <div className="flex coin-map-container">
      {coins.map((coin, idx) => (
        <div className="coin-card flex" key={idx}>
          <h2>{coin.name}</h2>
          <p>{coin.btc} BTC</p>
          <p>{coin.rank}</p>
          <p>{coin.ticker}</p>
          <p>{coin.usd}</p>
        </div>
      ))}
    </div>
  ) : (
    "No Matching Coins"
  );

export default CoinMap;
