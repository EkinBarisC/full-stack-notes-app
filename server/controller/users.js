const User = require("../models/User");
const argon2 = require("argon2");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body;
    let user;
    if (usernameOrEmail.includes(".com") && usernameOrEmail.includes("@")) {
      user = await User.findOne({
        email: usernameOrEmail,
      });
    } else {
      user = await User.findOne({
        username: usernameOrEmail,
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "account not found",
      });
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return res.status(404).json({
        success: false,
        error: "incorrect password",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};

exports.register = async (req, res, next) => {
  try {
    const { id, username, email, password } = req.body;
    const hashedPassword = await argon2.hash(password);
    const user = await User.create({
      id: id,
      username: username,
      email: email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "account not found",
      });
    }

    await User.deleteOne();
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
