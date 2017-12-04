import React from 'react';
import App from '../App';

describe('<App />', () => {
  const defaultProps = {};

  const setup = buildSetup(App, defaultProps, { lifecycleExperimental: true });

  test('renders', () => {
    expect(setup().wrapper.instance()).toMatchSnapshot();
  });

  test('renders roulette component when isRegistered', () => {
    const { wrapper } = setup();
    wrapper.setState({ isRegistered: true });
    expect(wrapper.instance()).toMatchSnapshot();
  });

  test('setRegistrationStatus sets isRegistered state to provided value', () => {
    const { wrapper } = setup();
    wrapper.instance().setRegistrationStatus(true);
    expect(wrapper.state('isRegistered')).toEqual(true);
  });
});
