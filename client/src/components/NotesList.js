import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import Note from "./Note";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";

const NotesList = () => {
  const { notes, getNotes } = useContext(GlobalContext);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (user) {
      getNotes(user._id);
    } // eslint-disable-next-line
  }, []);

  return (
    <Box style={{ marginLeft: "5em" }}>
      <h3>Notes</h3>
      <Grid container>
        {notes.map((note) => (
          <Note key={note._id} note={note} />
        ))}
      </Grid>
    </Box>
  );
};

export default NotesList;
