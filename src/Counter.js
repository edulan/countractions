import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { formatTick } from "./formatters";

function Counter({ prevTime }) {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const requestId = window.requestAnimationFrame(() => {
      setCurrentTime(Date.now());
    });

    return () => {
      window.cancelAnimationFrame(requestId);
    };
  }, [currentTime, setCurrentTime]);

  const integerDigits = formatTick(Math.max(currentTime - prevTime, 0));

  return (
    <div className="CounterContainer">
      <div className="CounterTime">
        <span className="CounterDigits">{integerDigits}</span>
        <span className="CounterUnits">s</span>
      </div>
    </div>
  );
}

Counter.propTypes = {
  prevTime: PropTypes.number
};

export default Counter;
