import asyncHander from "express-async-handler";
import User from "../models/userModel.js";

// @desc Auth user/set token
// route POST /api/user/auth
// @access public
const authUser = asyncHander(async (req, res) => {
  res.status(401);
  throw new Error("something went wrong");
  res.status(200).json({ message: "Auth User" });
});

// @desc Register new user
// route POST /api/user
// @access public
const registerUser = asyncHander(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);

    throw new Error("user already exists");
  }

  const user = User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(200).json({ _id: user._id, name: user.name, email: user.email });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

// @desc LogOut User
// route POST /api/user/logout
// @access public
const logoutUser = asyncHander(async (req, res) => {
  res.status(200).json({ message: "Logout User" });
});

// @desc get User Profile
// route GET /api/user/profile
// @access private
const getUserProfile = asyncHander(async (req, res) => {
  res.status(200).json({ message: " User Profile" });
});

// @desc Update User Profile
// route PUT /api/user/profile
// @access private
const updateUserProfile = asyncHander(async (req, res) => {
  res.status(200).json({ message: "Update User Profile" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
