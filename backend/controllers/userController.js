import { asyncHandler } from "../middlewares/asyncHandler.js";
import Users from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  // Validate email format
  if (!email.includes("@")) {
    return res.status(400).json({ message: "Please enter a valid email address" });
  }

  // Validate password length
  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters long" });
  }

  const existedUser = await Users.findOne({ email });
  if (existedUser) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new Users({
    username,
    email,
    password: hashedPassword,
    role: req.body.role || "user",
  });

  try {
    await newUser.save();
    generateToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    return res.status(400).json({ message: `Registration failed: ${error.message}` });
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  const existingUser = await Users.findOne({ email });
  if (!existingUser) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const validPassword = await bcrypt.compare(password, existingUser.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  generateToken(res, existingUser._id);
  res.status(201).json({
    _id: existingUser._id,
    username: existingUser.username,
    email: existingUser.email,
    role: existingUser.role,
  });
});

export const logoutUser = asyncHandler(async (req, res) => {
  const secureCookie =
    process.env.COOKIE_SECURE === "true" ||
    process.env.NODE_ENV === "production";
  const sameSite = secureCookie ? "none" : "lax";

  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: secureCookie,
    sameSite,
    path: "/",
  });
  res.status(200).json({
    message: "Logged out successfully",
  });
});
