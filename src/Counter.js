import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { formatTick } from "./formatters";

function Counter({ isTimerEnabled, lastTick }) {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!isTimerEnabled) {
      setCurrentTime(0);
      return;
    }

    const requestId = window.requestAnimationFrame(() => {
      setCurrentTime(performance.now());
    });

    return () => {
      window.cancelAnimationFrame(requestId);
    };
  }, [isTimerEnabled, currentTime, setCurrentTime]);

  const [integerDigits, fractionDigits] = formatTick(
    Math.max(currentTime - lastTick, 0)
  ).split(".");

  return (
    <div className="CounterContainer">
      <div className="CounterDigits">
        <p className="IntegerDigits">{integerDigits}</p>
      </div>
      <p className="FractionDigits">{fractionDigits.padStart(2, "0")}</p>
    </div>
  );
}

Counter.propTypes = {
  isTimerEnabled: PropTypes.bool,
  lastTick: PropTypes.number
};

export default Counter;
