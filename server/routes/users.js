const express = require("express");
const router = express.Router();

const {
  getUsers,
  register,
  deleteUser,
  login,
} = require("../controller/users");

const {
  getTasks,
  addTask,
  deleteTask,
  markAsFinished,
} = require("../controller/tasks");

const { getNotes, addNote, deleteNote } = require("../controller/notes");

router.route("/login").get(getUsers).post(login);
router.route("/register").post(register).get(getUsers);
router.route("/:id").delete(deleteUser);

router.route("/:userId/tasks").get(getTasks).post(addTask);
router.route("/:userId/tasks/:taskId").delete(deleteTask).patch(markAsFinished);

router.route("/:userId/notes").get(getNotes).post(addNote);
router.route("/:userId/notes/:noteId").delete(deleteNote);

module.exports = router;
