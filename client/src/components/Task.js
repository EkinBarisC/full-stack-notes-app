import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const Task = ({ task }) => {
  const { deleteTask, markAsFinished } = useContext(GlobalContext);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <Grid item>
      <Card
        style={{
          backgroundColor: "green",
          margin: "2em",
          width: "10em",
        }}
      >
        <CardContent style={{ backgroundColor: "#2196f3" }}>
          <h3>{task.text}</h3>
          {!task.finished ? (
            <Button onClick={() => markAsFinished(user._id, task._id)}>
              ✓
            </Button>
          ) : null}
          <Button onClick={() => deleteTask(user._id, task._id)}>x</Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Task;
