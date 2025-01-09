import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TimerControls } from "./TimerControls";

describe("TimerControls", () => {
  it("renders the restart button when the timer is completed", () => {
    const onRestartMock = vi.fn();
    render(
      <TimerControls
        isRunning={false}
        remainingTime={0}
        duration={60}
        onToggle={vi.fn()}
        onRestart={onRestartMock}
      />
    );

    const restartButton = screen.getByTitle("Restart Timer");
    expect(restartButton).toBeInTheDocument();
    fireEvent.click(restartButton);
    expect(onRestartMock).toHaveBeenCalledTimes(1);
  });

  it("renders the pause button when the timer is running", () => {
    const onToggleMock = vi.fn();
    render(
      <TimerControls
        isRunning={true}
        remainingTime={30}
        duration={60}
        onToggle={onToggleMock}
        onRestart={vi.fn()}
      />
    );

    const pauseButton = screen.getByTitle("Pause Timer");
    expect(pauseButton).toBeInTheDocument();
    expect(pauseButton).toHaveClass("bg-red-100");
    fireEvent.click(pauseButton);
    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });

  it("renders the play button when the timer is paused", () => {
    const onToggleMock = vi.fn();
    render(
      <TimerControls
        isRunning={false}
        remainingTime={30}
        duration={60}
        onToggle={onToggleMock}
        onRestart={vi.fn()}
      />
    );

    const playButton = screen.getByTitle("Start Timer");
    expect(playButton).toBeInTheDocument();
    expect(playButton).toHaveClass("bg-green-100");
    fireEvent.click(playButton);
    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });

  it("applies hover styles correctly", () => {
    render(
      <TimerControls
        isRunning={false}
        remainingTime={30}
        duration={60}
        onToggle={vi.fn()}
        onRestart={vi.fn()}
      />
    );

    const playButton = screen.getByTitle("Start Timer");
    expect(playButton).toHaveClass("hover:bg-green-200");
  });

  it("handles edge case: no time remaining with timer running", () => {
    const onRestartMock = vi.fn();
    render(
      <TimerControls
        isRunning={true}
        remainingTime={0}
        duration={60}
        onToggle={vi.fn()}
        onRestart={onRestartMock}
      />
    );

    const restartButton = screen.getByTitle("Restart Timer");
    expect(restartButton).toBeInTheDocument();
    fireEvent.click(restartButton);
    expect(onRestartMock).toHaveBeenCalledTimes(1);
  });
});
