import { configureStore } from "@reduxjs/toolkit";
import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { timerSlice, useTimerStore } from "./useTimerStore";
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockLocalStorage = (() => {
  let store: Record<string, string> = {}; // Use a record to type the storage object
  return {
    getItem: (key: string): string | null => store[key] || null,
    setItem: (key: string, value: string): void => {
      store[key] = value;
    },
    clear: (): void => {
      store = {};
    },
  };
})();
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("timerState");
    if (!serializedState) {
      return { timers: [] }; // Return an empty state if null
    }
    return JSON.parse(serializedState); // Parse and return the state
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return { timers: [] };
  }
};

// Mocking localStorage
Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

describe("timerSlice and useTimerStore", () => {
  const renderUseTimerStore = () =>
    renderHook(() => useTimerStore(), {
      wrapper: ({ children }) => (
        <Provider store={configureStore({ reducer: timerSlice.reducer })}>
          {children}
        </Provider>
      ),
    });

  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  it("initializes with an empty timers array", () => {
    const { result } = renderUseTimerStore();
    expect(result.current.timers).toEqual([]);
  });

  it("adds a timer", () => {
    const { result } = renderUseTimerStore();
    const newTimer = {
      title: "Test Timer",
      description: "This is a test timer",
      duration: 60,
      remainingTime: 60,
      isRunning: false,
    };

    act(() => {
      result.current.addTimer(newTimer);
    });

    expect(result.current.timers).toHaveLength(1);
    expect(result.current.timers[0]).toMatchObject({
      title: "Test Timer",
      duration: 60,
    });
    expect(result.current.timers[0].id).toBeDefined();
  });

  it("deletes a timer", () => {
    const { result } = renderUseTimerStore();
    const newTimer = {
      title: "Test Timer",
      description: "This is a test timer",
      duration: 60,
      remainingTime: 60,
      isRunning: false,
    };

    act(() => {
      result.current.addTimer(newTimer);
    });

    const timerId = result.current.timers[0].id;

    act(() => {
      result.current.deleteTimer(timerId);
    });

    expect(result.current.timers).toHaveLength(0);
  });

  it("toggles a timer's running state", () => {
    const { result } = renderUseTimerStore();
    const newTimer = {
      title: "Test Timer",
      description: "This is a test timer",
      duration: 60,
      remainingTime: 60,
      isRunning: false,
    };

    act(() => {
      result.current.addTimer(newTimer);
    });

    const timerId = result.current.timers[0].id;

    act(() => {
      result.current.toggleTimer(timerId);
    });

    expect(result.current.timers[0].isRunning).toBe(true);

    act(() => {
      result.current.toggleTimer(timerId);
    });

    expect(result.current.timers[0].isRunning).toBe(false);
  });

  it("updates a timer's remaining time", () => {
    const { result } = renderUseTimerStore();
    const newTimer = {
      title: "Test Timer",
      description: "This is a test timer",
      duration: 60,
      remainingTime: 60,
      isRunning: true,
    };

    act(() => {
      result.current.addTimer(newTimer);
    });

    const timerId = result.current.timers[0].id;

    act(() => {
      result.current.updateTimer(timerId);
    });

    expect(result.current.timers[0].remainingTime).toBe(59);
  });

  it("restarts a timer", () => {
    const { result } = renderUseTimerStore();
    const newTimer = {
      title: "Test Timer",
      description: "This is a test timer",
      duration: 60,
      remainingTime: 30,
      isRunning: true,
    };

    act(() => {
      result.current.addTimer(newTimer);
    });

    const timerId = result.current.timers[0].id;

    act(() => {
      result.current.restartTimer(timerId);
    });

    expect(result.current.timers[0].remainingTime).toBe(60);
    expect(result.current.timers[0].isRunning).toBe(false);
  });

  it("edits a timer", () => {
    const { result } = renderUseTimerStore();
    const newTimer = {
      title: "Test Timer",
      description: "This is a test timer",
      duration: 60,
      remainingTime: 60,
      isRunning: false,
    };

    act(() => {
      result.current.addTimer(newTimer);
    });

    const timerId = result.current.timers[0].id;

    act(() => {
      result.current.editTimer(timerId, {
        title: "Updated Timer",
        duration: 120,
      });
    });

    expect(result.current.timers[0]).toMatchObject({
      title: "Updated Timer",
      duration: 120,
      remainingTime: 120,
    });
  });

  it("persists state to localStorage", () => {
    const { result } = renderUseTimerStore();
    const newTimer = {
      title: "Test Timer",
      description: "This is a test timer",
      duration: 60,
      remainingTime: 60,
      isRunning: false,
    };

    act(() => {
      result.current.addTimer(newTimer);
    });

    const storedState = loadState();
    expect(storedState.timers).toHaveLength(1);
    expect(storedState.timers[0].title).toBe("Test Timer");
  });
});
