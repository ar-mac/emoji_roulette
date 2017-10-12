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

  removeAddress = (index) => {
    const { addresses } = this.state.data;
    const newData = cloneDeep(this.state.data);
    newData.addresses = [
      ...addresses.slice(0, index),
      ...addresses.slice(index + 1),
    ];

    this.setState({ data: newData });
  };

  addAddress = () => {
    const newData = cloneDeep(this.state.data);
    newData.addresses = [
      ...newData.addresses,
      { city: '', zipCode: '' }
    ];
    this.setState({data: newData});
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
          {data.addresses.map((address, index) => (
            <div className="panel panel-default" key={index}>
              <div className="panel-heading">
                <h3 className="panel-title">address #{index + 1}</h3>
                <button onClick={() => this.removeAddress(index)}>Remove</button>
              </div>
              <div className="panel-body">
                <div className={cn('form-group', {
                  'has-error': get(errors, `addresses[${index}].city`)
                })}>
                  <label htmlFor={`addresses[${index}].city`}>city</label>
                  <select
                    className="form-control"
                    name={`addresses[${index}].city`}
                    value={address.city}
                    onChange={this.handleChange}
                  >
                    <option value=""></option>
                    <option value="Sosnowiec">Sosnowiec</option>
                    <option value="Bielsko-Biała">Bielsko-Biała</option>
                    <option value="Cieszyn">Cieszyn</option>
                    <option value="Czarnobyl">Czarnobyl</option>
                  </select>
                  {get(errors, `addresses[${index}].city`) &&
                  <span className="help-block">{errors.addresses[index].city}</span>
                  }
                </div>
                <div className={cn('form-group', {
                  'has-error': get(errors, `addresses[${index}].zipCode`)
                })}>
                  <label htmlFor={`addresses[${index}].zipCode`}>zip-code</label>
                  <input
                    type="text"
                    className="form-control"
                    name={`addresses[${index}].zipCode`}
                    placeholder="Provide your zip-code"
                    value={address.zipCode}
                    onChange={this.handleChange}
                  />
                  {get(errors, `addresses[${index}].zipCode`) &&
                  <span className="help-block">{errors.addresses[index].zipCode}</span>
                  }
                </div>
              </div>
            </div>
          ))}
          <div><button onClick={this.addAddress}>Add new address</button></div>
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
