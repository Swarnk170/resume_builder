import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Resume } from "../models/resume.model.js";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);
    const selectedUser = await User.findById(newUser._id).select("-password");

    return res.status(201).json({
      message: "User registered successfully",
      user: selectedUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in resgister user controller",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password." });
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email pr password." });
    }
    const token = generateToken(user._id);
    const selectedUser = await User.findById(user._id).select("-password");
    return res.status(200).json({
      message: "User logged in successfully",
      user: selectedUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in login user controller",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({
      message: "Error in get user by ID controller",
      error: error.message,
    });
  }
};

export const getUserResumes = async (req, res) => {
  try {
    const userId = req.userId;
    const resumes = await Resume.find({ userId });
    return res.status(200).json({
      resumes,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
