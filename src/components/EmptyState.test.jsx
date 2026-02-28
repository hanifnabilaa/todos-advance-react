/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { EmptyState } from "./EmptyState";
import "@testing-library/jest-dom";

describe("Komponen EmptyState", () => {
  it("merender ilustrasi dan pesan kosong di layar", () => {
    render(<EmptyState />);

    const titleElement = screen.getByText("Belum ada tugas untuk saat ini");
    const descElement = screen.getByText(
      "Silahkan tambah tugas baru pada form di atas.",
    );

    expect(titleElement).toBeInTheDocument();
    expect(descElement).toBeInTheDocument();

    expect(titleElement).toHaveClass("font-bold");
  });
});
