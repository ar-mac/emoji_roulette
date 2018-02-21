import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Roulette from './components/Roulette/Roulette';
import RegisterForm from './components/RegisterForm/RegisterForm';
import './App.css';
import { getRegistrationStatus } from './store/registration/selectors';

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
  isRegistered: getRegistrationStatus(state),
});

export default connect(mapStateToProps)(App);
