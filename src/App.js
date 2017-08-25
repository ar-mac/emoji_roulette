import React, { Component } from 'react';
import twemoji from 'twemoji'

import { Emojis } from './assets/emojis.js';
import './App.css';

class App extends Component {
  state = {
    index: 0,
  };

  getRandomEmoji = () => {
    this.setState({
      index: Math.floor(Math.random() * 200)
    });
  };

  displayEmoji() {
    const selectedEmoji = Emojis[this.state.index];
    const twemojiMarkup = {
      __html: twemoji.parse(selectedEmoji.emoji)
    };

    return (
      <div className="test">
        <div>emoji: {selectedEmoji.emoji}</div>
        <div>codepoint: {selectedEmoji.codepoint}</div>
        <div>parsed codepoint: {String.fromCodePoint(selectedEmoji.codepoint)}</div>
        <div>twemoji: <div dangerouslySetInnerHTML={twemojiMarkup}/></div>
        <div>index: {this.state.index}</div>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <h2>Welcome to Emoji Routlette</h2>
        <button onClick={this.getRandomEmoji}>Get new emoji</button>
        {
          (this.state.index < Emojis.length)
            ? this.displayEmoji()
            : <div>No emoji for index: {this.state.index}</div>
        }
      </div>
    );
  }
}

export default App;
