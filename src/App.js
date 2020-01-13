import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import BitcoinImage from "./images/Bitcoin-logo.jpg"

import Bitcoin from "./components/bitcoin.component";
import PriceTable from "./components/pricetable.component";
import PastPredictions from "./components/pastpredictions.component";

class App extends Component {
  render() {
    return (

      <Router>
        

        <div className="container-1">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="bitcointrends.com">
          <img src={BitcoinImage} width="30" height="30" alt=""></img>
          </a>
          <Link to="/" className="navbar-brand">Bitcoin Trends</Link>
          <Link to="/pricetable" className="navbar-brand">Bitcoin Price Chart</Link>
          <Link to="/pastpredictions" className="navbar-brand">Past Predictions</Link>

          </nav>
        </div>

        <Switch>
          <Route path="/pricetable">
            <PriceTable />
          </Route>
          <Route path="/pastpredictions">
            <PastPredictions />
          </Route>
          <Route path="/">
            <Bitcoin />
          </Route>
        </Switch>
        
        {/* <Route path="/" component = {Bitcoin} /> */}
        {/* <Route path="/" component= {PriceTable} /> */}

        
      </Router>
    );
  }
}

export default App;
