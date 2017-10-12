import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { get, set, cloneDeep } from 'lodash';
import cn from 'classnames';

import { withBackend } from "./withBackend";

class RegisterForm extends Component {
  state = {
    data: {
      age: '',
      username: '',
      email: '',
      addresses: [
        { city: '', zipCode: '' },
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
    this.setState({ data: newData });
  };

  validate = () => {
    //  validations go here
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div className="register-form row col-md-6 col-md-offset-3">
        <form onSubmit={this.submit}>
          <div className={cn('form-group', {
            'has-error': get(errors, 'age')
          })}>
            <label htmlFor="age">age</label>
            <input
              type="number"
              className="form-control"
              name="age"
              placeholder="Provide your age"
              value={data.age}
              onChange={this.handleChange}
            />
            {get(errors, 'age') &&
            <span className="help-block">{errors.age}</span>
            }
          </div>
          <div className={cn('form-group', {
            'has-error': get(errors, 'username')
          })}>
            <label htmlFor="username">username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Provide your username"
              value={data.username}
              onChange={this.handleChange}
            />
            {get(errors, 'username') &&
            <span className="help-block">{errors.username}</span>
            }
          </div>
          <div className={cn('form-group', {
            'has-error': get(errors, 'email')
          })}>
            <label htmlFor="email">email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Provide your email"
              value={data.email}
              onChange={this.handleChange}
            />
            {get(errors, 'email') &&
            <span className="help-block">{errors.email}</span>
            }
          </div>
          <br />
          ᕙ(◔◡◔)ᕗ
          <div>
            <button>Submit form</button>
          </div>
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
