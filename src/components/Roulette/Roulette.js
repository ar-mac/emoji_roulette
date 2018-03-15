import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';

import DisplayEmojiWithTimer, { DisplayEmoji } from './DisplayEmoji';
import NoEmojiWithTimer, { NoEmojiMessage } from './NoEmojiMessage';
import { setupEmojis, setNewEmoji, setFirstEmoji } from '../../store/emojis/actionCreators';
import { setNewDraw } from '../../store/draws/actionCreators';
import { getSelectedEmoji, getPreviousEmojis } from '../../store/emojis/selectors';

class Roulette extends Component {
  state = {
    resetTime: 2,
  };

  componentDidMount() {
    this.props.setupEmojis();
  }

  clearIndex = () => {
    this.props.setFirstEmoji();
  };

  getRandomEmoji = () => {
    this.props.setNewDraw();
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
          (selectedEmoji.notFound)
            ? <NoEmojiWithTimer
              key={selectedEmoji.id}
              id={selectedEmoji.id}
              resetTime={resetTime}
              resetHandler={this.getRandomEmoji}
            />
            : <DisplayEmojiWithTimer
              key={selectedEmoji.id}
              emoji={selectedEmoji}
              clearIndex={this.clearIndex}
              resetTime={resetTime}
              resetHandler={this.getRandomEmoji}
            />
        }
        <hr />
        {
          previousEmojis.slice(1, 6).map((emoji, index) => {
            const key = `${index}${emoji.id}`;
            return (emoji.notFound)
              ? <NoEmojiMessage key={key} id={emoji.id} />
              : <DisplayEmoji key={key} emoji={emoji} />;
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
  setNewDraw: PropTypes.func.isRequired,
  setFirstEmoji: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedEmoji: getSelectedEmoji(state),
  previousEmojis: getPreviousEmojis(state),
});

const mapDispatchToProps = {
  setupEmojis,
  setNewDraw,
  setFirstEmoji,
};

export default connect(mapStateToProps, mapDispatchToProps)(Roulette);
