import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { set, cloneDeep } from 'lodash';

import { withBackend } from "./withBackend";

class RegisterForm extends Component {
  state = {
    data: {
      age: '',
      username: '',
      email: '',
      addresses: [
        {city: '', zipCode: ''},
      ]
    },
    errors: {},
    isSending: false,
  };

  submit = (event) => {
    event.preventDefault();

    if (this.validate()) {
      this.setState({ isSending: true });
      this.props.handleSubmit(this.state.data).catch(errors => this.setState({ errors }));
    }
  };

  handleChange = (event) => {
    const newData = cloneDeep(this.state.data);
    set(newData, event.target.name, event.target.value);
    this.setState({data: newData});
  };

  validate = () => {
    //  validations go here
  };

  render() {
    return (
      <div className="register-form row col-md-6 col-md-offset-3">
        <form onSubmit={this.submit}>
          Form goes here
          <br />
          ᕙ(◔◡◔)ᕗ
          <div><button>Submit form</button></div>
        </form>
      </div>
    )
  }
}

RegisterForm.displayName = 'RegisterForm';
RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default withBackend(RegisterForm);
