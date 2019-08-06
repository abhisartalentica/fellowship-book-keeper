import React, { Component } from "react";
import { render } from "react-dom";
import SignIn from "./SignIn";
import Admin from "./admin";
import "./style.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getCookie } from "./util";

class App extends Component {
  constructor() {
    super();
    this.state = {
      accessToken: ""
    };
  }

  componentDidMount() {
    this.setState({ accessToken: getCookie("accessToken") }, () => {
      if (!this.state.accessToken && window.location.pathname !== "/") {
        window.location.replace(window.location.origin);
      }
    });
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={SignIn} exact />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Router>
    );
  }
}

render(<App />, document.getElementById("root"));
