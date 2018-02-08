import React from 'react';
import PropTypes from 'proptypes';

import { withTimer } from './withTimer';

export const NoEmojiMessage = ({codepoint, secondsPassed}) => (
  <div className="emoji-card">
    <div className="emoji-card__head">
      {secondsPassed >= 0 && <div>secondsPassed: {secondsPassed}</div>}
    </div>
    <div className="emoji-card__body">
      <div>No emoji for codepoint: {codepoint}</div>
    </div>
  </div>
);

NoEmojiMessage.propTypes = {
  codepoint: PropTypes.number.isRequired,
};

export default withTimer(NoEmojiMessage);

