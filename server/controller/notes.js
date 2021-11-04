const Note = require("../models/Note");
const User = require("../models/User");

exports.getNotes = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    const notes = user.notes;

    return res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};

exports.addNote = async (req, res, next) => {
  try {
    /* const note = await Note.create(req.body); */

    const user = await User.findOne({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "user not found",
      });
    }

    user.notes.push(req.body);
    await user.save();

    return res.status(200).json({
      success: true,
      data: user.notes[user.notes.length - 1],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "user not found",
      });
    }

    let index = 0;
    user.notes.forEach((note, i) => {
      if (note._id === req.params.noteId) {
        index = i;
      }
    });
    user.notes.splice(index, 1);

    await user.save();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};
