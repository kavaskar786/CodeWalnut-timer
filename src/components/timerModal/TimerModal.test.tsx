import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TimerModal } from "./TimerModal";
import { toast } from "sonner";
import { describe, it, expect, vi, afterEach } from "vitest";

// Mock dependencies
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const addTimerMock = vi.fn();
const editTimerMock = vi.fn();

vi.mock("../../store/useTimerStore", () => ({
  useTimerStore: () => ({
    addTimer: addTimerMock,
    editTimer: editTimerMock,
  }),
}));

describe("TimerModal", () => {
  const mockOnClose = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the modal when isOpen is true", () => {
    render(<TimerModal isOpen={true} onClose={mockOnClose} mode="add" />);

    expect(screen.getByText("Add New Timer")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter timer title")
    ).toBeInTheDocument();
  });

  it("calls addTimer on successful form submission in add mode", () => {
    render(<TimerModal isOpen={true} onClose={mockOnClose} mode="add" />);

    fireEvent.change(screen.getByPlaceholderText("Enter timer title"), {
      target: { value: "Test Timer" },
    });
    fireEvent.change(screen.getByLabelText("Hours"), {
      target: { value: "1" },
    });

    const submitButton = screen.getByText("Add Timer");
    fireEvent.click(submitButton);

    expect(addTimerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Test Timer",
        duration: 3600,
      })
    );
    expect(toast.success).toHaveBeenCalledWith(
      "Timer created successfully",
      expect.any(Object)
    );
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls editTimer on successful form submission in edit mode", () => {
    render(
      <TimerModal
        isOpen={true}
        onClose={mockOnClose}
        timer={{
          id: "1",
          title: "Test Timer",
          description: "Test Description",
          duration: 3600,
          remainingTime: 3600,
          isRunning: false,
          createdAt: 34454675,
        }}
        mode="edit"
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Enter timer title"), {
      target: { value: "Updated Timer" },
    });

    const submitButton = screen.getByText("Save Changes");
    fireEvent.click(submitButton);

    expect(editTimerMock).toHaveBeenCalledWith(
      "1",
      expect.objectContaining({
        title: "Updated Timer",
        duration: 3600,
      })
    );
    expect(toast.success).toHaveBeenCalledWith(
      "Timer updated successfully",
      expect.any(Object)
    );
    expect(mockOnClose).toHaveBeenCalled();
  });
  it("shows a validation error if the title is empty on form submission", () => {
    render(<TimerModal isOpen={true} onClose={mockOnClose} mode="add" />);

    const submitButton = screen.getByText("Add Timer");
    fireEvent.click(submitButton);

    expect(toast.error).toHaveBeenCalledWith(
      "Please enter a valid title",
      expect.any(Object)
    );
  });
  it("shows a validation error if the duration is zero on form submission", () => {
    render(<TimerModal isOpen={true} onClose={mockOnClose} mode="add" />);

    fireEvent.change(screen.getByPlaceholderText("Enter timer title"), {
      target: { value: "Test Timer" },
    });

    const submitButton = screen.getByText("Add Timer");
    fireEvent.click(submitButton);

    expect(toast.error).toHaveBeenCalledWith(
      "Please set a valid duration",
      expect.any(Object)
    );
  });
  it("calls onClose when the cancel button is clicked", () => {
    render(<TimerModal isOpen={true} onClose={mockOnClose} mode="add" />);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
  it("calls onClose when the close icon is clicked", () => {
    render(<TimerModal isOpen={true} onClose={mockOnClose} mode="add" />);

    const closeIcon = screen.getByLabelText("Close modal");
    fireEvent.click(closeIcon);

    expect(mockOnClose).toHaveBeenCalled();
  });
  it("shows a validation error if duration is set to zero in edit mode", () => {
    render(
      <TimerModal
        isOpen={true}
        onClose={mockOnClose}
        timer={{
          id: "1",
          title: "Test Timer",
          description: "Test Description",
          duration: 0,
          remainingTime: 0,
          isRunning: false,
          createdAt: 34454675,
        }}
        mode="edit"
      />
    );

    const submitButton = screen.getByText("Save Changes");
    fireEvent.click(submitButton);

    expect(toast.error).toHaveBeenCalledWith(
      "Please set a valid duration",
      expect.any(Object)
    );
  });
});
