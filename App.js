import React, { Component } from "react";
import SearchAppBar from "./fendComponents/AppBar";
import { BrowserRouter, Link } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <SearchAppBar />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
