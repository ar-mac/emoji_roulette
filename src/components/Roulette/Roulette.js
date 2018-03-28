import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';
import { get } from 'lodash';

import DisplayEmojiWithTimer, { DisplayEmoji } from './DisplayEmoji';
import NoEmojiWithTimer, { NoEmojiMessage } from './NoEmojiMessage';
import { setNewDraw } from '../../store/draws/actionCreators';
import { getSelectedDraw, getPreviousDraws } from '../../store/draws/selectors';

class Roulette extends Component {
  state = {
    resetTime: 6,
  };

  clearIndex = () => {
    this.props.setNewDraw();
  };

  handleChange = ({ target: { value: resetTime } }) => {
    if (isNaN(resetTime)) { return }

    this.setState({ resetTime: +resetTime });
  };

  render() {
    const { previousDraws, selectedDraw, setNewDraw } = this.props;
    const { resetTime } = this.state;

    return (
      <div className="Roulette">
        <button onClick={setNewDraw}>Get new joke and reaction</button>
        <div><input type="text" onChange={this.handleChange} defaultValue={resetTime} /></div>
        {
          (get(selectedDraw, 'emoji.id'))
            ? <DisplayEmojiWithTimer
              key={selectedDraw.id}
              draw={selectedDraw}
              clearIndex={this.clearIndex}
              resetTime={resetTime}
              resetHandler={setNewDraw}
            />
            : <NoEmojiWithTimer
              key={selectedDraw.id}
              draw={selectedDraw}
              resetTime={resetTime}
              resetHandler={setNewDraw}
            />
        }
        <hr />
        {
          previousDraws.slice(1, 6).map((draw, index) => {
            if (draw.notFound) return null;

            const key = `${index}${draw.id}`;
            return (get(draw, 'emoji.id'))
              ? <DisplayEmoji key={key} draw={draw} />
              : <NoEmojiMessage key={key} draw={draw} />;
          })
        }
      </div>
    );
  }
}

Roulette.propTypes = {
  previousDraws: PropTypes.array.isRequired,
  selectedDraw: PropTypes.object.isRequired,
  setNewDraw: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  previousDraws: getPreviousDraws(state),
  selectedDraw: getSelectedDraw(state),
});

const mapDispatchToProps = {
  setNewDraw,
};

export default connect(mapStateToProps, mapDispatchToProps)(Roulette);
