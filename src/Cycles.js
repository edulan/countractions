import React from "react";
import { formatMinutes, formatTime } from "./formatters";

import TrashIcon from "./TrashIcon";

function Cycles({ ticks, onRemove }) {
  return (
    <>
      <div className="CycleItem">
        <div className="CycleColumn">Frequency</div>
        <div className="CycleColumn">Duration</div>
        <div className="CycleColumn">Start time</div>
      </div>
      <div className="Scrollable">
        {ticks.map(({ elapsed, date, interval, count }, index) => {
          if (!elapsed) {
            return null;
          }

          return (
            <div key={index} className="CycleItem">
              <div className="CycleColumn">
                <span className="CycleInterval">{formatMinutes(interval)}</span>
              </div>
              <div className="CycleColumn">
                <span className="CycleInterval">{formatMinutes(elapsed)}</span>
              </div>
              <div className="CycleColumn">
                <span className="CycleInterval">{formatTime(date)}</span>
              </div>
              <button
                className="ButtonIcon"
                onClick={() => {
                  onRemove(count);
                }}
              >
                <TrashIcon width="1em" />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Cycles;
