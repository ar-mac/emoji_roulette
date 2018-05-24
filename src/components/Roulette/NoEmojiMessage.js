import React from 'react';
import PropTypes from 'proptypes';

import { withTimer } from './withTimer';

export const NoEmojiMessage = ({draw, secondsPassed}) => (
  <div className="emoji-card">
    <div className="emoji-card__head">
      {secondsPassed >= 0 && <div>secondsPassed: {secondsPassed}</div>}
    </div>
    <div className="emoji-card__body">
      <div>Draw id: {draw.id}</div>
      <div>joke: {draw.joke.value}</div>
      <hr />
      <div>No reaction for drawn joke 😐</div>
    </div>
  </div>
);

NoEmojiMessage.propTypes = {
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
  ,
  secondsPassed: PropTypes.number,
};

export default withTimer(NoEmojiMessage);

