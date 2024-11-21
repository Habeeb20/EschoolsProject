import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import School from "../models/school.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract token from header

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to request
      req.user = await School.findById(decoded.id).select("-password");
      if (!req.user) {
        res.status(401);
        throw new Error("User not found.");
      }

      next(); // Proceed to the next middleware/controller
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token provided.");
  }
});
