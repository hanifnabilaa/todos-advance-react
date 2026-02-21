import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";


export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async () => {
        const response = await api.get("/todos?_limit=10");
        return response.data;
    }
);

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        addTodo: (state, action) => {
            state.items.push({
                id: Date.now(),
                title: action.payload,
                completed: false,
            });
        },
        toggleTodo: (state, action) => {
            const todo = state.items.find((t) => t.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        removeTodo: (state, action) => {
            state.items = state.items.filter((t) => t.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;