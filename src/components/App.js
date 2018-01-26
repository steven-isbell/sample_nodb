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
      head: "",
      edit: false,
      title: ""
    };

    this.handleViewChange = this.handleViewChange.bind(this);
    this.paginate = this.paginate.bind(this);
    this.editTitle = this.editTitle.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
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
  handleViewChange(val) {
    // mimicking routing
    // show and hide components based on boolean
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
  paginate(val) {
    // get more data from server
    const { crypto, head } = this.state;
    // if already on first page of data, don't hit server
    if (crypto[0].name === head.name && val === "previous") return;
    // request next or previous page of data from server
    axios
      .get(`/api/paginatecoins?paginate=${val}`)
      .then(response => this.setState({ crypto: response.data }))
      .catch(err => alert(err));
  }
  editTitle() {
    this.setState({ edit: true });
  }
  updateTitle(event) {
    axios
      .put(`/api/put?title=${event.target.value}`)
      .then(response => this.setState({ title: response.data }))
      .catch(err => alert(err));
  }
  finishEdit() {
    this.setState({ edit: false });
  }
  render() {
    // render our content
    const { crypto, home, tracker, coins, edit, title } = this.state;
    // make a 'props' object that has all the values we want to pass down
    const ccProps = {
      coins: crypto,
      paginate: this.paginate,
      search: this.handleSearch
    };

    const trackProps = {
      edit,
      title,
      editTitle: this.editTitle,
      updateTitle: this.updateTitle,
      finishEdit: this.finishEdit
    };

    const changeView = event =>
      this.handleViewChange(event.target.innerText.toLowerCase());

    return (
      <div className="App">
        <Header viewChange={changeView} />
        {/* use booleans to show or hide elements */}
        {home && <LandingPage />}
        {tracker && <Tracker {...trackProps} />}
        {/* User object spread to pass props to Coin Container */}
        {coins && <CoinContainer {...ccProps} />}
      </div>
    );
  }
}

export default App;
