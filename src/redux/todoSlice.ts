import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "./services/todoApi";

interface TodoState {
  selectedTodo: Todo | null;
}

const initialState: TodoState = {
  selectedTodo: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setSelectedTodo: (state, action: PayloadAction<Todo | null>) => {
      state.selectedTodo = action.payload;
    },
  },
});

export const { setSelectedTodo } = todoSlice.actions;
export default todoSlice.reducer;
