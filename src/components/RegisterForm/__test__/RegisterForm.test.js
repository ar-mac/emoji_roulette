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
});
