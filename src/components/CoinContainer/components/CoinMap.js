import React from "react";
import "./CoinMap.css";

const CoinMap = ({ coins, trackCoin }) =>
  coins.length > 0 ? (
    <div className="flex coin-map-container">
      {coins.map((coin, idx) => (
        <div className="coin-card flex" key={idx}>
          <h2>{coin.name}</h2>
          <p>{coin.btc} BTC</p>
          <p>{coin.rank}</p>
          <p>{coin.ticker}</p>
          <p>$ {coin.usd}</p>
          <button onClick={() => trackCoin(coin.ticker)}>Track Coin</button>
        </div>
      ))}
    </div>
  ) : (
    "No Matching Coins"
  );

export default CoinMap;
