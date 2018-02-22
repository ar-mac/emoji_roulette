import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';
import Roulette from './components/Roulette/Roulette';
import RegisterForm from './components/RegisterForm/RegisterForm';
import './App.css';
import { getRegistrationStatus } from './store/registration/selectors';
import { logout } from './store/registration/actionCreators';


class App extends PureComponent {
  render() {
    const { isRegistered } = this.props;
    return (
      <div className="App container">
        <h2>Welcome to Emoji Routlette</h2>
        {
          isRegistered && 
          <div className="logout">
            <button onClick={this.props.logout}>Logout</button>
          </div>
        }
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

App.propTypes = {
  logout: PropTypes.func.isRequired,
  isRegistered: PropTypes.bool.isRequired
};

const mapDispatchToProps = { logout };
export default connect(mapStateToProps, mapDispatchToProps)(App);
