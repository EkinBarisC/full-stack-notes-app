import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router";

const User = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const { logout } = useContext(GlobalContext);
  const history = useHistory();
  return (
    <AppBar
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center ",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h6" style={{ marginLeft: "2em" }}>
        Notes and Tasks
      </Typography>
      <Button
        style={{ marginRight: "2em", color: "white" }}
        onClick={() => {
          logout();
          setUser(null);
          history.push("/login");
        }}
      >
        Logout
      </Button>
    </AppBar>
  );
};

export default User;
