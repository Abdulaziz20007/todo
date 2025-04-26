import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://todo.ligma.uz/" }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "todo",
      providesTags: ["Todo"],
    }),
    getTodoById: builder.query<Todo, string>({
      query: (id) => `todo/${id}`,
      providesTags: ["Todo"],
    }),
    createTodo: builder.mutation<Todo, CreateTodoRequest>({
      query: (todo) => ({
        url: "todo",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation<Todo, { id: string; todo: UpdateTodoRequest }>(
      {
        query: ({ id, todo }) => ({
          url: `todo/${id}`,
          method: "PATCH",
          body: todo,
        }),
        invalidatesTags: ["Todo"],
      }
    ),
    deleteTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `todo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
