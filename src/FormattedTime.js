import React from "react";
import PropTypes from "prop-types";
import { formatMinutes, formatSeconds, formatHours } from "./formatters";

const FormattedTime = ({ value }) => {
  return (
    <>
      {formatHours(value) > 0 && (
        <>
          <span className="TimeDigit">{formatHours(value)}</span>
          <span className="TimeUnit">h</span>
        </>
      )}
      {formatMinutes(value) > 0 && (
        <>
          <span className="TimeDigit">{formatMinutes(value)}</span>
          <span className="TimeUnit">min</span>
        </>
      )}
      <span className="TimeDigit">{formatSeconds(value)}</span>
      <span className="TimeUnit">s</span>
    </>
  );
};

FormattedTime.propTypes = {
  value: PropTypes.number
};

export default FormattedTime;
