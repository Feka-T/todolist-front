import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";
import TodoTask from "./TodoTask";
import config from "./config.json";

// axios.defaults.baseURL = process.env.REACT_APP_URL;

function Index_home() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get(config.apiEndpoint + "get")
      .then((result) => setTodos(result.data))
      .catch((error) => console.log(error));
  }, []);

  const handleCompleted = (id) => {
    axios
      .put(config.apiEndpoint + "update/" + id)
      .then(() => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((error) => console.log(error));
  };

  const handleUncompleted = (id) => {
    axios
      .put(config.apiEndpoint + "undone/" + id)
      .then(() => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(config.apiEndpoint + "delete/" + id)
      .then(() => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="index">
      <h1>Welcome to Fekadu Tadesse Todo List</h1>
      <TodoTask />
      {todos.length === 0 ? (
        <div>
          <h2>No Record Yet!</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="index_task" key={todo._id}>
            <div
              className="finished_check"
              onClick={() => {
                todo.completed
                  ? handleUncompleted(todo._id)
                  : handleCompleted(todo._id);
              }}
            >
              {todo.completed ? (
                <BsFillCheckCircleFill className="completed_icon" />
              ) : (
                <BsCircleFill className="completed_icon" />
              )}
              <p className={todo.completed ? "finished" : ""}>
                {todo.todo_task}
              </p>
            </div>
            <div>
              <BsFillTrashFill
                className="delete_icon"
                onClick={() => handleDelete(todo._id)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Index_home;
