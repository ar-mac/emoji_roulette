import React, { Component } from 'react';
import PropTypes from 'proptypes';

export const withTimer = (WrappedComponent) => {
  class WithTimer extends Component {
    state = {
      secondsPassed: 0,
    };

    componentDidMount() {
      this.startTimer()
    }

    componentDidUpdate() {
      if (this.state.secondsPassed === this.props.resetTime) {
        this.props.resetHandler();
      }
    }

    componentWillUnmount() {
      this.stopTimer()
    }

    stopTimer = () => clearInterval(this.intervalId);

    startTimer = () => this.intervalId = setInterval(() => {
      this.setState({ secondsPassed: this.state.secondsPassed + 1 })
    }, 1000);

    render() {
      const { resetTime, resetHandler, ...subProps } = this.props;

      return <WrappedComponent
        {...subProps}
        secondsPassed={this.state.secondsPassed}
        stopTimer={this.stopTimer}
        startTimer={this.startTimer}
      />
    }
  }

  WithTimer.propTypes = {
    resetTime: PropTypes.number.isRequired,
    resetHandler: PropTypes.func.isRequired,
  };

  return WithTimer;
};
