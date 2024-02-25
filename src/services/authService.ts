import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { UserInterface } from "../models/User";
import AuthError from "../constants/AuthError";
import config from "../config";

const saltRounds = 10;
const secretKey = config.apiKey;

const generateHashedPassword = (password: string): Promise<String> => {
  return bcrypt.hash(password, saltRounds);
};

const generateToken = (user: UserInterface): string => {
  return jwt.sign({ userId: user._id }, secretKey, { expiresIn: "24h" });
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<UserInterface> => {
  // Verify user does not already exist
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    throw AuthError.USER_ALREADY_EXISTS;
  }

  const hashedPassword = await generateHashedPassword(password);
  const newUser = new User({ username, email, password: hashedPassword });
  return await newUser.save();
};

export const loginUser = async (
  email: string,
  password: string
): Promise<string> => {
  // Verify user is present
  const user = await User.findOne({ email });
  if (!user) {
    throw AuthError.USER_NOT_FOUND;
  }

  // Verify password is correct 
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw AuthError.INVALID_CREDENTIALS;
  }
  
  return generateToken(user);
};
