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

  test('add address after clicking button', () => {
    const { wrapper } = setup();

    const initialState = wrapper.state();
    initialState.data.addresses = [
      { city: 'city1', zipCode: '01-001' }
    ];
    wrapper.setState(initialState);

    wrapper.find('#add_address_button').simulate('click');
    expect(wrapper.state().data.addresses).toEqual([
      {
        "city": "city1",
        "zipCode": "01-001",
      },
      {
        "city": "",
        "zipCode": "",
      },
    ]);

    expect(wrapper.state().data.addresses).toMatchSnapshot();

    expect(wrapper.state().data.addresses).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ city: '' })
      ])
    );
  });

  test('update state according to event', () => {
    const { wrapper } = setup();
    const event = {
      target: { name: 'age', value: '12' },
    };
    wrapper.find('#age').simulate('change', event);
    expect(wrapper.state().data.age).toEqual('12');
  });
});
