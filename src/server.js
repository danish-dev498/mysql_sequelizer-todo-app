const express = require("express");
const app = express();
const colors = require("colors");
require('dotenv').config()

const userRoutes = require("./routes/user.routes.js");
const todoRoutes = require("./routes/todo.routes.js");
const { errorHandler } = require("./middlewares/error.middleware.js");

// Sync the models with the database

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", userRoutes);
app.use("/api/v1", todoRoutes);

// sequelize.sync().then(() => {
//   console.log("Database synced");
// });

app.use(errorHandler);

console.log(colors.red(process.env.PORT))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(colors.cyan(`Server is running on port ${PORT}`));
});
