import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Roulette from './components/Roulette/Roulette';
import RegisterForm from './components/RegisterForm/RegisterForm';
import './App.css';

class App extends PureComponent {
  render() {
    const { isRegistered } = this.props;
    return (
      <div className="App container">
        <h2>Welcome to Emoji Routlette</h2>
        {
          isRegistered
            ? <Roulette />
            : <RegisterForm />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isRegistered: state.registration.isRegistered,
});

export default connect(mapStateToProps)(App);
