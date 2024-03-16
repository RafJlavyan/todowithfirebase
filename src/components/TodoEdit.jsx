import { useState, useEffect } from "react";
import styled from "styled-components";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import MyInput from "../UI/MyInput";
import MyButton from "../UI/MyButton";

const TodoEdit = () => {
  // we getting current id from react-router-dom to make changes
  const { id } = useParams();

  // this is state to save our originally data from id
  const [data, setData] = useState(null);

  /* if inputs are empty we can not change our todo isntead we get
   error bellow about fill inputs in */
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const navigate = useNavigate();

  // here is we get our current todo
  const getTodo = async () => {
    let todo = doc(db, "todos", id);
    let info = await getDoc(todo);
    setData(info.data());
  };

  useEffect(() => {
    getTodo();
  }, []);

  /*this function is responsible for confirm our changes 
  first of all we check if our inputs are fill in and then we get our database 
  to make changes , after we will redirect to our todo list page
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.title.length > 0 && data.task.length > 0) {
      const docRef = doc(db, "todos", id);
      await updateDoc(docRef, data);
      setIsInputEmpty(false);
      navigate(-1);
    } else {
      setIsInputEmpty(true);
    }
  };

  return (
    <TodoEditDiv>
      {!data ? (
        <p>Loading...</p>
      ) : (
        <motion.div
          className="form"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <form onSubmit={handleSubmit}>
            <MyInput
              type="text"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <MyInput
              type="text"
              value={data.task}
              onChange={(e) => setData({ ...data, task: e.target.value })}
            />
            <div className="buttons">
              <MyButton type="reset" onClick={() => navigate(-1)}>
                Cancel
              </MyButton>
              <MyButton type="submit">Submit</MyButton>
            </div>
          </form>
          {isInputEmpty && <p className="error">Please fill inputs in</p>}
        </motion.div>
      )}
    </TodoEditDiv>
  );
};

export default TodoEdit;

const TodoEditDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  p {
    color: #d8d8d8;
  }
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
