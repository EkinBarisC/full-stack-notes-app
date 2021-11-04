const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, "add a text"],
  },
  finished: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/* module.exports = mongoose.model("Task", TaskSchema); */
module.exports = TaskSchema;
