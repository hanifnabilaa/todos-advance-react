/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { Input } from "./Input";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Komponen Input", () => {
  it("menampilkan teks sesuai dengan prop value", () => {
    render(
      <Input value="Belajar" onChange={jest.fn()} placeholder="Tugas ..." />,
    );

    const inputElement = screen.getByDisplayValue("Belajar");
    expect(inputElement).toBeInTheDocument();
  });

  it("memanggil fungsi onChange saat pengguna mengetik", async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    render(
      <Input value="" onChange={mockOnChange} placeholder="Ketik di sini" />,
    );

    const inputElement = screen.getByPlaceholderText("Ketik di sini");

    await user.type(inputElement, "Halo");

    expect(mockOnChange).toHaveBeenCalledTimes(4);
  });

  it("testing snapshot pada keadaan default", () => {
    const { asFragment } = render(
      <Input
        value=""
        onChange={jest.fn()}
        placeholder="Tambah tugas baru..."
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("testing snapshot saat memiliki teks dan custom class", () => {
    const { asFragment } = render(
      <Input
        value="Belajar Snapshot"
        onChange={jest.fn()}
        placeholder="Tambah tugas baru..."
        className="margin-top-10 border-red-500"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
