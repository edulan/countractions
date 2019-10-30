import React from "react";
import PropTypes from "prop-types";
import { formatMinutes, formatTime, formatSeconds } from "./formatters";

import TrashIcon from "./TrashIcon";

function History({ cycles, onRemove }) {
  return (
    <ul className="HistoryContainer">
      {cycles.map(({ elapsed, date, interval }, index) => (
        <li className="HistoryListItem" key={index}>
          <div className="HistoryItem" key={index}>
            <div className="HistoryDate">
              <span>{formatTime(date)}</span>
            </div>
            <div className="HistoryDuration">
              {formatMinutes(elapsed) > 0 && (
                <>
                  <span>{formatMinutes(elapsed)}</span>
                  <span>min</span>
                </>
              )}
              <span>{formatSeconds(elapsed)}s</span>
            </div>
            <button
              className="ButtonIcon"
              onClick={() => {
                onRemove(index);
              }}
            >
              <TrashIcon width="1em" />
            </button>
          </div>
          <div className="HistoryFrequency">
            {interval > 0 && (
              <>
                <span>{formatMinutes(interval)}min</span>
                <span>{formatSeconds(interval)}s</span>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
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
