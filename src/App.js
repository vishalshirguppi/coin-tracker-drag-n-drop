import React, { Component } from "react";
import "./App.css";
import AppNav from "./Components/AppNav";
import CoinList from "./Components/CoinList";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <AppNav />
        <div className="container">
          <CoinList />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
