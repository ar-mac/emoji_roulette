import React, { Component } from 'react';

import DisplayEmojiWithTimer, { DisplayEmoji } from './DisplayEmoji';
import NoEmojiWithTimer, { NoEmojiMessage } from './NoEmojiMessage';
import { Emojis } from './emojis.js';

class Roulette extends Component {
  state = {
    index: 0,
    previousEmojis: [0],
    resetTime: 0,
    emojis: Emojis,
    formData: { emoji: '', codepoint: '1235215' },
  };

  clearIndex = () => {
    this.setState({ index: 0 });
  };

  getRandomEmoji = () => {
    const index = Math.floor(Math.random() * 100);
    this.setState({
      index,
      previousEmojis: [index, ...this.state.previousEmojis].slice(0, 9)
    });
  };

  handleChange = ({ target: { value: resetTime } }) => {
    if (isNaN(resetTime)) { return }

    this.setState({ resetTime: +resetTime });
  };

  updateValue = (event) => {

  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { resetTime, index, emojis, previousEmojis, formData } = this.state;

    return (
      <div className="Roulette">
        <button onClick={this.getRandomEmoji}>Get new emoji</button>
        <div><input type="text" onChange={this.handleChange} defaultValue={resetTime} /></div>
        {
          (index < emojis.length)
            ? <DisplayEmojiWithTimer
              key={index}
              index={index}
              emoji={emojis[index]}
              clearIndex={this.clearIndex}
              resetTime={resetTime}
              resetHandler={this.getRandomEmoji}
            />
            : <NoEmojiWithTimer
              key={index}
              index={index}
              resetTime={resetTime}
              resetHandler={this.getRandomEmoji}
            />
        }
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="emoji-input">Add emoji</label>
          <input
            type="text"
            name="emoji"
            id="emoji-input"
            onChange={this.updateValue}
            value={formData.emoji}
          />
          <hr />
          <label htmlFor="point-input">Add codepoint</label>
          <input
            type="text"
            name="codepoint"
            id="point-input"
            onChange={this.updateValue}
            value={formData.codepoint}
          />
          <hr />
          <input type="submit" />
        </form>
        <hr />
        {
          previousEmojis.slice(1, 6).map((emojiIndex, index) => {
            return (emojiIndex < emojis.length)
              ? <DisplayEmoji
                key={index}
                index={emojiIndex}
                emoji={emojis[emojiIndex]}
              />
              : <NoEmojiMessage key={index} index={emojiIndex} />;
          })
        }
      </div>
    );
  }
}

export default Roulette;
