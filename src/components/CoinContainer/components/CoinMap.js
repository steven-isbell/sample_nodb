import React from "react";

const CoinMap = ({ coins }) =>
  coins.length > 0 ? (
    <div className="coin-container">
      {coins.map((coin, idx) => (
        <div className="coin" key={idx}>
          {coin.name}
        </div>
      ))}
    </div>
  ) : (
    "No Matching Coins"
  );

export default CoinMap;
