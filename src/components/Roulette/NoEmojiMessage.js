import React from 'react';
import PropTypes from 'proptypes';

import { withTimer } from './withTimer';

export const NoEmojiMessage = ({id, secondsPassed}) => (
  <div className="emoji-card">
    <div className="emoji-card__head">
      {secondsPassed >= 0 && <div>secondsPassed: {secondsPassed}</div>}
    </div>
    <div className="emoji-card__body">
      <div>No emoji for id: {id}</div>
    </div>
  </div>
);

NoEmojiMessage.propTypes = {
  id: PropTypes.number.isRequired,
  secondsPassed: PropTypes.number,
};

export default withTimer(NoEmojiMessage);

