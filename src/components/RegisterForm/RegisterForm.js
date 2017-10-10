import React, { Component } from 'react';
import PropTypes from 'proptypes';

import { withBackend } from "./withBackend";

class RegisterForm extends Component {
  state = {
    data: {},
    errors: {},
    isSending: false,
  };

  submit = (event) => {
    event.preventDefault();

    if (this.validate()) {
      this.setState({ isSending: true });
      this.props.handleSubmit(this.state.data)
        .catch(errors => this.setState({ errors }));
    }
  };

  validate = () => {
    //  validations go here
  };

  render() {
    return (
      <form onSubmit={this.submit}>
        Form goes here
        <br />
        ᕙ(◔◡◔)ᕗ
        <div><button>Submit form</button></div>
      </form>
    )
  }
}

RegisterForm.displayName = 'RegisterForm';
RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default withBackend(RegisterForm);
