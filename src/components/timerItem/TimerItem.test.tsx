import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { TimerItem } from "./TimerItem";
import { useTimerStore } from "../../store/useTimerStore";
import { toast } from "sonner";
import { Timer } from "../../types/timer";

// Define the store interface
interface TimerStore {
  timers: Timer[];
  toggleTimer: (id: string) => void;
  deleteTimer: (id: string) => void;
  updateTimer: (id: string) => void;
  restartTimer: (id: string) => void;
  addTimer: (timer: Omit<Timer, "id" | "createdAt">) => void;
  editTimer: (id: string, updates: Partial<Timer>) => void;
}

// Mock dependencies
vi.mock("../../store/useTimerStore", () => ({
  useTimerStore: vi.fn(),
}));
vi.mock("sonner");
vi.mock("../../utils/audio", () => ({
  TimerAudio: {
    getInstance: () => ({
      play: vi.fn().mockResolvedValue({ stop: vi.fn() }),
      stop: vi.fn(),
    }),
  },
}));

describe("TimerItem", () => {
  const mockTimer: Timer = {
    id: "1",
    title: "Test Timer",
    description: "Test Description",
    duration: 60,
    remainingTime: 60,
    isRunning: false,
    createdAt: Date.now(),
  };

  const mockStore: Pick<
    TimerStore,
    "toggleTimer" | "deleteTimer" | "updateTimer" | "restartTimer"
  > = {
    toggleTimer: vi.fn(),
    deleteTimer: vi.fn(),
    updateTimer: vi.fn(),
    restartTimer: vi.fn(),
  };

  beforeEach(() => {
    vi.useFakeTimers();
    (useTimerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockStore
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("renders timer information correctly", () => {
    render(<TimerItem timer={mockTimer} />);
    expect(screen.getByText("Test Timer")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("01:00")).toBeInTheDocument();
  });

  it("handles timer toggle", () => {
    render(<TimerItem timer={mockTimer} />);
    const toggleButton = screen.getByTitle("Start Timer");
    fireEvent.click(toggleButton);
    expect(mockStore.toggleTimer).toHaveBeenCalledWith("1");
  });

  it("handles timer restart", () => {
    render(<TimerItem timer={mockTimer} />);
    const restartButton = screen.getByTitle("Restart Timer");
    fireEvent.click(restartButton);
    expect(mockStore.restartTimer).toHaveBeenCalledWith("1");
  });

  it("handles timer delete", () => {
    render(<TimerItem timer={mockTimer} />);
    const deleteButton = screen.getByTitle("Delete Timer");
    fireEvent.click(deleteButton);
    expect(mockStore.deleteTimer).toHaveBeenCalledWith("1");
  });

  it("updates timer and shows toast when timer ends", () => {
    const runningTimer: Timer = {
      ...mockTimer,
      isRunning: true,
      remainingTime: 1,
    };
    render(<TimerItem timer={runningTimer} />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockStore.updateTimer).toHaveBeenCalledWith("1");
    expect(toast.success).toHaveBeenCalledWith(
      'Timer "Test Timer" has ended!',
      expect.any(Object)
    );
  });

  it("cleans up interval on unmount", () => {
    const runningTimer: Timer = {
      ...mockTimer,
      isRunning: true,
      remainingTime: 10,
    };
    const { unmount } = render(<TimerItem timer={runningTimer} />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    unmount();

    // Advance time again to verify the interval is cleaned up
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // The updateTimer should only have been called once (before unmount)
    expect(mockStore.updateTimer).toHaveBeenCalledTimes(1);
  });
});
