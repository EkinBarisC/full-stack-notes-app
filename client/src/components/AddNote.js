import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";

const AddNote = () => {
  const { addNote } = useContext(GlobalContext);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const onSubmit = (e) => {
    e.preventDefault();

    const newNote = {
      title: title,
      text: text,
    };
    addNote(newNote, user._id);
  };

  return (
    <Box>
      <h3>Add new Note</h3>
      <form onSubmit={onSubmit}>
        <TextField
          type="text"
          label="enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          multiline
          type="text"
          label="enter note text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            marginRight: "4em",
            marginLeft: "4em",
          }}
        />
        <Button variant="contained" color="primary" type="submit">
          Add Note
        </Button>
      </form>
    </Box>
  );
};

export default AddNote;
