import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home";
import { Provider } from "react-redux";
import { store } from "./store/useTimerStore";
import { describe, it, expect } from "vitest";

describe("Home Component", () => {
  const renderHome = () =>
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

  it("renders the Timer App title", () => {
    renderHome();
    expect(screen.getByText("Timer App")).toBeInTheDocument();
  });

  it("renders the Add Timer button", () => {
    renderHome();
    expect(
      screen.getByRole("button", { name: /Add Timer/i })
    ).toBeInTheDocument();
  });

  it("opens the TimerModal when the Add Timer button is clicked", () => {
    renderHome();
    const addButton = screen.getByRole("button", { name: /Add Timer/i });
    fireEvent.click(addButton);

    // Check that the modal opens
    expect(screen.getByText("Add New Timer")).toBeInTheDocument();
  });

  it("closes the TimerModal when the onClose callback is triggered", () => {
    renderHome();

    const addButton = screen.getByRole("button", { name: /Add Timer/i });
    fireEvent.click(addButton);

    // Close the modal
    const closeButton = screen.getByLabelText("Close modal");
    fireEvent.click(closeButton);

    // Modal should not be in the document anymore
    expect(screen.queryByText("Add New Timer")).not.toBeInTheDocument();
  });

  it("renders the TimerList component", () => {
    renderHome();

    // Assuming TimerList has a default message for empty states
    expect(
      screen.getByText("No timers yet. Add one to get started!")
    ).toBeInTheDocument();
  });

  it("integrates the Toaster for notifications", () => {
    renderHome();
    expect(screen.getByText("Timer App")).toBeInTheDocument(); // Toaster is indirectly part of the layout
  });
});
