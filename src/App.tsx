import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoList from "./components/TodoList";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <TodoList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
