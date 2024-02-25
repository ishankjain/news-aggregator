import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import HttpStatusCode from "../constants/HttpStatusCode";
import AuthError from "../constants/AuthError";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const newUser = await registerUser(username, email, password);
    res
      .status(HttpStatusCode.CREATED)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    if (error === AuthError.USER_ALREADY_EXISTS) {
      res
        .status(HttpStatusCode.CONFLICT)
        .json({ message: "User already exists" });
    } else {
      console.error(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to register user" });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.status(HttpStatusCode.OK).json({ message: "Login successful", token });
  } catch (error) {
    switch (error) {
      case AuthError.USER_NOT_FOUND:
        res.status(HttpStatusCode.NOT_FOUND).json({ error: "User not found" });
        break;
      case AuthError.INVALID_CREDENTIALS:
        res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json({ error: "Invalid credentials" });
        break;
      default:
        console.error(error);
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ error: "Failed to login" });
        break;
    }
  }
};
