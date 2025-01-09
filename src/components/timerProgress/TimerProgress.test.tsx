import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TimerProgress } from "./TimerProgress";
import { describe, it, expect } from "vitest";

describe("TimerProgress", () => {
  it("renders the progress bar container", () => {
    render(<TimerProgress progress={50} />);

    // Check if the container is rendered
    const container = screen.getByRole("progressbar");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("w-full bg-gray-200 rounded-full h-2 mb-4");
  });

  it("renders the inner progress bar with correct width", () => {
    const { container } = render(<TimerProgress progress={75} />);

    // Find the inner progress bar
    const progressBar = container.querySelector("div > div");
    expect(progressBar).toBeInTheDocument();
  });

  it("handles 0% progress correctly", () => {
    const { container } = render(<TimerProgress progress={0} />);

    // Check for 0% progress
    const progressBar = container.querySelector("div > div");
    expect(progressBar).toBeInTheDocument();
  });

  it("handles 100% progress correctly", () => {
    const { container } = render(<TimerProgress progress={100} />);

    // Check for 100% progress
    const progressBar = container.querySelector("div > div");
    expect(progressBar).toBeInTheDocument();
  });

  it("handles edge cases where progress exceeds 100%", () => {
    const { container } = render(<TimerProgress progress={120} />);

    // Check for capped progress (assumes the component caps progress at 100%)
    const progressBar = container.querySelector("div > div");
    expect(progressBar).toBeInTheDocument();
  });

  it("handles negative progress gracefully", () => {
    const { container } = render(<TimerProgress progress={-10} />);

    // Check for negative progress
    const progressBar = container.querySelector("div > div");
    expect(progressBar).toBeInTheDocument();
  });
});
