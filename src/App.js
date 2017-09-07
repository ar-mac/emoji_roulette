import React, { Component } from 'react';

import DisplayEmoji from './assets/DisplayEmoji';
import { Emojis } from './assets/emojis.js';
import './App.css';

class App extends Component {
  state = {
    index: 0,
    previousEmojis: [],
  };

  resetIndex = () => {
    this.setState({ index: 0 });
  };

  getRandomEmoji = () => {
    const index = Math.floor(Math.random() * 70);
    this.setState({
      index,
      previousEmojis: [Emojis[index], ...this.state.previousEmojis].slice(0, 6)
    });
  };

  handleChange = () => {
    console.log(`this.input.value: `, this.input.value);
  };

  render() {
    return (
      <div className="App">
        <h2>Welcome to Emoji Routlette</h2>
        <button onClick={this.getRandomEmoji}>Get new emoji</button>
        <div><input type="text" onChange={this.handleChange} ref={(node) => this.input = node} /></div>
        {
          (this.state.index < Emojis.length)
            ? <DisplayEmoji
              key={this.state.index}
              index={this.state.index}
              resetTime={this.input ? (+this.input.value || 4) : 2}
              resetFn={this.resetIndex}
              getNewEmoji={this.getRandomEmoji}
            />
            : <div>No emoji for index: {this.state.index}</div>
        }
        <hr />
        {
          this.state.previousEmojis.slice(1, 6).map((emojiObj) => (
            <div key={emojiObj.codepoint}>{emojiObj.codepoint}</div>
          ))
        }
      </div>
    );
  }
}

export default App;
