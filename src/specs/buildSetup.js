import React from 'react';
import { shallow } from 'enzyme';

global.buildSetup = (TestComponent, defaultProps, shallowOptions) => (overrideProps) => {
  const props = {
    ...defaultProps,
    ...overrideProps,
  };

  const wrapper = shallow(<TestComponent {...props} />, shallowOptions);

  return { props, wrapper };
};
