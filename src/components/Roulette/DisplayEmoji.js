import React, { Component } from 'react';
import twemoji from 'twemoji'
import PropTypes from 'proptypes';

import { withTimer } from './withTimer';

export class DisplayEmoji extends Component {
  render() {
    const { index, clearIndex, secondsPassed, emoji } = this.props;
    const twemojiMarkup = {
      __html: twemoji.parse(emoji.emojiIcon)
    };

    return (
      <div className="emoji-card">
        <div className="emoji-card__head">
          {secondsPassed >= 0 && <div>secondsPassed: {secondsPassed}</div>}
          {!!clearIndex && <div><button onClick={clearIndex}>Clear index</button></div>}
        </div>
        <div className="emoji-card__body">
          <div>emoji: {emoji.emojiIcon}</div>
          <div>code: {emoji.codepoint}</div>
          <div>parsed: {String.fromCodePoint(emoji.codepoint)}</div>
          <div>twemoji: <div dangerouslySetInnerHTML={twemojiMarkup}/></div>
          <div>index: {index}</div>
        </div>
      </div>
    )
  }
}

DisplayEmoji.propTypes = {
  index: PropTypes.number.isRequired,
};

export default withTimer(DisplayEmoji);
