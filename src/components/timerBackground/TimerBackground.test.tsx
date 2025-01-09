import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TimerBackground } from "./TimerBackground";
import { describe, it, expect } from "vitest";

describe("TimerBackground", () => {
  it("renders the SVG element with correct attributes", () => {
    const { container } = render(<TimerBackground />);

    // Check if the SVG element is rendered
    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass(
      "absolute inset-0 w-full h-full -z-10 opacity-5"
    );
    expect(svgElement).toHaveAttribute("viewBox", "0 0 100 100");
    expect(svgElement).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
    expect(svgElement).toHaveAttribute("fill", "none");
  });

  it("renders the circle element with correct attributes", () => {
    const { container } = render(<TimerBackground />);

    // Check if the circle element is rendered inside the SVG
    const circleElement = container.querySelector("circle");
    expect(circleElement).toBeInTheDocument();
    expect(circleElement).toHaveAttribute("cx", "50");
    expect(circleElement).toHaveAttribute("cy", "50");
    expect(circleElement).toHaveAttribute("r", "45");
    expect(circleElement).toHaveAttribute("stroke", "currentColor");
    expect(circleElement).toHaveAttribute("stroke-width", "2");
  });

  it("renders the path element with correct attributes", () => {
    const { container } = render(<TimerBackground />);

    // Check if the path element is rendered inside the SVG
    const pathElement = container.querySelector("path");
    expect(pathElement).toBeInTheDocument();
    expect(pathElement).toHaveAttribute("d", "M50 20V50L70 70");
    expect(pathElement).toHaveAttribute("stroke", "currentColor");
    expect(pathElement).toHaveAttribute("stroke-width", "2");
    expect(pathElement).toHaveAttribute("stroke-linecap", "round");
  });
});
