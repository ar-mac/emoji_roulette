import React, { Component } from 'react';

import DisplayEmojiWithTimer, { DisplayEmoji } from './assets/DisplayEmoji';
import NoEmojiWithTimer, { NoEmojiMessage } from './assets/NoEmojiMessage';
import { Emojis } from './assets/emojis.js';
import './App.css';

class App extends Component {
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

  render() {
    const { resetTime, index, emojis, previousEmojis } = this.state;
    return (
      <div className="App">
        <h2>Welcome to Emoji Routlette</h2>
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

export default App;
