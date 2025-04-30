import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Todo, todoService } from "../services/todoService";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: todoService.getTodos,
  });

  const createTodoMutation = useMutation({
    mutationFn: todoService.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setNewTodo("");
    },
  });

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      await createTodoMutation.mutateAsync({ title: newTodo });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching todos</div>;

  return (
    <div className="todo-list">
      <h1>Todo List</h1>

      <form onSubmit={handleAddTodo} className="add-todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo..."
        />
        <button type="submit">Add</button>
      </form>

      <div className="todos-container">
        {todos && todos.length > 0 ? (
          todos.map((todo) => <TodoItem key={todo._id} todo={todo} />)
        ) : (
          <p>No todos yet. Add one above!</p>
        )}
      </div>
    </div>
  );
}
