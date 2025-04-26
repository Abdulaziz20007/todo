import { Provider } from "react-redux";
import { store } from "./redux/store";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
