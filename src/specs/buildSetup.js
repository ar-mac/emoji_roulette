import React from 'react';
import { shallow } from 'enzyme';

global.buildSetup = (TestComponent, defaultProps, shallowOptions) => (overrideProps, overrideOptions = {}) => {
  const props = {
    ...defaultProps,
    ...overrideProps,
  };

  const options = {
    ...shallowOptions,
    ...overrideOptions,
  };

  const wrapper = shallow(<TestComponent {...props} />, options);

  return { props, wrapper };
};
