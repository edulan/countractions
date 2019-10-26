import React, { useReducer, useEffect } from "react";

import Counter from "./Counter";
import Cycles from "./Cycles";
import Stats from "./Stats";
import { zip } from "./utils";

import "./styles.css";

const START = "START";
const STOP = "STOP";
const REMOVE = "REMOVE";
const CLEAR = "CLEAR";

function appReducer(state, action) {
  const [firstTick, ...restTicks] = state.ticks;

  switch (action.type) {
    case START:
      return {
        ...state,
        isTimerEnabled: true,
        lastTick: action.interval,
        ticks: [
          {
            count: state.count,
            start: action.interval,
            stop: null,
            elapsed: null
          },
          ...state.ticks
        ]
      };
    case STOP:
      return {
        ...state,
        count: state.count + 1,
        isTimerEnabled: false,
        lastTick: action.interval,
        ticks: [
          {
            ...firstTick,
            stop: action.interval,
            elapsed: action.interval - firstTick.start
          },
          ...restTicks
        ]
      };
    case REMOVE:
      return {
        ...state,
        ticks: state.ticks.filter(tick => tick.count !== action.count)
      };
    case CLEAR:
      return {
        ...state,
        ticks: []
      };
    default:
      throw new Error("Action not supported");
  }
}

function retrieveTicks(defaultValue) {
  const serializedTicks = window.localStorage.getItem("ticks");

  if (!serializedTicks) {
    return defaultValue;
  }

  return JSON.parse(serializedTicks);
}

function saveTicks(ticks) {
  const serializedTicks = JSON.stringify(ticks);

  window.localStorage.setItem("ticks", serializedTicks);
}

const initialAppState = {
  count: 0,
  isTimerEnabled: false,
  lastTick: 0,
  ticks: retrieveTicks([])
};

function App() {
  const [state, dispatch] = useReducer(appReducer, initialAppState);
  const { isTimerEnabled, lastTick, ticks } = state;

  useEffect(() => {
    saveTicks(ticks.filter(({ elapsed }) => elapsed !== null));
  }, [ticks]);

  const cycles = zip(ticks, ticks.slice(1)).map(([tick, prevTick]) => ({
    count: tick.count,
    elapsed: tick.elapsed,
    date: tick.start,
    interval: prevTick ? tick.start - prevTick.start : 0
  }));

  function onToggleTimer() {
    dispatch({
      type: !isTimerEnabled ? START : STOP,
      interval: Date.now()
    });
  }

  function onRemove(count) {
    dispatch({
      type: REMOVE,
      count
    });
  }

  function onClear() {
    if (window.confirm("Do you really want to clear all recorded data?")) {
      dispatch({
        type: CLEAR
      });
    }
  }

  return (
    <div className="App">
      <div className="CounterSection">
        <Counter isTimerEnabled={isTimerEnabled} lastTick={lastTick} />
      </div>
      <div className="CyclesSection">
        <Cycles
          cycles={cycles}
          onRemove={onRemove}
          isTimerEnabled={isTimerEnabled}
        />
      </div>
      <div className="StatsSection">
        <hr className="Separator" />
        <Stats cycles={cycles} />
      </div>
      <div className="ActionSection">
        <button
          disabled={isTimerEnabled}
          className="ActionButton"
          onClick={() => {
            onClear();
          }}
        >
          Clear
        </button>
        <button
          className="ActionButton"
          onClick={() => {
            onToggleTimer();
          }}
        >
          {isTimerEnabled ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
}

export default App;
