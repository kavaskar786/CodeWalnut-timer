import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "./store/useTimerStore";
import Home from "./Home";
import { describe, it, expect } from "vitest";

describe("Application Root", () => {
  it("renders the Home component correctly within the Redux Provider", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Assuming the Home component renders some text, verify its content
    expect(screen.getByText("Timer App")).toBeInTheDocument();
  });
});
