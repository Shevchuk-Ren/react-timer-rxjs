import React from 'react';
import PropTypes from 'prop-types';

const Timer = ({ time }) => {
  return (
    <div>
      <div className="field">
        <span className="value" data-hours>
          {('0' + Math.floor((time / 3.6e6) % 24)).slice(-2)}:
        </span>
        <span className="label">Hours</span>
      </div>

      <div className="field">
        <span className="value" data-minutes>
          {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
        </span>
        <span className="label">Minutes</span>
      </div>

      <div className="field">
        <span className="value" data-seconds>
          {('0' + Math.floor((time / 1000) % 60)).slice(-2)}
        </span>
        <span className="label">Seconds</span>
      </div>
    </div>
  );
};

Timer.propTypes = {
  time: PropTypes.number.isRequired,
};

export default Timer;
