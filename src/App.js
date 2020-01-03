import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import Bitcoin from "./components/bitcoin.component";

class App extends Component {
  render() {
    return (

      <div className="p-3 mb-2 bg-dark text-white">
      <Router>
        

        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Crypto Trading To-Do/API Call</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <span class="navbar-text">
                  <Link to="/" className="nav-link">Bitcoin Price</Link>
                </span>
              </ul>
            </div>
          </nav>
        </div>
        <br />
        
        <Route path="/" component = {Bitcoin} />
      </Router>
      </div>
    );
  }
}

export default App;
