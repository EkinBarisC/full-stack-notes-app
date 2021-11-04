import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { v4 } from "uuid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";

const AddTask = () => {
  const [text, setText] = useState("");
  const { addTask } = useContext(GlobalContext);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const onSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: v4(),
      text: text,
    };
    addTask(user._id, newTask);
  };

  return (
    <Box>
      <h3>add new task</h3>
      <form onSubmit={onSubmit}>
        <TextField
          type="text"
          label="enter task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            marginRight: "4em",
          }}
        />
        <Button variant="contained" color="primary" type="submit">
          Add Task
        </Button>
      </form>
    </Box>
  );
};

export default AddTask;
