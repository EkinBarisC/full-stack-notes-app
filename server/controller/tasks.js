const Task = require("../models/Task");
const User = require("../models/User");

exports.getTasks = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    const tasks = user.tasks;

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};

exports.addTask = async (req, res, next) => {
  try {
    /* const task = await Task.create(req.body); */

    const user = await User.findOne({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "user not found",
      });
    }

    user.tasks.push(req.body);
    await user.save();

    return res.status(200).json({
      success: true,
      data: user.tasks[user.tasks.length - 1],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "user not found",
      });
    }

    let index = 0;
    user.tasks.forEach((task, i) => {
      if (task._id === req.params.taskId) {
        index = i;
      }
    });
    user.tasks.splice(index, 1);

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

exports.markAsFinished = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.params.userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "task not found",
      });
    }

    let updatedTask;
    user.tasks.forEach((task) => {
      if (task._id == req.params.taskId) {
        task.finished = true;
        updatedTask = task;
      }
    });

    await user.save();
    return res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};
