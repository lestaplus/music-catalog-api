export const isValidFoundedYear = (year) => {
  if (year == null) return false;
  const currentYear = new Date().getFullYear();
  return year <= currentYear;
};

export const isValidTrackDuration = (duration) => {
  if (duration == null) return false;
  return duration > 0;
};
