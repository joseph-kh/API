const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create and Save a user
exports.registerUser = (req, res) => {
  const todo = {
    full_name: req.body.full_name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  };

  // Save user in the database
  User.create(todo)
    .then((data) => res.send({ message: "User created successfully!" }))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong while creating the User!",
      });
    });
};

exports.loginUser = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      // check if todo exist
      if (!user) return res.status(400).send({ message: "User not found!" });

      const secret = process.env.secret;
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ userId: user.id }, secret, {
          expiresIn: "1d",
        });
        return res.status(200).send({ user: user.email, token: token });
      }
      // if comparing hash fail
      else return res.status(422).send({ message: "Wrong credentials!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Something went wrong!`,
      });
    });
};
