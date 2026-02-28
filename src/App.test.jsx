/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "./App";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("./features/todos/todoSlice", () => ({
  fetchTodos: jest.fn(() => ({ type: "todos/fetchTodos" })),
  addTodo: jest.fn((payload) => ({ type: "todos/addTodo", payload })),
  toggleTodo: jest.fn(),
  removeTodo: jest.fn(),
}));

import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addTodo } from "./features/todos/todoSlice";

describe("Komponen Utama App (Integration Test)", () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    jest.clearAllMocks();
  });

  it("memanggil fetchTodos saat pertama kali dirender dan menampilkan loading", () => {
    useSelector.mockReturnValue({ items: [], loading: true });

    render(<App />);

    expect(mockDispatch).toHaveBeenCalledWith(fetchTodos());
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("menampilkan EmptyState jika tidak ada tugas", () => {
    useSelector.mockReturnValue({ items: [], loading: false });

    render(<App />);

    expect(
      screen.getByText(/Belum ada tugas untuk saat ini/i),
    ).toBeInTheDocument();
  });

  it("merender daftar tugas dari Redux store", () => {
    const mockTodos = [
      { id: 1, title: "Belajar Redux", completed: false },
      { id: 2, title: "Bikin Testing", completed: true },
    ];
    useSelector.mockReturnValue({ items: mockTodos, loading: false });

    render(<App />);

    expect(screen.getByText("Belajar Redux")).toBeInTheDocument();
    expect(screen.getByText("Bikin Testing")).toBeInTheDocument();

    expect(screen.getByText("1 dari 2")).toBeInTheDocument();
  });

  it("mendispatch addTodo saat form disubmit", async () => {
    const user = userEvent.setup();
    useSelector.mockReturnValue({ items: [], loading: false });

    render(<App />);

    const inputElement = screen.getByPlaceholderText("Tambah tugas baru");
    const submitButton = screen.getByRole("button", { name: /tambah/i });

    await user.type(inputElement, "Tugas Baru dari Jest");
    await user.click(submitButton);

    expect(mockDispatch).toHaveBeenCalledWith(addTodo("Tugas Baru dari Jest"));
  });

  it("testing snapshot saat merender daftar tugas", () => {
    const mockStaticTodos = [
      { id: 101, title: "Belajar Snapshot", completed: false },
      { id: 102, title: "Bikin Kopi", completed: true },
    ];

    useSelector.mockReturnValue({ items: mockStaticTodos, loading: false });

    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });
});
