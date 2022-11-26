require("dotenv/config");
const express = require("express");
const app = express();
const cors = require("cors");
const authJwt = require("./utils/jwt");
const bodyParser = require("body-parser");
const todosRoutes = require("./routes/todo");
const usersRoutes = require("./routes/user");
const sequelize = require("./utils/database");
const errorHandler = require("./utils/error-handler");
const Todo = require("./models/todo");
const User = require("./models/user");

const api = process.env.API_URL;
const port = process.env.PORT;

//cors
app.use(cors());
app.options("*", cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(authJwt());
app.use(errorHandler);

sequelize.sync();
// sequelize.sync({ force: true })

app.use(`${api}/auth`, usersRoutes);
app.use(`${api}/todos`, todosRoutes);

Todo.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Todo);

app.listen(port, () => console.log(`Listening on port ${port}`));
