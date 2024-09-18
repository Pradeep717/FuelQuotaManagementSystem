import jwt from "jsonwebtoken";
import User from "../models/user.js";


const protectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "You need to login first" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "You need to login first" });
    console.log("Error in protectRoute: ", error.message);
  }
}

export default protectRoute;