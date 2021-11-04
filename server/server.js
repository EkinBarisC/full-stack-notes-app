const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

const allowedOrigins = ["http://localhost:3000"];

const options = {
  origin: allowedOrigins,
  credentials: true,
};

dotenv.config({ path: "./config/config.env" });

connectDB();

const users = require("./routes/users");
const tasks = require("./routes/users");
const notes = require("./routes/users");

const app = express();

app.use(cors(options));

app.use(express.json());

/* app.use(morgan("dev")) */

app.use("/api/v1/tasks", tasks);
app.use("/api/v1/users", users);
app.use("/api/v1/notes", notes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("server started running on port " + PORT));
