import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';

import { login, logout } from '../../store/registration/actionCreators';

const usernames = ['user', 'user1', 'Bob', 'Me'];

export const withBackend = (WrappedComponent) => {
  class WithBackend extends Component {
    handleSubmitByBackend = (formData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const errors = this.validateByBackend(formData);
          console.log('Dispatched logout', errors);                     
          if (isEmpty(errors)) {
            resolve();
            this.props.login();
          } else {
            reject(errors);
            this.props.logout();
          }
        }, 200);
      })
    };

    validateByBackend = (formData) => {
      const errors = {};
      if (!formData.username) {
        errors.username = 'Is required';
      }
      if (formData.username && usernames.includes(formData.username)) {
        errors.username = 'Is already taken';
      }

      return errors
    };

    render() {
      return <WrappedComponent handleSubmit={this.handleSubmitByBackend} />
    }
  }

  WithBackend.displayName = `withBackend(${WrappedComponent.displayName || 'Component'})`;

  WithBackend.propTypes = {
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  const mapDispatchToProps = { login, logout };
  return connect(null, mapDispatchToProps)(WithBackend);
};
