import React, { useContext, useState, useEffect, useCallback } from "react";
import { GlobalContext } from "../context/GlobalState";
import { v4 } from "uuid";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const Register = () => {
  const { register, getUsers, users } = useContext(GlobalContext);

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userExists, setUserExists] = useState(false);
  const history = useHistory();
  const [onSubmitClicked, setOnSubmitClicked] = useState(false);

  useEffect(() => {
    getUsers(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let exists = false;
    users.forEach((user) => {
      if (user.email.localeCompare(email) === 0) {
        exists = true;
      }
    });
    if (exists) {
      setUserExists(true);
    } else {
      setUserExists(false);
    }
    exists = false;
  }, [email]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setOnSubmitClicked(true);

    if (!userExists) {
      const newUser = {
        id: v4(),
        username: username,
        email: email,
        password: password,
      };
      const res = register(newUser);
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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            type="text"
            label="enter username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            autoFocus
          />
          <TextField
            type="text"
            label="enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            autoComplete="email"
            autoFocus
          />
          <TextField
            type="password"
            label="enter password..."
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
            Register
          </Button>
          <Button
            className={classes.submit}
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => history.push("/login")}
          >
            Click here to login
          </Button>

          {userExists && onSubmitClicked ? (
            <div>an account with this email already exists</div>
          ) : null}
        </form>
      </div>
    </Container>
  );
};

export default Register;
