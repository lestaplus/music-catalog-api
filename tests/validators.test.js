import {
  isValidFoundedYear,
  isValidTrackDuration,
} from "../src/utils/validators.js";

describe("Unit Tests: Business Logic And Invariants", () => {
  describe("isValidFoundedYear", () => {
    test("Should return true for a valid year in the past", () => {
      expect(isValidFoundedYear(2018)).toBe(true);
    });
    test("Should return false for a year in the future", () => {
      const futureYear = new Date().getFullYear() + 5;
      expect(isValidFoundedYear(futureYear)).toBe(false);
    });
    test("Should return false if year is missing", () => {
      expect(isValidFoundedYear(null)).toBe(false);
    });
  });

  describe("isValidTrackDuration", () => {
    test("Should return true if duration > 0", () => {
      expect(isValidTrackDuration(120)).toBe(true);
    });
    test("Should return false if duration equals 0", () => {
      expect(isValidTrackDuration(0)).toBe(false);
    });
    test("Should return false if duration < 0", () => {
      expect(isValidTrackDuration(-20)).toBe(false);
    });
  });
});
