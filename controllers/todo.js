const Todo = require("../models/todo");

// Create and Save a new Todo
exports.createTodo = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Title can not be empty!",
    });
    return;
  }
  const userId = req.auth.userId;

  // Create a Todo
  const todo = {
    title: req.body.title,
    userId: userId,
  };

  Todo.create(todo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong!",
      });
    });
};

// Retrieve all Todos from the database
exports.listTodos = (req, res) => {
  const userId = req.auth.userId;

  Todo.findAll({ where: { userId: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong!",
      });
    });
};

// Delete a Todo with the specified id in the request
exports.deleteTodo = (req, res) => {
  const id = req.params.id;

  Todo.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Todo was deleted successfully!",
        });
      } else {
        res.send({
          message: `Could not delete Todo with id=${id}. Maybe Todo was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong!",
      });
    });
};

// Mark a Todo with the specified id in the request as completed
exports.markTodoCompleted = (req, res) => {
  const id = req.params.id;
  const userId = req.auth.userId;

  Todo.findOne({ where: { id: id, userId: userId } })
    .then((todo) => {
      // check if todo exist
      if (!todo)
        return res.send({
          message: `Cannot update Todo with id=${id}. Maybe Todo was not found or Todo id was not sent`,
        });

      todo.completed = true;
      todo.save();
      return res.send(todo);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Todo with id=${id}`,
      });
    });
};

// Mark a Todo with the specified id in the request as Incompleted
exports.markTodoUncompleted = (req, res) => {
  const id = req.params.id;
  const userId = req.auth.userId;

  Todo.findOne({ where: { id: id, userId: userId } })
    .then((todo) => {
      // check if todo exist
      if (!todo)
        return res.send({
          message: `Cannot update Todo with id=${id}. Maybe Todo was not found or Todo id was not sent`,
        });
      todo.completed = false;
      todo.save();
      return res.send(todo);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong!",
      });
    });
};
