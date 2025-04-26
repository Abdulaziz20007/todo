import { useState } from "react";
import {
  Todo,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../redux/services/todoApi";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleToggleDone = () => {
    updateTodo({ id: todo._id, todo: { is_done: !todo.is_done } });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTodo({ id: todo._id, todo: { title } });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTodo(todo._id);
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
