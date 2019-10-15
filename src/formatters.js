export function formatTick(tick) {
  return Math.abs(tick / 1000).toFixed(2);
}

export function formatTime(timestamp) {
  return new Date(Math.trunc(timestamp)).toLocaleTimeString();
}

export function formatDateTime(timestamp) {
  return new Date(Math.trunc(timestamp)).toLocaleString();
}

export function formatInterval(timestamp) {
  const formatOptions = { second: "2-digit", minute: "2-digit", hour12: false };

  return new Intl.DateTimeFormat(undefined, formatOptions).format(
    new Date(timestamp)
  );
}
