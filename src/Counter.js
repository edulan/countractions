import React, { useState, useEffect } from "react";

import { formatTick } from "./formatters";

function Counter({ isTimerEnabled, lastTick }) {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!isTimerEnabled) {
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
    currentTime - lastTick
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

export default Counter;
