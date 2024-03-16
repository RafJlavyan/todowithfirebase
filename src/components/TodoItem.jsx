import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TodoItem = ({ todo, deleteTodos }) => {
  const navigate = useNavigate();
  return (
    <TodoItemDiv>
      <motion.div
        className="task"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        exit={{ x: -100 }}
      >
        <h1>{todo.title}</h1>
        <p>{todo.task}</p>
      </motion.div>
      <motion.div className="buttons"
       initial={{ x: 100 }}
       animate={{ x: 0 }}
       exit={{ x: 100 }}
      >
        <FaRegEdit onClick={() => navigate("/edit/" + todo.id)} />
        <MdOutlineDelete onClick={() => deleteTodos(todo.id)} />
      </motion.div>
    </TodoItemDiv>
  );
};

export default TodoItem;

const TodoItemDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #22282c;
  padding: 20px;
  .task {
  }
  .buttons {
    display: flex;
    gap: 10px;
    font-size: 24px;
    svg {
      cursor: pointer;
    }
  }
`;
