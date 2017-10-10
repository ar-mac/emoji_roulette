import React, { Component } from 'react';
import PropTypes from 'proptypes';

export const withBackend = (WrappedComponent) => {
  class WithBackend extends Component {
    handleSubmitByBackend = (formData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const errors = this.validateByBackend(formData);

          if (errors) {
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
      //  backend validations go here
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
