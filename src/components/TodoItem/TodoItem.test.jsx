/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { TodoItem } from "./TodoItem";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Komponen TodoItem", () => {
  it("merender judul todo dengan benar", () => {
    render(
      <TodoItem
        title="Daftar Tugas Belajar"
        completed={false}
        onToggle={jest.fn()}
        onDelete={jest.fn()}
        id="1"
      />,
    );

    expect(screen.getByText("Daftar Tugas Belajar")).toBeInTheDocument();
  });

  it("tidak memiliki coretan (line-through) jika belum selesai", () => {
    render(
      <TodoItem
        title="Belajar React"
        completed={false}
        onToggle={jest.fn()}
        onDelete={jest.fn()}
        id="1"
      />,
    );

    const titleElement = screen.getByText("Belajar React");
    expect(titleElement).not.toHaveClass("line-through");
  });

  it("memiliki coretan (line-through) jika sudah selesai", () => {
    render(
      <TodoItem
        title="Belajar React"
        completed={true}
        onToggle={jest.fn()}
        onDelete={jest.fn()}
        id="1"
      />,
    );

    const titleElement = screen.getByText("Belajar React");
    expect(titleElement).toHaveClass("line-through");
    expect(titleElement).toHaveClass("text-gray-400");
  });

  it("memanggil fungsi onToggle dengan ID yang benar saat diklik", async () => {
    const user = userEvent.setup();
    const mockOnToggle = jest.fn();

    render(
      <TodoItem
        id={99}
        title="Tugas Rahasia"
        completed={false}
        onToggle={mockOnToggle}
        onDelete={jest.fn()}
      />,
    );

    const buttons = screen.getAllByRole("button");
    const toggleButton = buttons[0];

    await user.click(toggleButton);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledWith(99);
  });

  it("memanggil fungsi onDelete dengan ID yang benar saat tombol hapus diklik", async () => {
    const user = userEvent.setup();
    const mockOnDelete = jest.fn();

    render(
      <TodoItem
        id={42}
        title="Tugas Dihapus"
        completed={false}
        onToggle={jest.fn()}
        onDelete={mockOnDelete}
      />,
    );

    const buttons = screen.getAllByRole("button");
    const deleteButton = buttons[1];

    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(42);
  });
});
