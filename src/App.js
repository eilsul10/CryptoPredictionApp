import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import BitcoinImage from "./images/Bitcoin-logo.jpg"

import Bitcoin from "./components/bitcoin.component";
import PriceTable from "./components/pricetable.component";

class App extends Component {
  render() {
    return (

      <Router>
        

        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="bitcointrends.com">
          <img src={BitcoinImage} width="30" height="30" alt=""></img>
          </a>
          <Link to="/" className="navbar-brand">Bitcoin Trends</Link>
          <Link to="/pricetable" className="navbar-brand">Bitcoin Price Chart</Link>
          </nav>
        </div>
        
        <Route path="/" component = {Bitcoin} />
        <Route path="/pricetable" component= {PriceTable} />

        
      </Router>
    );
  }
}

export default App;
