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
      crypto: [],
      home: true,
      tracker: false,
      coins: false,
      head: ""
    };

    this.handleViewChange = this.handleViewChange.bind(this);
    this.paginate = this.paginate.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    // request our initial data
    // set data to state
    // head is tracking the first item in the response
    axios
      .get("/api/get")
      .then(response =>
        this.setState({ crypto: response.data, head: response.data[0] })
      )
      .catch(err => alert(err));
  }
  // mimicking routing
  // show and hide components based on boolean
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
  // get more data from server
  paginate(val) {
    const { crypto, head } = this.state;
    // if already on first page of data, don't hit server
    if (crypto[0].name === head.name && val === "previous") return;
    // request next or previous page of data from server
    axios
      .get(`/api/paginatecoins?paginate=${val}`)
      .then(response => {
        console.log(response);
        this.setState({ crypto: response.data });
      })
      .catch(err => alert(err));
  }
  // request filtered data from server
  handleSearch(term) {
    axios
      .get(`/api/search?searchTerm=${term}`)
      .then(response => this.setState({ crypto: response.data }))
      .catch(err => alert(err));
  }

  render() {
    // render our content
    const { crypto, home, tracker, coins } = this.state;
    const props = {
      coins: crypto,
      paginate: this.paginate,
      search: this.handleSearch
    };

    const changeView = event =>
      this.handleViewChange(event.target.innerText.toLowerCase());

    return (
      <div className="App">
        <Header viewChange={changeView} />
        {home && <LandingPage />}
        {tracker && <Tracker />}
        {coins && <CoinContainer {...props} />}
      </div>
    );
  }
}

export default App;
