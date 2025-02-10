const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./dbconfig/dbconnect");
const User = require("./models/user");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

//create new user
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (err) {
    const errors = {};
    if (err.name === "SequelizeValidationError") {
      err.errors.forEach((validationError) => {
        errors[validationError.path] = validationError.message;
      });
      return res.status(400).json({ errors });
    }
    console.log(err);
    return res.status(400).json({ message: "An unexcepted error occured." });
  }
});

// Get all users (GET)
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["modified_date", "DESC"]],
    });
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Get a specific user by ID (GET)
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Update a user by ID (PATCH)
app.patch("/users/:id", async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      return res.json(updatedUser);
    }
    return res.status(404).json({ message: "User not found" });
  } catch (err) {
    const errors = {};
    if (err.name === "SequelizeValidationError") {
      err.errors.forEach((validationError) => {
        errors[validationError.path] = validationError.message;
      });
      return res.status(400).json({ errors });
    }
    console.log(err);
    return res.status(400).json({ message: "An unexcepted error occured." });
  }
});

// Delete a user by ID (DELETE)
app.delete("/users/:id", async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      return res.status(200).send();
    }
    return res.status(404).json({ message: "User not found" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.listen(port, async () => {
  try {
    console.log("Server is listening at", port);
    //check DB connection
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    await User.sync({ force: true });
  } catch (error) {
    console.log("Error:", error.message);
  }
});
