import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';

import DisplayEmojiWithTimer, { DisplayEmoji } from './DisplayEmoji';
import NoEmojiWithTimer, { NoEmojiMessage } from './NoEmojiMessage';
import { setupEmojis, setNewEmoji } from '../../store/emojis/actionCreators';
import { getSelectedEmoji, getPreviousEmojis } from '../../store/emojis/selectors';

class Roulette extends Component {
  state = {
    previousEmojis: [0],
    resetTime: 2,
  };

  componentDidMount() {
    this.props.setupEmojis();
  }

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
    const { selectedEmoji, previousEmojis } = this.props;
    const { resetTime } = this.state;

    return (
      <div className="Roulette">
        <button onClick={this.getRandomEmoji}>Get new emoji</button>
        <div><input type="text" onChange={this.handleChange} defaultValue={resetTime} /></div>
        {
          (selectedEmoji.emoji)
            ? <DisplayEmojiWithTimer
              key={selectedEmoji.codepoint}
              emoji={selectedEmoji}
              clearIndex={this.clearIndex}
              resetTime={resetTime}
              resetHandler={this.getRandomEmoji}
            />
            : <NoEmojiWithTimer
              key={selectedEmoji.codepoint}
              codepoint={selectedEmoji.codepoint}
              resetTime={resetTime}
              resetHandler={this.getRandomEmoji}
            />
        }
        <hr />
        {
          previousEmojis.slice(1, 6).map((emoji) => {
            return (emoji.emoji)
              ? <DisplayEmoji
                key={emoji.codepoint}
                emoji={emoji}
              />
              : <NoEmojiMessage key={emoji.codepoint} codepoint={emoji.codepoint} />;
          })
        }
      </div>
    );
  }
}

Roulette.propTypes = {
  selectedEmoji: PropTypes.object.isRequired,
  previousEmojis: PropTypes.array.isRequired,
  setupEmojis: PropTypes.func.isRequired,
  setNewEmoji: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedEmoji: getSelectedEmoji(state),
  previousEmojis: getPreviousEmojis(state),
});

const mapDispatchToProps = {
  setupEmojis,
  setNewEmoji,
};

export default connect(mapStateToProps, mapDispatchToProps)(Roulette);
