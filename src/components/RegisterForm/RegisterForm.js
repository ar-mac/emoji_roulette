import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { get, set, find, cloneDeep } from 'lodash';
import cn from 'classnames';
import yup from 'yup';

import { withBackend } from "./withBackend";
import { AddressFields } from "./AddressFields";

const cities = [
  { city: 'Sosnowiec', zipCode: '00-000' },
  { city: 'Bielsko-Biała', zipCode: '43-300' },
  { city: 'Cieszyn', zipCode: '43-430' },
  { city: 'Czarnobyl', zipCode: '66-666' },
  { city: 'Berlin', zipCode: '30-821' },
  { city: 'Praga', zipCode: '04-022' },
  { city: 'Zylin', zipCode: '82-742' },
];

export class RegisterForm extends Component {
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

  schema = yup.object().shape({
    age: yup.string().required(),
    username: yup.string().required().min(3).max(50),
    email: yup.string().email(),
    addresses: yup.array().of(yup.object().shape({
      city: yup.string(),
      zipCode: yup.string(),
    }))
  });

  submit = (event) => {
    event.preventDefault();

    const { data } = this.state;
    this.schema.validate(data)
      .then(isValid => {
        if (isValid) {
          this.setState({ isSending: true });
          this.props.handleSubmit(data).catch(errors => this.setState({ errors }));
        }
      })
      .catch(errors => this.setState({ errors }))
  };

  handleChange = ({ target }) => {
    this.setState((currentState) => {
      const newData = cloneDeep(currentState.data);
      set(newData, target.name, target.value);
      return { data: newData };
    });
  };

  removeAddress = (index) => () => {
    const { data } = this.state;

    const newData = {
      ...data,
      addresses: [
        ...data.addresses.slice(0, index),
        ...data.addresses.slice(index + 1),
      ]
    };

    this.setState({ data: newData });
  };

  addAddress = () => {
    const { data } = this.state;

    const newData = {
      ...data,
      addresses: [
        ...data.addresses,
        { city: '', zipCode: '' },
      ]
    };

    this.setState({ data: newData });
  };

  handleCityChange = (index) => (event) => {
    this.handleChange(event);

    const city = find(cities, { city: event.target.value });
    if (city) {
      this.handleChange({ target: { value: city.zipCode, name: `addresses[${index}].zipCode` } })
    }
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
              id="age"
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
              id="username"
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
              id="email"
              placeholder="Provide your email"
              value={data.email}
              onChange={this.handleChange}
            />
            {get(errors, 'email') &&
            <span className="help-block">{errors.email}</span>
            }
          </div>
          {data.addresses.map((address, index) => (
            <AddressFields
              key={index}
              address={address}
              index={index}
              errors={errors}
              removeAddress={this.removeAddress(index)}
              handleCityChange={this.handleCityChange(index)}
              handleChange={this.handleChange}
            />
          ))}
          <div>
            <button onClick={this.addAddress}>Add new address</button>
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

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default withBackend(RegisterForm);
