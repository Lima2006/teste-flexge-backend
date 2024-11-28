const jwt = require("jsonwebtoken");

const User = require("../models/user-model");

class LoginController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user?.password === password) {
        const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "1h",
        });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "Incorrect email or password" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new LoginController();
