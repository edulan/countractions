import React from "react";
import PropTypes from "prop-types";
import FormattedTime from "./FormattedTime";

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

const millisInAnHour = 60 * 60 * 1000;

function Stats({ cycles }) {
  const lastHourCycles = cycles.filter(
    ({ date }) => date > Date.now() - millisInAnHour
  );
  const frequency = calculateFrequency(lastHourCycles);
  const duration = calculateDuration(lastHourCycles);
  const elapsedTime = calculateElapsedTime(lastHourCycles);

  return (
    <>
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
