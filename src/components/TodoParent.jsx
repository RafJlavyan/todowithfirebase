import { useState } from "react";
import TodoList from "./TodoList";
import styled from "styled-components";
import state from "../store";
import { useSnapshot } from "valtio";
import Home from "./Home";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TodoParent = () => {
  // to get our state from store
  const snap = useSnapshot(state);

  //to change our tabs
  const [isTabOpen, setIsTabOpen] = useState(snap.isTabOpen);

  return (
    <TodoParentBox>
      <div className="panel">
        <motion.ul initial={{ x: -100 }} animate={{ x: 0 }} exit={{ x: -100 }}>
          <li>
            <button onClick={() => setIsTabOpen("Home")}>Home</button>
          </li>
          <li>
            <button>
              <Link to="/addTodo">Create new todo</Link>
            </button>
          </li>
          <li>
            <button onClick={() => setIsTabOpen("TodoList")}>
              My todo list
            </button>
          </li>
        </motion.ul>
      </div>
      <div className="todo_list">
        {isTabOpen === "Home" && <Home />}
        {isTabOpen === "TodoList" && (
          <>
            <TodoList />
          </>
        )}
      </div>
    </TodoParentBox>
  );
};

export default TodoParent;

const TodoParentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 60vh;
  border: 1px solid;
  .todo_list {
    width: 70%;
    height: 100%;
    background-color: #d8d8d8;
  }
  .panel {
    padding: 20px;
    width: 30%;
    height: 100%;
    background-color: #22282d;
    ul {
      display: flex;
      flex-direction: column;
      gap: 10px;
      li {
        button {
          border: none;
          background-color: transparent;
          color: #d8d8d8;
          cursor: pointer;
        }
        :hover {
          opacity: 0.9;
          transform: scale(1.03);
        }
      }
    }
  }
`;
