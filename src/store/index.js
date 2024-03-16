import { proxy } from "valtio";

//this is a state manager like useContext only the easy way to use
const state = proxy({

  //this is our todos array
  todos: [],

  //this is the path we can change our tabs , originally it is in the todo list page
  isTabOpen: "TodoList",
});

export default state;
