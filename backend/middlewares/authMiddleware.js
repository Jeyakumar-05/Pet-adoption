import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

export const authMiddleware = (req, res, next) => {
  const token =
    req.cookies.jwt || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, access denied." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token, access denied." });
  }
};

export const adminMiddleware = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user?.userId).select("role");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error verifying admin access" });
  }
};
