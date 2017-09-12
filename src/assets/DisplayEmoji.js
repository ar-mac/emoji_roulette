import React from 'react';
import twemoji from 'twemoji'
import PropTypes from 'proptypes';

import { Emojis } from './emojis.js';

class DisplayEmoji extends React.Component {
  state = {
    secondsPassed: 0,
  };
  componentDidMount = () => {
   this.intervalId =  setInterval(() => this.setState({secondsPassed: this.state.secondsPassed+1}), 1000)
  }
  componentWillUnmount = () => {
    clearInterval(this.intervalId)
  }
  render (){
    const { index, resetFn } = this.props;

    const selectedEmoji = Emojis[index];
    const twemojiMarkup = {
      __html: twemoji.parse(selectedEmoji.emoji)
    };

    return (
      <div className="test">
        <div>emoji: {selectedEmoji.emoji}</div>
        <div>codepoint: {selectedEmoji.codepoint}</div>
        <div>parsed codepoint: {String.fromCodePoint(selectedEmoji.codepoint)}</div>
        <div>Seconds Passed: {this.state.secondsPassed}</div>
        <div>twemoji: <div dangerouslySetInnerHTML={twemojiMarkup}/></div>
        <div>index: {index}</div>
        <button onClick={resetFn}>Reset index</button>

      </div>

    )
  }

};

DisplayEmoji.propTypes = {
  index: PropTypes.number.isRequired,
};

export default DisplayEmoji
