import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const Login = () => {
  const { login, getUsers, users } = useContext(GlobalContext);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [onSubmitClicked, setOnSubmitClicked] = useState(false);

  const history = useHistory();

  useEffect(() => {
    getUsers(); // eslint-disable-next-line
  }, [usernameOrEmail]);

  useEffect(() => {
    console.log("running");
    let exists = false;
    users.forEach((user) => {
      if (user.email.localeCompare(usernameOrEmail) === 0) {
        exists = true;
      } else if (user.username.localeCompare(usernameOrEmail) === 0) {
        exists = true;
      }
    });
    if (exists) {
      setUserExists(true);
    } else {
      setUserExists(false);
    }
    exists = false;
  }, [usernameOrEmail]);

  const onSubmit = (e) => {
    e.preventDefault();
    setOnSubmitClicked(true);

    if (userExists && password !== "") {
      const user = {
        usernameOrEmail: usernameOrEmail,
        password: password,
      };
      const res = login(user);
      console.log(res);
      res.then(() => {
        history.push("/");
      });
    }
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            type="text"
            label="enter username or email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            autoComplete="email"
            autoFocus
          />
          <TextField
            type="password"
            label="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            autoFocus
          />
          <Button
            className={classes.submit}
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            Login
          </Button>
          <Button
            onClick={() => history.push("/register")}
            className={classes.submit}
            fullWidth
            variant="contained"
            color="primary"
          >
            Click here to register
          </Button>

          {(!userExists && onSubmitClicked) ||
          (password === "" && onSubmitClicked) ? (
            <div>username or password is incorrect</div>
          ) : null}
        </form>
      </div>
    </Container>
  );
};

export default Login;
