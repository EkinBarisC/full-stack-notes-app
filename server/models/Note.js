const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  text: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/* module.exports = mongoose.model("Note", NoteSchema); */
module.exports = NoteSchema;
