import React from 'react';

import { RegisterForm } from '../RegisterForm';

describe('RegisterForm', () => {
  const defaultProps = {
    handleSubmit: jest.fn(),
  };

  const setup = buildSetup(RegisterForm, defaultProps);

  test('renders with default props', () => {
    expect(setup().wrapper).toMatchSnapshot();
  });

  test('renders whole state correctly', () => {
    const { wrapper } = setup();
    const state = {
      data: {
        age: '45',
        username: 'user1',
        email: 'some failing',
        addresses: [
          { city: 'city1', zipCode: '01-001' },
          { city: 'city2', zipCode: '07-007' },
        ],
      },
      errors: {
        email: 'is not correct',
      },
      isSending: false,
    };

    wrapper.setState(state);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders multiple addresses', () => {
    const { wrapper } = setup();
    const addresses = [
      { city: 'city1', zipCode: '01-001' },
      { city: 'city2', zipCode: '07-007' },
    ];
    const initialState = wrapper.state();
    initialState.data.addresses = addresses;
    wrapper.setState(initialState);
    expect(wrapper).toMatchSnapshot();
  });
});
