const Sequelize = require("sequelize");

const sequelize = new Sequelize("FoodStyles-todo", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
