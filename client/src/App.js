import "./App.css";
import TaskList from "./components/TaskList";
import { GlobalProvider } from "./context/GlobalState";
import AddTask from "./components/AddTask";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import NotesList from "./components/NotesList";
import AddNote from "./components/AddNote";
import User from "./components/User";
import { Redirect } from "react-router";
import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "./context/GlobalState";
import Grid from "@material-ui/core/Grid";

function App() {
  const { user, getUser } = useContext(GlobalContext);

  return (
    <GlobalProvider>
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <User />
              <Grid
                container
                direction="row"
                justify="space-evenly"
                style={{ marginTop: "5em" }}
              >
                <Grid item>
                  <AddNote />
                </Grid>
                <Grid item>
                  <AddTask />
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="space-between"
              >
                <Grid item>
                  <NotesList />
                </Grid>
                <Grid item>
                  <TaskList />
                </Grid>
              </Grid>
            </Route>
          </Switch>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
