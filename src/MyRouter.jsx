import { Routes, Route } from "react-router-dom";
import TodoEdit from "./components/TodoEdit";
import TodoParent from "./components/TodoParent";
import TodoForm from "./components/TodoForm";

const MyRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoParent />} />
      <Route path="/addTodo" element={<TodoForm />} />
      <Route path="/edit/:id" element={<TodoEdit />} />
    </Routes>
  );
};

export default MyRouter;
