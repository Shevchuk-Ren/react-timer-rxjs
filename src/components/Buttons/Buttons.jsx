import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Buttons = ({ status, onStart, onStop, onReset, onWait }) => {
  const startId = useRef(uuidv4());
  const stopId = useRef(uuidv4());
  const resetId = useRef(uuidv4());
  const waitId = useRef(uuidv4());

  return (
    <ul>
      {!status ? (
        <li key="0">
          <button type="button" onClick={onStart}>
            Start
          </button>
        </li>
      ) : (
        <li key="1">
          <button type="button" onClick={onStop}>
            Stop
          </button>
        </li>
      )}

      <li key="3">
        <button type="button" onClick={onReset}>
          Reset
        </button>
      </li>
      <li key="4">
        <button type="button" onClick={onWait}>
          Wait
        </button>
      </li>
    </ul>
  );
};

Buttons.propTypes = {
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onWait: PropTypes.func.isRequired,
  status: PropTypes.bool.isRequired,
};

export default Buttons;
