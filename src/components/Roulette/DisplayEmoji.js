import React, { Component } from 'react';
import twemoji from 'twemoji'
import PropTypes from 'proptypes';

import { withTimer } from './withTimer';

export class DisplayEmoji extends Component {
  render() {
    const { secondsPassed, draw: { emoji, joke } } = this.props;
    const twemojiMarkup = {
      __html: twemoji.parse(emoji.emojiIcon)
    };

    return (
      <div className="emoji-card">
        <div className="emoji-card__head">
          {secondsPassed >= 0 && <div>secondsPassed: {secondsPassed}</div>}
        </div>
        <div className="emoji-card__body">
          <div>joke: {joke.value}</div>
          <hr />
          <div>reaction: <div dangerouslySetInnerHTML={twemojiMarkup} /></div>
        </div>
      </div>
    )
  }
}

DisplayEmoji.propTypes = {
  secondsPassed: PropTypes.number,
  draw: PropTypes.shape({
    emoji: PropTypes.shape({
      id: PropTypes.number,
      codepoint: PropTypes.number,
      emojiIcon: PropTypes.string,
    }),
    joke: PropTypes.shape({
      icon_url: PropTypes.string,
      id: PropTypes.string,
      url: PropTypes.string,
      value: PropTypes.string,
    })
  })
};

export default withTimer(DisplayEmoji);
