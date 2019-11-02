import React from "react";
import PropTypes from "prop-types";
import { formatTime } from "./formatters";
import TrashIcon from "./TrashIcon";
import FormattedTime from "./FormattedTime";

function History({ cycles, onRemove }) {
  return (
    <ul className="HistoryContainer">
      {cycles.map(({ elapsed, date, interval }, index) => (
        <li key={index}>
          <div className="HistoryItem" key={index}>
            <div className="HistoryDate">
              <span>{formatTime(date)}</span>
            </div>
            <div className="HistoryDuration">
              <FormattedTime value={elapsed} />
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
            <FormattedTime value={interval} />
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
