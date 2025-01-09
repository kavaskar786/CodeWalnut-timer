import { formatTime } from "./time";
import { describe, it, expect } from "vitest";

describe("formatTime", () => {
  it("formats seconds less than a minute", () => {
    expect(formatTime(0)).toBe("00:00"); // 0 seconds
    expect(formatTime(5)).toBe("00:05"); // 5 seconds
    expect(formatTime(59)).toBe("00:59"); // 59 seconds
  });

  it("formats durations in minutes and seconds", () => {
    expect(formatTime(60)).toBe("01:00"); // 1 minute
    expect(formatTime(90)).toBe("01:30"); // 1 minute, 30 seconds
    expect(formatTime(3599)).toBe("59:59"); // 59 minutes, 59 seconds
  });

  it("formats durations in hours, minutes, and seconds", () => {
    expect(formatTime(3600)).toBe("01:00:00"); // 1 hour
    expect(formatTime(3661)).toBe("01:01:01"); // 1 hour, 1 minute, 1 second
    expect(formatTime(86399)).toBe("23:59:59"); // 23 hours, 59 minutes, 59 seconds
  });

  it("handles large durations", () => {
    expect(formatTime(86400)).toBe("24:00:00"); // 24 hours
  });

  it("handles edge cases", () => {
    expect(formatTime(-1)).toBe("00:00"); // Negative time defaults to 0
    expect(formatTime(Number.MAX_SAFE_INTEGER)).toBeDefined(); // Large number does not throw
  });
});
