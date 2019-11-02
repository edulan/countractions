import React from "react";
import PropTypes from "prop-types";
import FormattedTime from "./FormattedTime";

function calculateFrequency(cycles) {
  const timestamps = cycles
    .slice(0, -1)
    .map(({ interval }) => interval)
    .filter(interval => interval > 0);

  if (timestamps.length === 0) {
    return 0;
  }

  const sum = timestamps.reduce((total, value) => total + value, 0);
  const count = timestamps.length;
  const average = sum / count;

  return average;
}

function calculateDuration(cycles) {
  const timestamps = cycles
    .map(({ elapsed }) => elapsed)
    .filter(elapsed => elapsed !== null);

  if (timestamps.length === 0) {
    return 0;
  }

  const sum = timestamps.reduce((total, value) => total + value, 0);
  const count = timestamps.length;
  const average = sum / count;

  return average;
}

function calculateElapsedTime(cycles) {
  const [firstTick] = cycles.slice(0);
  const [lastTick] = cycles.slice(-1);

  if (!firstTick && !lastTick) {
    return 0;
  }

  return firstTick.date - lastTick.date;
}

const MILLIS_IN_AN_HOUR = 60 * 60 * 1000;

function Stats({ cycles }) {
  const [lastCycle, ...restCycles] = cycles;
  const lastHourCycles = lastCycle
    ? [
        lastCycle,
        ...restCycles.filter(
          ({ date }) => date > lastCycle.date - MILLIS_IN_AN_HOUR
        )
      ]
    : [];
  const frequency = calculateFrequency(lastHourCycles);
  const duration = calculateDuration(lastHourCycles);
  const elapsedTime = calculateElapsedTime(lastHourCycles);

  return (
    <div className="StatsContainer">
      <div className="StatsItem">
        <span className="MeasureTitle">Frequency</span>
        <div className="MeasureTime">
          <FormattedTime value={frequency} />
        </div>
      </div>
      <div className="StatsItem">
        <span className="MeasureTitle">Duration</span>
        <div className="MeasureTime">
          <FormattedTime value={duration} />
        </div>
      </div>
      <div className="StatsItem">
        <span className="MeasureTitle">Timing</span>
        <div className="MeasureTime">
          <FormattedTime value={elapsedTime} />
        </div>
      </div>
      <div className="StatsItem">
        <span className="MeasureTitle">Cycles</span>
        <div className="MeasureTime">
          <span className="TimeDigit">{lastHourCycles.length}</span>
        </div>
      </div>
    </div>
  );
}

Stats.propTypes = {
  cycles: PropTypes.arrayOf(
    PropTypes.shape({
      elapsed: PropTypes.number,
      date: PropTypes.number,
      interval: PropTypes.number
    })
  )
};

export default Stats;
