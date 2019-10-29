import React, { useReducer, useState, useEffect } from "react";

import Counter from "./Counter";
import Cycles from "./Cycles";
import Stats from "./Stats";
import { zip } from "./utils";

import "./styles.css";

const START = "START";
const STOP = "STOP";
const REMOVE = "REMOVE";

const STATS_SCREEN = "STATS_SCREEN";
const COUNTER_SCREEN = "COUNTER_SCREEN";
const HISTORY_SCREEN = "HISTORY_SCREEN";

function appReducer(state, action) {
  const [firstTick, ...restTicks] = state.ticks;

  switch (action.type) {
    case START:
      return {
        ...state,
        ticks: [
          {
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
        ticks: state.ticks.filter((_, index) => index !== action.index)
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

const initialTicks = retrieveTicks([]);
const initialAppState = {
  ticks: initialTicks
};

function App() {
  const [state, dispatch] = useReducer(appReducer, initialAppState);
  const [screen, setScreen] = useState(STATS_SCREEN);
  const { ticks } = state;

  useEffect(() => {
    saveTicks(ticks.filter(({ elapsed }) => elapsed !== null));
  }, [ticks]);

  const cycles = zip(ticks, ticks.slice(1)).map(([tick, prevTick]) => ({
    elapsed: tick.elapsed,
    date: tick.start,
    interval: prevTick ? tick.start - prevTick.start : 0
  }));

  function startTimer() {
    dispatch({
      type: START,
      interval: Date.now()
    });
  }

  function stopTimer() {
    dispatch({
      type: STOP,
      interval: Date.now()
    });
  }

  function removeTick(index) {
    dispatch({
      type: REMOVE,
      index
    });
  }

  return (
    <div className="App">
      <div className="AppContainer">
        {screen !== COUNTER_SCREEN && (
          <div className="NavigationSection">
            <div className="NavigationItem">
              <button
                onClick={() => setScreen(STATS_SCREEN)}
                className={`NavigationButton ${
                  screen === STATS_SCREEN ? "NavigationButtonActive" : ""
                }`}
              >
                Stats
              </button>
            </div>
            <div className="NavigationItem">
              <button
                onClick={() => setScreen(HISTORY_SCREEN)}
                className={`NavigationButton ${
                  screen === HISTORY_SCREEN ? "NavigationButtonActive" : ""
                }`}
              >
                History
              </button>
            </div>
          </div>
        )}
        {screen === STATS_SCREEN && (
          <div className="ContentSection">
            <Stats cycles={cycles} />
            <div className="ActionSection">
              <button
                className="ActionButton"
                onClick={() => {
                  startTimer();
                  setScreen(COUNTER_SCREEN);
                }}
              >
                Start
              </button>
            </div>
          </div>
        )}
        {screen === COUNTER_SCREEN && (
          <div className="ContentSection">
            <Counter prevTime={Date.now()} />
            <div className="ActionSection">
              <button
                className="ActionButton"
                onClick={() => {
                  stopTimer();
                  setScreen(STATS_SCREEN);
                }}
              >
                Stop
              </button>
            </div>
          </div>
        )}
        {screen === HISTORY_SCREEN && (
          <div className="ContentSection">
            <Cycles cycles={cycles} onRemove={removeTick} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
