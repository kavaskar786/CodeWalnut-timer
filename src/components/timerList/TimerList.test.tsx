import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TimerList } from "./TimerList";
import { useTimerStore } from "../../store/useTimerStore";
import { describe, it, expect, vi, afterEach } from "vitest";

// Mock useTimerStore
vi.mock("../../store/useTimerStore", () => ({
  useTimerStore: vi.fn(),
}));

describe("TimerList", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the empty state when no timers are present", () => {
    (useTimerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      timers: [],
    });

    render(<TimerList />);

    expect(
      screen.getByText("No timers yet. Add one to get started!")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Click the "Add Timer" button above to create your first timer.'
      )
    ).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("renders a list of TimerItem components when timers are present", () => {
    const mockTimers = [
      {
        id: "1",
        title: "Timer 1",
        description: "First timer",
        duration: 60,
        remainingTime: 30,
        isRunning: false,
        createdAt: 12345,
      },
      {
        id: "2",
        title: "Timer 2",
        description: "Second timer",
        duration: 120,
        remainingTime: 120,
        isRunning: true,
        createdAt: 12346,
      },
    ];

    (useTimerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      timers: mockTimers,
    });

    render(<TimerList />);

    expect(
      screen.queryByText("No timers yet. Add one to get started!")
    ).not.toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2); // Assuming TimerItem has a title rendered as <h3>
    expect(screen.getByText("Timer 1")).toBeInTheDocument();
    expect(screen.getByText("Timer 2")).toBeInTheDocument();
  });

  it("renders the correct number of TimerItem components", () => {
    const mockTimers = [
      {
        id: "1",
        title: "Timer 1",
        description: "First timer",
        duration: 60,
        remainingTime: 30,
        isRunning: false,
        createdAt: 12345,
      },
      {
        id: "2",
        title: "Timer 2",
        description: "Second timer",
        duration: 120,
        remainingTime: 120,
        isRunning: true,
        createdAt: 12346,
      },
      {
        id: "3",
        title: "Timer 3",
        description: "Third timer",
        duration: 300,
        remainingTime: 150,
        isRunning: false,
        createdAt: 12347,
      },
    ];

    (useTimerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      timers: mockTimers,
    });

    render(<TimerList />);

    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3);
  });
});
