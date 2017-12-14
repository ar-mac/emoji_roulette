import React from 'react';
import {withBackend} from '../withBackend';
import {RegisterForm} from "../RegisterForm";

describe('withBackend', () => {
  const hocComponent = withBackend(RegisterForm);

  const defaultProps = {
    handleSubmit: () => {}
  };
  const setup = buildSetup(hocComponent, defaultProps);

  test('renders', () => {
    const { wrapper } = setup();
    expect(wrapper.instance()).toMatchSnapshot();
  });

  test('triggers handleSubmit with true on successful validation', () => {
    const { wrapper } = setup({
      handleSubmit: jest.fn(),
    });

    return wrapper.instance().handleSubmitByBackend({
      username: 'some user',
    }).then(() => {
      expect(wrapper.instance().props.handleSubmit).toHaveBeenCalledWith(true);
    })
  });
});
