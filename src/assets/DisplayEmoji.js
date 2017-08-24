import React from 'react';
import twemoji from 'twemoji'
import PropTypes from 'proptypes';

import { Emojis } from './emojis.js';

const DisplayEmoji = ({ index }) => {
  const selectedEmoji = Emojis[index];
  const twemojiMarkup = {
    __html: twemoji.parse(selectedEmoji.emoji)
  };

  return (
    <div className="test">
      <div>emoji: {selectedEmoji.emoji}</div>
      <div>codepoint: {selectedEmoji.codepoint}</div>
      <div>parsed codepoint: {String.fromCodePoint(selectedEmoji.codepoint)}</div>
      <div>twemoji: <div dangerouslySetInnerHTML={twemojiMarkup}/></div>
      <div>index: {this.state.index}</div>
    </div>
  )
};

DisplayEmoji.propTypes = {
  index: PropTypes.number.isRequired,
};

export default DisplayEmoji
