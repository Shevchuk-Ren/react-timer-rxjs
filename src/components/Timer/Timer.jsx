import React from 'react';
import PropTypes from 'prop-types';

const Timer = ({ sec, min, hours }) => {
  return (
    <div>
      <div className="field">
        <span className="value" data-hours>
          {hours}:
        </span>
        <span className="label">Hours</span>
      </div>

      <div className="field">
        <span className="value" data-minutes>
          {min}:
        </span>
        <span className="label">Minutes</span>
      </div>

      <div className="field">
        <span className="value" data-seconds>
          {sec}
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
