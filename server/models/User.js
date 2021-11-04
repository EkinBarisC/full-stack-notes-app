const mongoose = require("mongoose");
const Note = require("./Note");
const Task = require("./Task");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, "add a user name"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "add an email"],
  },
  password: {
    type: String,
    required: [true, "add a password"],
  },
  notes: {
    type: [Note],
    default: () => ({}),
  },
  tasks: [Task],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
