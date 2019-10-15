import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Stats from "./Stats";
import Cycles from "./Cycles";
import { zip } from "./utils";
import { formatTick } from "./formatters";

import "./styles.css";

function App() {
  const [ticks, setTicks] = useState([]);
  const [lastTick, setLastTick] = useState(0);
  const [isTimerEnabled, toggleTimerEnabled] = useState(false);
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

  const startTicks = ticks.filter(({ type }) => type === "START");
  const stopTicks = ticks.filter(({ type }) => type === "STOP");
  const cycleTicks = zip(startTicks, stopTicks).map(
    ([startTick, stopTick]) => ({
      start: performance.timing.navigationStart + startTick.interval,
      stop: stopTick
        ? performance.timing.navigationStart + stopTick.interval
        : null,
      elapsed: stopTick ? stopTick.interval - startTick.interval : null
    })
  );
  const finalTicks = zip(cycleTicks, cycleTicks.slice(1)).map(
    ([prevTick, tick]) => {
      return {
        elapsed: prevTick.elapsed,
        date: prevTick.start,
        interval: tick ? tick.start - prevTick.start : null
      };
    }
  );

  function onClick() {
    const now = performance.now();

    if (!isTimerEnabled) {
      setLastTick(now);
      setCurrentTime(now);
    }

    setTicks([
      ...ticks,
      {
        type: !isTimerEnabled ? "START" : "STOP",
        interval: now
      }
    ]);

    toggleTimerEnabled(!isTimerEnabled);
  }

  const [integerDigits, fractionDigits] = formatTick(
    currentTime - lastTick
  ).split(".");

  return (
    <div className="App">
      <div className="CounterSection">
        <div className="CounterContainer">
          <div className="CounterDigits">
            <p className="IntegerDigits">{integerDigits}</p>
          </div>
          <p className="FractionDigits">{fractionDigits.padStart(2, "0")}</p>
        </div>
      </div>
      <div className="CyclesSection">
        <Cycles ticks={finalTicks} />
      </div>
      <div className="StatsSection">
        <hr className="Separator" />
        <Stats ticks={finalTicks} />
      </div>
      <div className="ActionSection">
        <button className="StartStopButton" onClick={onClick}>
          {isTimerEnabled ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
