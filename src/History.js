import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { formatMinutes, formatTime, formatSeconds } from "./formatters";

import TrashIcon from "./TrashIcon";

function History({ cycles, onRemove }) {
  return (
    <div className="CycleContainer">
      <div className="CycleHeader">Frequency</div>
      <div className="CycleHeader">Duration</div>
      <div className="CycleHeader">Start time</div>
      <div className="CycleHeader"></div>
      {cycles.map(({ elapsed, date, interval }, index) => {
        return (
          <Fragment key={index}>
            <div className="CycleColumn">
              <span className="CycleInterval">
                {formatMinutes(interval)}min
              </span>
              <span className="CycleInterval">{formatSeconds(interval)}s</span>
            </div>
            <div className="CycleColumn">
              <span className="CycleInterval">{formatMinutes(elapsed)}min</span>
              <span className="CycleInterval">{formatSeconds(elapsed)}s</span>
            </div>
            <div className="CycleColumn">
              <span className="CycleInterval">{formatTime(date)}</span>
            </div>
            <button
              className="ButtonIcon"
              onClick={() => {
                onRemove(index);
              }}
            >
              <TrashIcon width="1em" />
            </button>
          </Fragment>
        );
      })}
    </div>
  );
}

History.propTypes = {
  cycles: PropTypes.arrayOf(
    PropTypes.shape({
      elapsed: PropTypes.number,
      date: PropTypes.number,
      interval: PropTypes.number
    })
  ),
  onRemove: PropTypes.func
};

History.defaultProps = {
  onRemove: () => {}
};

export default History;
