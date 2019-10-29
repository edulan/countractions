import React from "react";
import PropTypes from "prop-types";
import { formatSeconds, formatMinutes, formatHours } from "./formatters";

const FREQUENCY_SAMPLE_SIZE = 5;

function calculateFrequency(cycles) {
  const timestamps = cycles
    .slice(0, FREQUENCY_SAMPLE_SIZE)
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

function Stats({ cycles }) {
  const frequency = calculateFrequency(cycles);
  const duration = calculateDuration(cycles);
  const elapsedTime = calculateElapsedTime(cycles);

  return (
    <>
      <div className="StatsContainer">
        <div className="StatsItem">
          <span className="MeasureTitle">Frequency</span>
          <div className="MeasureTime">
            {formatMinutes(frequency) > 0 && (
              <>
                <span className="MeasureDigits">
                  {formatMinutes(frequency)}
                </span>
                <span>min</span>
              </>
            )}
            <span className="MeasureDigits">{formatSeconds(frequency)}</span>
            <span>s</span>
          </div>
        </div>
        <div className="StatsItem">
          <span className="MeasureTitle">Duration</span>
          <div className="MeasureTime">
            {formatMinutes(duration) > 0 && (
              <>
                <span className="MeasureDigits">{formatMinutes(duration)}</span>
                <span>min</span>
              </>
            )}
            <span className="MeasureDigits">{formatSeconds(duration)}</span>
            <span>s</span>
          </div>
        </div>
        <div className="StatsItem">
          <span className="MeasureTitle">Timing</span>
          <div className="MeasureTime">
            {formatHours(elapsedTime) > 0 && (
              <>
                <span className="MeasureDigits">
                  {formatHours(elapsedTime)}
                </span>
                <span>h</span>
              </>
            )}
            <span className="MeasureDigits">{formatMinutes(elapsedTime)}</span>
            <span>min</span>
          </div>
        </div>
      </div>
    </>
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
