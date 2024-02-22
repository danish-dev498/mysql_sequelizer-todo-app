const db = require("../models");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiErrors");

const color = require("colors");

const Todo = db.Todo;

const createTodo = asyncHandler(async (req, res, next) => {
  //   const task = req.task;

  const { title, description, priority, assigned_to } = req.body;
  console.log(color.magenta("user_id", req.user.id));

  // here priority was define in integer i gave it string but error was not good
  const newTodo = await Todo.create({
    title: title,
    description: description,
    priority: priority,
    user_id: req.user.id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { todo: newTodo }, "Todo created successfully"));

  // throw new ApiError(409, "User with email or username already exists", []);
});

const getTodo = asyncHandler(async (req, res, next) => {
  console.log(color.green("check the user", req.user));

  const userId = req.user.id;
  const getTodo = await Todo.findOne({
    where: {
      user_id: userId,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { todo: getTodo }, "Todo created successfully"));
});

const getAllTodo = asyncHandler(async (req, res) => {
  const getAllTodos = await Todo.findAll();

  return res
    .status(200)
    .json(
      new ApiResponse(200, { todo: getAllTodos }, "Todo created successfully")
    );
});

//  UPDATE THE TASK ADD DELETE THE TASK

module.exports = { createTodo, getTodo, getAllTodo };
