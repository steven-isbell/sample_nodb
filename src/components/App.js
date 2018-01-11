import React, { Component } from "react";
import axios from "axios";
import Header from "./Header/Header";
import CoinContainer from "./CoinContainer/CoinContainer";
import LandingPage from "./LandingPage/LandingPage";
import Tracker from "./Tracker/Tracker";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      crypto: {},
      home: true,
      tracker: false,
      coins: false
    };
  }

  componentDidMount() {
    axios.get("/api/get").then(response => {
      this.setState({ crypto: Object.values(response.data[0].coins) });
    });
  }
  handleViewChange(val) {
    if (this.state[val]) return;
    switch (val) {
      case "home":
        this.setState({ home: true, tracker: false, coins: false });
        break;
      case "tracker":
        this.setState({ home: false, tracker: true, coins: false });
        break;
      case "coins":
        this.setState({ home: false, tracker: false, coins: true });
        break;
      default:
        return;
    }
  }
  render() {
    const { crypto, home, tracker, coins } = this.state;
    const changeView = e =>
      this.handleViewChange(e.target.innerText.toLowerCase());
    return (
      <div className="App">
        <Header viewChange={changeView} />
        {home && <LandingPage />}
        {tracker && <Tracker />}
        {coins && <CoinContainer coins={crypto} />}
      </div>
    );
  }
}

export default App;
