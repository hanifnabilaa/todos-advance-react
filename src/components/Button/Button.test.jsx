/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./Button";

test("memanggil fungsi onClick saat button diklik", () => {
  const mockOnClick = jest.fn();
  render(<Button onClick={mockOnClick} />);

  const tombol = screen.getByRole("button");
  fireEvent.click(tombol);

  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
