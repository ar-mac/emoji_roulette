import React, { Component } from 'react';

import DisplayEmoji from './assets/DisplayEmoji';
import { Emojis } from './assets/emojis.js';
import './App.css';

class App extends Component {
  state = {
    index: 0,
    previousEmojis: [Emojis[0]],
    resetTime: 2,
  };

  clearIndex = () => {
    this.setState({ index: 0 });
  };

  getRandomEmoji = () => {
    const index = Math.floor(Math.random() * 100);
    this.setState({
      index,
      previousEmojis: [Emojis[index], ...this.state.previousEmojis].slice(0, 9)
    });
  };

  handleChange = ({target: { value: resetTime}}) => {
    if (isNaN(resetTime)) { return }

    this.setState({ resetTime: +resetTime });
  };

  render() {
    return (
      <div className="App">
        <h2>Welcome to Emoji Routlette</h2>
        <button onClick={this.getRandomEmoji}>Get new emoji</button>
        <div><input type="text" onChange={this.handleChange} defaultValue={this.state.resetTime} /></div>
        {
          (this.state.index < Emojis.length)
            ? <DisplayEmoji
              key={this.state.index}
              index={this.state.index}
              resetTime={this.state.resetTime}
              resetFn={this.resetIndex}
              getNewEmoji={this.getRandomEmoji}
            />
            : <div>No emoji for index: {this.state.index}</div>
        }
        <hr />
        {
          this.state.previousEmojis.slice(1, 6).map((emojiObj = {}, index) => (
            <div key={index}>{emojiObj.codepoint}</div>
          ))
        }
      </div>
    );
  }
}

export default App;
