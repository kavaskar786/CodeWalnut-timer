import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./Button";
import { Camera } from "lucide-react";

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText("Click me");
    expect(button).toBeInTheDocument();
    expect(button.className).toContain("bg-blue-600");
  });

  it("handles different variants", () => {
    const { rerender } = render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText("Secondary").className).toContain("bg-gray-100");

    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByText("Danger").className).toContain("bg-red-50");

    rerender(
      <Button variant="icon" icon={Camera}>
        Icon
      </Button>
    );
    expect(screen.getByText("Icon").className).toContain("rounded-full");
  });

  it("applies different sizes correctly", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByText("Small").className).toContain(
      "px-3 py-1.5 text-sm"
    );

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByText("Large").className).toContain("px-6 py-3 text-lg");
  });

  it("renders icon correctly", () => {
    render(<Button icon={Camera}>With Icon</Button>);
    const button = screen.getByText("With Icon");
    const svg = button.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("handles loading state", () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByText("Loading")).toBeDisabled();
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("merges custom className with default classes", () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByText("Custom");
    expect(button.className).toContain("custom-class");
    expect(button.className).toContain("bg-blue-600");
  });
});
