import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { isEmpty } from 'lodash';

const usernames = ['user', 'user1', 'Bob', 'Me'];

export const withBackend = (WrappedComponent) => {
  class WithBackend extends Component {
    handleSubmitByBackend = (formData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const errors = this.validateByBackend(formData);

          if (isEmpty(errors)) {
            resolve();
            this.props.handleSubmit(true);
          } else {
            reject(errors);
            this.props.handleSubmit(false);
          }
        }, 2000);
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
    handleSubmit: PropTypes.func.isRequired,
  };

  return WithBackend;
};
