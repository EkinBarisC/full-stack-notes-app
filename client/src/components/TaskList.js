import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import Task from "./Task";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";

const TaskList = () => {
  const { tasks, getTasks } = useContext(GlobalContext);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (user) {
      getTasks(user._id);
    } // eslint-disable-next-line
  }, []);

  const [allTasks, setAllTasks] = useState({});

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <h3>Tasks</h3>
      <Grid item>
        {tasks.map((task) =>
          !task.finished ? <Task key={task._id} task={task} /> : null
        )}
      </Grid>
      <h3>Completed Tasks</h3>
      <Grid item>
        {tasks.map((task) =>
          task.finished ? <Task key={task._id} task={task} /> : null
        )}
      </Grid>
    </Box>
  );
};

export default TaskList;
