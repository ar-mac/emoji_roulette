import React from 'react';
import {DisplayEmoji} from '../DisplayEmoji';

jest.mock('twemoji', () => ({
  parse: (icon) => `some mocked string ${icon}`,
}));

describe('<DisplayEmoji />', () => {
  const defaultProps = {
    index: 0,
    clearIndex: () => {},
    secondsPassed: 0,
    emoji: { codepoint: 0x1F600, emojiIcon: '😀' },
  };

  const setup = buildSetup(DisplayEmoji, defaultProps);

  test('renders with default props', () => {
    const { wrapper } = setup();
    expect(wrapper.instance()).toMatchSnapshot();
  });

  test('renders with invalid prop', () => {
    const { wrapper } = setup({
      secondsPassed: undefined,
    });
    expect(wrapper.instance()).toMatchSnapshot();
  });
  
  test('renders without clearIndex', () => {
    const { wrapper } = setup({clearIndex: undefined });
    expect(wrapper.instance()).toMatchSnapshot();

  });
  
  test('triggers function when click clearIndex button', () => {
    const { wrapper } = setup({clearIndex: jest.fn()});
    wrapper.find('button').simulate('click');
    expect(wrapper.instance().props.clearIndex).toHaveBeenCalled();
  });
  
});


