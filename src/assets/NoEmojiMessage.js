import React from 'react';
import PropTypes from 'proptypes';

import { withTimer } from './withTimer';

export const NoEmojiMessage = ({index, secondsPassed}) => (
  <div className="emoji-card">
    <div className="emoji-card__head">
      {secondsPassed >= 0 && <div>secondsPassed: {secondsPassed}</div>}
    </div>
    <div className="emoji-card__body">
      <div>No emoji for index: {index}</div>
    </div>
  </div>
);

NoEmojiMessage.propTypes = {
  index: PropTypes.number.isRequired,
};

export default withTimer(NoEmojiMessage);

