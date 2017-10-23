import React from 'react';
import App from '../App';

describe('<App />', () => {
  const defaultProps = {};

  const setup = buildSetup(App, defaultProps, { lifecycleExperimental: true });

  test('renders', () => {
    expect(setup().wrapper).toMatchSnapshot();
  });
});
