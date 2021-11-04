import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const initialState = {
  tasks: [],
  notes: [],
  user: null,
  users: [],
  error: null,
  loading: true,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getUsers() {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/users/register"
      );
      dispatch({
        type: "GET_ACCOUNTS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "ACCOUNT_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function login(user) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        user,
        config
      );
      dispatch({
        type: "LOGIN",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "ACCOUNT_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function register(user) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/users/register",
        user,
        config
      );
      dispatch({
        type: "REGISTER",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "ACCOUNT_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  function logout() {
    dispatch({
      type: "LOGOUT",
    });
  }

  async function getNotes(userId) {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/users/" + userId + "/notes"
      );

      dispatch({
        type: "GET_NOTES",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "NOTE_ERROR",
        payload: err,
      });
    }
  }

  async function addNote(note, userId) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/users/" + userId + "/notes",
        note,
        config
      );
      dispatch({
        type: "ADD_NOTE",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "NOTE_ERROR",
        payload: err,
      });
    }
  }

  async function updateNote(id, note) {
    try {
      const res = await axios.patch(
        "http://localhost:5000/api/v1/notes/" + id,
        { title: note.title, text: note.text }
      );
      dispatch({
        type: "UPDATE_NOTE",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "NOTE_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function deleteNote(userId, noteId) {
    try {
      const note = await axios.delete(
        "http://localhost:5000/api/v1/users/" + userId + "/notes/" + noteId
      );
      dispatch({
        type: "DELETE_NOTE",
        payload: noteId,
      });
    } catch (err) {
      dispatch({
        type: "NOTE_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function getTasks(userId) {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/users/" + userId + "/tasks"
      );

      dispatch({
        type: "GET_TASKS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TASK_ERROR",
        payload: err,
      });
    }
  }

  async function addTask(userId, task) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        /* get user's id for url */
        "http://localhost:5000/api/v1/users/" + userId + "/tasks",
        task,
        config
      );
      dispatch({
        type: "ADD_TASK",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TASK_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function deleteTask(userId, taskId) {
    try {
      await axios.delete(
        "http://localhost:5000/api/v1/users/" + userId + "/tasks/" + taskId
      );
      dispatch({
        type: "DELETE_TASK",
        payload: taskId,
      });
    } catch (err) {
      dispatch({
        type: "TASK_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function markAsFinished(userId, taskId) {
    try {
      const res = await axios.patch(
        "http://localhost:5000/api/v1/users/" + userId + "/tasks/" + taskId,
        { finished: true }
      );
      dispatch({
        type: "FINISH_TASK",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TASK_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        tasks: state.tasks,
        notes: state.notes,
        user: state.user,
        users: state.users,
        error: state.error,
        loading: state.loading,
        getTasks,
        addTask,
        deleteTask,
        markAsFinished,
        getNotes,
        addNote,
        deleteNote,
        updateNote,
        getUsers,
        register,
        login,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
