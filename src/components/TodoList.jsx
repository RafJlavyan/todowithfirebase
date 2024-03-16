import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import styled from "styled-components";
import state from "../store";
import { useSnapshot } from "valtio";

import { db } from "../firebase.config";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

const TodoList = () => {
  // to get our state from store
  const snap = useSnapshot(state);

  // the state to keep our todo data from store
  const [todos, setTodos] = useState(snap.todos);

  //to connect to our databes
  const todoList = collection(db, "todos");

  const [isLoading, setIsLoading] = useState(false);

  /*
    to get data from our database and show it on our page 
    we fetch data and set them to our state 
  */
  const getTodos = async () => {
    setIsLoading(true);
    const data = await getDocs(todoList);
    setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setIsLoading(false);
  };

  /*
    this is the function to delete todo
    we click the todo we want to delete by id and then we filter our current state
   */
  const deleteTodos = async (id) => {
    let todo = doc(db, "todos", id);
    await deleteDoc(todo);
    setTodos(todos.filter((item) => id !== item.id));
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <TodoListBox>
      <div className="upPanel">
        <h3>My Todo's</h3>
      </div>
      {todos.length === 0 ? (
        <div className="noTodo">
          <p>
            {isLoading
              ? "Loading..."
              : "There is no todo . Click ' Create new todo ' to create your first todo"}
          </p>
        </div>
      ) : (
        <>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} deleteTodos={deleteTodos} />
          ))}
        </>
      )}
    </TodoListBox>
  );
};

export default TodoList;

const TodoListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 100%;
  overflow-y: scroll;
  .noTodo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    p {
      text-align: center;
      width: 50%;
    }
  }
  .upPanel {
    width: 100%;
    background-color: #3d464c;
    display: flex;
    justify-content: center;
    padding: 20px;
    color: #d8d8d8;
    button {
      width: 100px;
      background-color: transparent;
      border: none;
      padding: 0;
    }
  }
`;
