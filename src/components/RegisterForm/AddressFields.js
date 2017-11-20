import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { get } from 'lodash';

export class AddressFields extends Component {
  render() {
    const { address, index, removeAddress, handleCityChange, handleChange } = this.props;
    return (
      <div
        className="panel panel-default" key={index}
        role="group"
        aria-labelledby={`panel-title-${index}`}
      >
        <div className="panel-heading">
          <h3
            className="panel-title"
            id={`panel-title-${index}`}
          >
            address #{index + 1}
          </h3>
          <button onClick={removeAddress}>Remove</button>
        </div>
        <div className="panel-body">
          <div className={cn('form-group', {
            'has-error': get(errors, `addresses[${index}].city`)
          })}>
            <label htmlFor={`addresses[${index}].city`}>city</label>
            <select
              className="form-control"
              name={`addresses[${index}].city`}
              id={`addresses[${index}].city`}
              value={address.city}
              onChange={handleCityChange}
            >
              <option value=""></option>
              <optgroup label="Polska">
                <option value="Sosnowiec">Sosnowiec</option>
                <option value="Bielsko-Biała">Bielsko-Biała</option>
                <option value="Cieszyn">Cieszyn</option>
              </optgroup>
              <optgroup label="Europa">
                <option value="Czarnobyl">Czarnobyl</option>
                <option value="Berlin">Berlin</option>
                <option value="Praga">Praga</option>
                <option value="Zylin">Zylin</option>
              </optgroup>
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
              id={`addresses[${index}].zipCode`}
              aria-describedby="zipcode_format"
              placeholder="Provide your zip-code"
              pattern="\d{2}-\d{3}"
              value={address.zipCode}
              onChange={handleChange}
            />
            {get(errors, `addresses[${index}].zipCode`) &&
            <span className="help-block">{errors.addresses[index].zipCode}</span>
            }
            <div className="visuallyhidden" id="zipcode_format">00-000</div>
          </div>
        </div>
      </div>
    )
  }
}

AddressFields.propTypes = {
  address: PropTypes.object,
  errors: PropTypes.object,
  index: PropTypes.number,
  removeAddress: PropTypes.func,
  handleCityChange: PropTypes.func,
  handleChange: PropTypes.func,
};
