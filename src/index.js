import React, { Component } from "react";
import { render } from "react-dom";
import SignIn from "./SignIn";
import Home from "./Home";
import "./style.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={SignIn} exact />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    );
  }
}

render(<App />, document.getElementById("root"));
