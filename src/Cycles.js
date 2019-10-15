import React from "react";
import { formatInterval, formatTime } from "./formatters";

function Cycles({ ticks }) {
  return (
    <>
      <div className="CycleItem">
        <div className="CycleColumn">Duration</div>
        <div className="CycleColumn">Frequency</div>
        <div className="CycleColumn">Start time</div>
      </div>
      <div className="Scrollable">
        {ticks.reverse().map(({ elapsed, date, interval }, index) => {
          if (!elapsed) {
            return null;
          }

          return (
            <div key={index} className="CycleItem">
              <div className="CycleColumn">
                <span className="CycleInterval">
                  {elapsed ? formatInterval(elapsed) : "-"}
                </span>
              </div>
              <div className="CycleColumn">
                <span className="CycleInterval">
                  {interval ? formatInterval(interval) : "-"}
                </span>
              </div>
              <div className="CycleColumn">
                <span className="CycleInterval">
                  {date ? formatTime(date) : "-"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Cycles;
