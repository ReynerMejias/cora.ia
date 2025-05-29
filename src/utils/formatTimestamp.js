const formatTimestamp = (date) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default formatTimestamp;
