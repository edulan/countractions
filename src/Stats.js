import React from "react";
import { formatMinutes, formatHours } from "./formatters";

const INTERVAL_SAMPLE_SIZE = 5;

function Stats({ ticks }) {
  const intervals = ticks
    .slice(0, INTERVAL_SAMPLE_SIZE)
    .map(({ interval }) => interval);
  const intervalsSum = intervals.reduce((total, value) => total + value, 0);
  const intervalsCount = intervals.length;
  const intervalsAverage = intervalsSum / intervalsCount;

  const elapseds = ticks
    .map(({ elapsed }) => elapsed)
    .filter(elapsed => elapsed !== null);
  const elapsedsSum = elapseds.reduce((total, value) => total + value, 0);
  const elapsedsCount = elapseds.length;
  const elapsedsAverage = elapsedsSum / elapsedsCount;

  const [firstTick] = ticks.slice(0);
  const [lastTick] = ticks.slice(-1);

  return (
    <>
      <div className="CycleItem">
        <div className="CycleColumn">
          <span className="CycleInterval">
            {intervalsCount > 0 && formatMinutes(intervalsAverage)}
          </span>
        </div>
        <div className="CycleColumn">
          <span className="CycleInterval">
            {elapsedsCount > 0 && formatMinutes(elapsedsAverage)}
          </span>
        </div>
        <div className="CycleColumn">
          <span className="CycleInterval">
            {firstTick &&
              lastTick &&
              formatHours(firstTick.date - lastTick.date)}
          </span>
        </div>
      </div>
    </>
  );
}

export default Stats;
