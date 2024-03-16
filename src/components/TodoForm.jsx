import { useState } from "react";
import styled from "styled-components";
import MyInput from "../UI/MyInput";
import MyButton from "../UI/MyButton";
import { motion } from "framer-motion";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";

const TodoForm = () => {
  //these is the states where we keep our datas for title and task
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");

  /* if inputs are empty we can not change our todo isntead we get
   error bellow about fill inputs in */
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const navigate = useNavigate();

  /* here is the function that add our new todo
    first of all we check if our inputs are fill in and then we get our database 
    to add our new todo in
    then we are emptying our inputs and navigate to our todo list
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.length > 0 && task.length > 0) {
      await addDoc(collection(db, "todos"), {
        title,
        task,
      });
      setIsInputEmpty(false);
      setTitle("");
      setTask("");
      navigate("/");
    } else {
      setIsInputEmpty(true);
    }
  };

  return (
    <TodoFormDiv>
      <motion.div
        className="form"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <h2>Write your task</h2>
        <form onSubmit={handleSubmit}>
          <MyInput
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <MyInput
            type="text"
            placeholder="Text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <div className="buttons">
            <MyButton type="reset" onClick={() => navigate("/")}>
              Cancel
            </MyButton>
            <MyButton>Add</MyButton>
          </div>
        </form>
        {isInputEmpty && <p className="error">Please fill inputs in</p>}
      </motion.div>
    </TodoFormDiv>
  );
};

export default TodoForm;

const TodoFormDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  .form {
    padding: 20px;
    width: 35%;
    height: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #d8d8d8;
    gap: 10px;
    background-color: #d8d8d8;
    position: relative;
    h2 {
      color: #22282c;
    }
    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 10px;
      .buttons {
        display: flex;
        gap: 10px;
      }
      input::placeholder {
        color: #22282c;
      }
    }
    .error {
      position: absolute;
      bottom: 5px;
      color: red;
      font-size: 12px;
      text-align: center;
    }
  }
`;
