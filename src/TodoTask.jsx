import React, { useState } from "react";
import axios from "axios";
import config from "./config.json";

// axios.defaults.baseURL = process.env.REACT_APP_URL;

function TodoTask() {
  const [todo_task, setTask] = useState();

  const handleAdd = () => {
    axios
      .post(config.apiEndpoint + "add", { todo_task: todo_task })
      .then(() => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((error) => console.log(error));
  };

  const handleReset = () => {
    setTask("");
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div className="todo_form">
      <form>
        <input
          type="text"
          placeholder="Type the name of the task ..."
          onChange={(e) => setTask(e.target.value)}
          autoFocus
        />
        <button type="reset" onClick={handleReset}>
          CLEAR
        </button>
        <button type="button" onClick={handleAdd}>
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default TodoTask;
