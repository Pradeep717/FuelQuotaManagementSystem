import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/genarateTokenAndSetCookie.js";

// Signup a new user
const signupUser = async (req, res) => {
  try {
    const { name, email, password, role, phoneNumber } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
    });

    await newUser.save();

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phoneNumber: newUser.phoneNumber,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in signupUser: ", error.message);
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));

    if (isPasswordCorrect) {
      generateTokenAndSetCookie(user._id, res);

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in loginUser: ", error.message);
  }
};

// Logout a user
const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in logoutUser: ", error.message);
  }
};

//Update a user
const updateUser = async (req, res) => {
  const { name, email, phoneNumber } = req.body;
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if(req.params.id !== userId.toString()) {
      res.status(403).json({ message: "You are not allowed to perform this action" });
      return;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user = await user.save();

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in updateUser: ", error.message);
  }
};

//
const getUserProfile = async (req, res) => {
  const name = req.params.username;
  try {
    const user = await User.findOne({ name }).select("-password").select("-updatedAt");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in getUserProfile: ", error.message); 
  }
};

export { signupUser, loginUser, logoutUser, updateUser, getUserProfile };
