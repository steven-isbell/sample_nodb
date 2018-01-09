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
      coins: {},
      landing: true,
      tracker: false,
      coinContainer: false
    };
  }

  componentDidMount() {
    axios.get("/api/get").then(response => {
      this.setState({ coins: response.data[0] });
    });
  }
  render() {
    const { coins, landing, tracker, coinContainer } = this.state;
    return (
      <div className="App">
        <Header />
        {landing && <LandingPage />}
        {tracker && <Tracker />}
        {coinContainer && <CoinContainer />}
      </div>
    );
  }
}

export default App;
