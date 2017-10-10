import React, { Component } from 'react';

import Roulette from './components/Roulette/Roulette';
import RegisterForm from './components/RegisterForm/RegisterForm';
import './App.css';

class App extends Component {
  state = {
    isRegistered: false,
  };

  setRegistrationStatus = (isRegistered) => {
    this.setState({ isRegistered })
  };

  render() {
    const { isRegistered } = this.state;
    return (
      <div className="App">
        <h2>Welcome to Emoji Routlette</h2>
        {
          isRegistered
            ? <Roulette />
            : <RegisterForm handleSubmit={this.setRegistrationStatus} />
        }
      </div>
    );
  }
}

export default App;
