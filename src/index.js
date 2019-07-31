import React, { Component } from 'react';
import { render } from 'react-dom';
import SignIn from './SignIn';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <SignIn name={this.state.name} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
