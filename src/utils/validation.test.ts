import { describe, it, expect, vi, beforeEach } from "vitest";
import { validateTimerForm } from "./validation";
import { toast } from "sonner";

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("validateTimerForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should validate a correct form", () => {
    const validForm = {
      title: "Test Timer",
      description: "Test Description",
      hours: 1,
      minutes: 30,
      seconds: 45,
    };

    const result = validateTimerForm(validForm);
    expect(result).toBe(true);
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("should reject empty title", () => {
    const formWithEmptyTitle = {
      title: "   ",
      description: "Test Description",
      hours: 1,
      minutes: 30,
      seconds: 45,
    };

    const result = validateTimerForm(formWithEmptyTitle);
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Title is required");
  });

  it("should reject title longer than 50 characters", () => {
    const formWithLongTitle = {
      title: "A".repeat(51),
      description: "Test Description",
      hours: 1,
      minutes: 30,
      seconds: 45,
    };

    const result = validateTimerForm(formWithLongTitle);
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Title must be less than 50 characters"
    );
  });

  it("should reject negative time values", () => {
    const formWithNegativeTime = {
      title: "Test Timer",
      description: "Test Description",
      hours: -1,
      minutes: 30,
      seconds: 45,
    };

    const result = validateTimerForm(formWithNegativeTime);
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Time values cannot be negative");
  });

  it("should reject minutes greater than 59", () => {
    const formWithInvalidMinutes = {
      title: "Test Timer",
      description: "Test Description",
      hours: 1,
      minutes: 60,
      seconds: 45,
    };

    const result = validateTimerForm(formWithInvalidMinutes);
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Minutes and seconds must be between 0 and 59"
    );
  });

  it("should reject seconds greater than 59", () => {
    const formWithInvalidSeconds = {
      title: "Test Timer",
      description: "Test Description",
      hours: 1,
      minutes: 30,
      seconds: 60,
    };

    const result = validateTimerForm(formWithInvalidSeconds);
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Minutes and seconds must be between 0 and 59"
    );
  });

  it("should reject zero duration", () => {
    const formWithZeroDuration = {
      title: "Test Timer",
      description: "Test Description",
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    const result = validateTimerForm(formWithZeroDuration);
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Please set a time greater than 0"
    );
  });

  it("should reject duration exceeding 24 hours", () => {
    const formWithExcessiveDuration = {
      title: "Test Timer",
      description: "Test Description",
      hours: 25,
      minutes: 0,
      seconds: 0,
    };

    const result = validateTimerForm(formWithExcessiveDuration);
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Timer cannot exceed 24 hours");
  });
});
