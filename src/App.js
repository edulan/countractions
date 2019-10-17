import React, { useReducer } from "react";

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
            start: performance.timing.navigationStart + action.interval,
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
        ticks: [
          {
            ...firstTick,
            stop: performance.timing.navigationStart + action.interval,
            elapsed:
              performance.timing.navigationStart +
              action.interval -
              firstTick.start
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

const initialAppState = {
  count: 0,
  isTimerEnabled: false,
  lastTick: 0,
  ticks: []
};

function App() {
  const [state, dispatch] = useReducer(appReducer, initialAppState);
  const { isTimerEnabled, lastTick, ticks } = state;

  const finalTicks = zip(ticks, ticks.slice(1)).map(([tick, prevTick]) => ({
    count: tick.count,
    elapsed: tick.elapsed,
    date: tick.start,
    interval: prevTick ? tick.start - prevTick.start : null
  }));

  function onToggleTimer() {
    dispatch({
      type: !isTimerEnabled ? START : STOP,
      interval: performance.now()
    });
  }

  function onRemove(count) {
    dispatch({
      type: REMOVE,
      count
    });
  }

  function onClear() {
    dispatch({
      type: CLEAR
    });
  }

  return (
    <div className="App">
      <div className="CounterSection">
        <Counter isTimerEnabled={isTimerEnabled} lastTick={lastTick} />
      </div>
      <div className="CyclesSection">
        <Cycles ticks={finalTicks} onRemove={onRemove} />
      </div>
      <div className="StatsSection">
        <hr className="Separator" />
        <Stats ticks={finalTicks} />
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
