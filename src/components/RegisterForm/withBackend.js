import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { isEmpty } from 'lodash';

const userNames = ['user', 'user1', 'Bob', 'Me'];

export const withBackend = (WrappedComponent) => {
  class WithBackend extends Component {
    handleSubmitByBackend = (formData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const errors = this.validateByBackend(formData);

          if (isEmpty(errors)) {
            reject(errors);
            this.props.handleSubmit(false);
          } else {
            resolve();
            this.props.handleSubmit(true);
          }
        }, 2000);
      })
    };

    validateByBackend = (formData) => {
      const errors = {};
      if (!formData.userName) {
        errors.userName = 'Is required';
      }
      if (formData.userName && userNames.includes(formData.userName)) {
        errors.userName = 'Is already taken';
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
