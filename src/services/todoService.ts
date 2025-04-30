import axios from "axios";

export interface Todo {
  _id: string;
  title: string;
  is_done: boolean;
}

export interface CreateTodoRequest {
  title: string;
}

export interface UpdateTodoRequest {
  title?: string;
  is_done?: boolean;
}

const API_URL = "https://api.todo.ligma.uz/";

export const todoService = {
  getTodos: async (): Promise<Todo[]> => {
    const response = await axios.get(`${API_URL}todo`);
    return response.data;
  },

  getTodoById: async (id: string): Promise<Todo> => {
    const response = await axios.get(`${API_URL}todo/${id}`);
    return response.data;
  },

  createTodo: async (todo: CreateTodoRequest): Promise<Todo> => {
    const response = await axios.post(`${API_URL}todo`, todo);
    return response.data;
  },

  updateTodo: async (id: string, todo: UpdateTodoRequest): Promise<Todo> => {
    const response = await axios.patch(`${API_URL}todo/${id}`, todo);
    return response.data;
  },

  deleteTodo: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}todo/${id}`);
  },
};
