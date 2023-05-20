import asyncHander from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateTokens.js";

// @desc Auth user/set token
// route POST /api/user/auth
// @access public
const authUser = asyncHander(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (user && (await user.matchpassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
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
    generateToken(res, user._id);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

// @desc LogOut User
// route POST /api/user/logout
// @access public
const logoutUser = asyncHander(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "User logged out",
  });
});

// @desc get User Profile
// route GET /api/user/profile
// @access private
const getUserProfile = asyncHander(async (req, res) => {
  const user = await User.findById(req.user._id);
  // const user = {
  //   _id: user._id,
  //   email: user.email,
  //   name: user.name,
  // };
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update User Profile
// route PUT /api/user/profile
// @access private
const updateUserProfile = asyncHander(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
    // console.log(updatedUser._id, updatedUser.name, updatedUser.email);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
