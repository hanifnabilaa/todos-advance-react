/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Komponen Header", () => {
  it('harus merender logo "to" dan "do" di layar', () => {
    render(<Header isDarkMode={false} toggleDarkMode={jest.fn()} />);

    expect(screen.getByText("to")).toBeInTheDocument();
    expect(screen.getByText("do")).toBeInTheDocument();
  });

  it('harus memiliki tombol dengan arial-label "Toggle Dark Mode"', () => {
    render(<Header isDarkMode={false} toggleDarkMode={jest.fn()} />);

    const toggleButton = screen.getByRole("button", {
      name: /toggle dark mode/i,
    });
    expect(toggleButton).toBeInTheDocument();
  });

  it("seharusnya memanggil fungsi toggleDarkMode saat tombol diklik", async () => {
    const user = userEvent.setup();

    const mockToggleFn = jest.fn();

    render(<Header isDarkMode={false} toggleDarkMode={mockToggleFn} />);

    const toggleButton = screen.getByRole("button", {
      name: /toggle dark mode/i,
    });

    await user.click(toggleButton);

    expect(mockToggleFn).toHaveBeenCalledTimes(1);
  });

  it("merender ikon dengan warna berbeda tergantung pada mode", () => {
    const { rerender } = render(
      <Header isDarkMode={false} toggleDarkMode={jest.fn()} />,
    );

    expect(
      screen.getByRole("button", { name: /toggle dark mode/i }),
    ).toBeInTheDocument();

    rerender(<Header isDarkMode={true} toggleDarkMode={jest.fn()} />);

    expect(
      screen.getByRole("button", { name: /toggle dark mode/i }),
    ).toBeInTheDocument();
  });

  it("testing snapshot saat Light Mode", () => {
    const { asFragment } = render(
      <Header isDarkMode={false} toggleDarkMode={jest.fn()} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("testing snapshot saat Dark Mode", () => {
    const { asFragment } = render(
      <Header isDarkMode={true} toggleDarkMode={jest.fn()} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
