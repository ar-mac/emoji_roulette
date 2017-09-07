import React, { Component } from 'react';
import twemoji from 'twemoji'
import PropTypes from 'proptypes';

import { Emojis } from './emojis.js';

class DisplayEmoji extends Component {
  state = {
    secondsPassed: 0,
  };

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({ secondsPassed: this.state.secondsPassed + 1 })
    }, 1000);
  }

  componentDidUpdate() {
    if (this.state.secondsPassed === 2) {
      this.props.getNewEmoji();
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { index, resetFn } = this.props;
    const selectedEmoji = Emojis[index];
    const twemojiMarkup = {
      __html: twemoji.parse(selectedEmoji.emoji)
    };

    return (
      <div className="test">
        <div>secondsPassed: {this.state.secondsPassed}</div>
        <button onClick={resetFn}>Reset index</button>
        <div>emoji: {selectedEmoji.emoji}</div>
        <div>codepoint: {selectedEmoji.codepoint}</div>
        <div>parsed codepoint: {String.fromCodePoint(selectedEmoji.codepoint)}</div>
        <div>twemoji: <div dangerouslySetInnerHTML={twemojiMarkup}/></div>
        <div>index: {index}</div>
      </div>
    )
  }
}

DisplayEmoji.propTypes = {
  index: PropTypes.number.isRequired,
};

export default DisplayEmoji
