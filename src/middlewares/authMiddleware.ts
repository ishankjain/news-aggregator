import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import HttpStatusCode from "../constants/HttpStatusCode";
import { AuthenticatedRequest } from "../utils/AuthenticatedRequest";

const secretKey = config.apiKey;

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Get the token from the request headers
  let token = req.header("Authorization");

  // Check if token is present
  if (!token) {
    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ error: "No token, authorization denied" });
  }

  // Split the token string by space (" ") to separate "Bearer" and the token
  [, token] = token.split(" ");

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ error: "Invalid token" });
  }
};

export default authMiddleware;
