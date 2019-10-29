export function formatTick(tick) {
  return Math.abs(tick / 1000).toFixed(2);
}

export function formatTime(timestamp) {
  return new Date(Math.trunc(timestamp)).toLocaleTimeString();
}

export function formatSeconds(timestamp) {
  const formatOptions = {
    second: "numeric",
    hour12: false,
    timeZone: "UTC"
  };

  return new Intl.DateTimeFormat(undefined, formatOptions).format(
    new Date(timestamp)
  );
}

export function formatMinutes(timestamp) {
  const formatOptions = {
    minute: "numeric",
    hour12: false,
    timeZone: "UTC"
  };

  return new Intl.DateTimeFormat(undefined, formatOptions).format(
    new Date(timestamp)
  );
}

export function formatHours(timestamp) {
  const formatOptions = {
    hour: "numeric",
    hour12: false,
    timeZone: "UTC"
  };

  return new Intl.DateTimeFormat(undefined, formatOptions).format(
    new Date(timestamp)
  );
}
