import React from "react";
import "./CoinMap.css";

const CoinMap = ({ coins, coinFunc, term = "", action, defaultVal }) =>
  coins.length > 0 ? (
    <div className="flex coin-map-container">
      {coins
        .filter(coin => coin.name.toLowerCase().includes(term))
        .map((coin, idx) => (
          <div className="coin-card flex" key={idx}>
            <h2>{coin.name}</h2>
            <p>{coin.btc} BTC</p>
            <p>{coin.rank}</p>
            <p>{coin.ticker}</p>
            <p>$ {coin.usd}</p>
            <button onClick={() => coinFunc(coin)}>{action}</button>
          </div>
        ))}
    </div>
  ) : (
    defaultVal
  );

export default CoinMap;
