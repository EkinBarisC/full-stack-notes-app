import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { palette } from "@material-ui/system";

const Note = ({ note }) => {
  const { deleteNote } = useContext(GlobalContext);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <Grid item>
      <Card
        style={{
          margin: "2em",
          width: "10em",
        }}
      >
        <CardContent style={{ backgroundColor: "#2196f3" }}>
          <h1>{note.title}</h1>
          <h3>{note.text}</h3>
          <Button onClick={() => deleteNote(user._id, note._id)}>x</Button>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default Note;
