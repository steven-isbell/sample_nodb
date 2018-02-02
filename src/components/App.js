// Make sure to add your proxy in your package.json to
// to forward all your requests from your dev server to your node server

// you can also delete the logo.svg because we're not using it.
// it's good practice to remove extraneous files and
// packages if you're not using them to help save on space and memory.

import React, { Component } from "react";
import axios from "axios";
import Header from "./Header/Header";
import CoinContainer from "./CoinContainer/CoinContainer";
import LandingPage from "./LandingPage/LandingPage";
import Tracker from "./Tracker/Tracker";

// Here the app is the brains of our application.
// We're passing most of the data and methods as props to the components that need them.
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
  }

  componentDidMount() {
    // request our initial data
    // set data to state
    // head is tracking the first item in the response...
    // so we know that there's nothing past it when we try to page backward
    axios
      .get("/api/get")
      .then(response =>
        this.setState({ crypto: response.data, head: response.data[0] })
      )
      .catch(err => alert(err));
  }
  handleViewChange(val) {
    // mimicking routing
    // called conditional rendering.
    // if we're already on the 'route' then do nothing, just return
    if (this.state[val]) return;
    // show and hide components based on boolean
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
    // Check the length of the array. If it's a partial array, we're out of data.
    if (crypto.length < 25 && val === "next") return;
    // request next or previous page of data from server
    axios
      .get(`/api/paginatecoins?paginate=${val}`)
      .then(response => {
        if (response.data.length > 0) this.setState({ crypto: response.data });
        else alert("No more coins!");
      })
      .catch(err => alert(err));
  }
  editTitle() {
    // flip the boolean of edit to either true or false.
    // this is useful when needing to click buttons or just flop booleans.
    // It says change it to the opposite of what's on state currently.
    this.setState({ edit: !this.state.edit });
  }
  updateTitle(event) {
    // this was to have a put request
    // this would be better to do on the client with state instead of hitting the server over and over.
    axios
      .put(`/api/put?title=${event.target.value}`)
      .then(response => this.setState({ title: response.data }))
      .catch(err => alert(err));
  }
  render() {
    // render our content
    // Destructure our values off state.
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
      updateTitle: this.updateTitle
    };

    const changeView = event =>
      this.handleViewChange(event.target.innerText.toLowerCase());

    return (
      <div className="App">
        {/* Header will show all the time */}
        <Header viewChange={changeView} />
        {/* use booleans to show or hide elements */}
        {home && <LandingPage />}
        {/* If you haven't already, check out Object Rest Spread to
            understand what's happing with the ..props. on the CoinMap Component
            https://github.com/tc39/proposal-object-rest-spread
        */}
        {tracker && <Tracker {...trackProps} />}
        {/* Use object rest spread (similar to array spread) to pass props to Coin Container */}
        {coins && <CoinContainer {...ccProps} />}
      </div>
    );
  }
}

export default App;
