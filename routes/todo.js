const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo");

// Create a new Todo
router.post("/createTodo", todoController.createTodo);

// Retrieve all Todos
router.get("/listTodos", todoController.listTodos);

// Delete a Todo with id
router.delete("/deleteTodo/:id", todoController.deleteTodo);

// markTodoCompleted
router.patch("/markTodoCompleted/:id", todoController.markTodoCompleted);

// markTodoUnCompleted
router.patch("/markTodoUncompleted/:id", todoController.markTodoUncompleted);

module.exports = router;
