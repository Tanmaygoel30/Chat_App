const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { generateToken } = require("../lib/utils");

exports.signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are compulsory",
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    generateToken(existingUser._id, res);

    res.status(201).json({
      _id: existingUser.id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      profilePic: existingUser.profilePic,
    });
  } catch (err) {
    console.log("Failed to login", err.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(201).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log("Logout Error ", err.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.updateProfilePic = (req,res) => {

}