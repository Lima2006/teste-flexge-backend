const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/user");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((e) => console.error("MongoDB connection error: ", e));

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json({ message: "Success", user });
      } else {
        res.json({ message: "Incorrect email or password" });
      }
    } else {
      res.json({ message: "User not found" });
    }
  });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
