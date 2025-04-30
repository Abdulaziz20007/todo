import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo, todoService } from "../services/todoService";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation({
    mutationFn: ({
      id,
      todo: updateData,
    }: {
      id: string;
      todo: { title?: string; is_done?: boolean };
    }) => todoService.updateTodo(id, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: todoService.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleToggleDone = () => {
    updateTodoMutation.mutate({
      id: todo._id,
      todo: { is_done: !todo.is_done },
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTodoMutation.mutate({ id: todo._id, todo: { title } });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTodoMutation.mutate(todo._id);
  };

  return (
    <div className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.is_done}
          onChange={handleToggleDone}
        />
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        ) : (
          <span className={todo.is_done ? "done" : ""}>{todo.title}</span>
        )}
      </div>
      <div className="todo-actions">
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
