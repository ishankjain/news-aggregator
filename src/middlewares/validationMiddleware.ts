import { body, query, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import HttpStatusCode from "../constants/HttpStatusCode";
import News from "../models/News";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  next();
};

// Middleware function to validate user registration inputs
export const validateRegistration = [
  body("username", "Username is required").notEmpty(),
  body("email", "Please include a valid email").isEmail(),
  body(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  (req: Request, res: Response, next: NextFunction) => {
    validate(req, res, next);
  },
];

// Middleware function to validate user login inputs
export const validateLogin = [
  body("email", "Please include a valid email").isEmail(),
  body("password", "Password is required").exists(),
  (req: Request, res: Response, next: NextFunction) => {
    validate(req, res, next);
  },
];

// Middleware function to validate query and path parameters for fetching the news
export const validateFetchNewsParams = [
  query("page")
    .optional()
    .toInt()
    .isInt({ min: 1 })
    .withMessage("page must be an integer"),
  query("pageSize")
    .optional()
    .toInt()
    .isInt({ min: 1, max: 100 })
    .withMessage("page size must be an integer"),
  param("keyword")
    .optional()
    .isString()
    .trim()
    .withMessage("keyword must be a string"),
  (req: Request, res: Response, next: NextFunction) => {
    validate(req, res, next);
  },
];

// Middleware function to validate update preferences request body
export const validateUpdatePreferences = [
  body("categories")
    .optional()
    .isArray()
    .withMessage("Categories must be an array"),
  body("categories.*")
    .optional()
    .isString()
    .withMessage("Each category must be a string"),
  body("sources").optional().isArray().withMessage("Sources must be an array"),
  body("sources.*")
    .optional()
    .isString()
    .withMessage("Each source must be a string"),
  (req: Request, res: Response, next: NextFunction) => {
    validate(req, res, next);
  },
];

// Middleware function to validate the article with the specified id exists
export const validateArticleExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articleId = req.params.id;
    const article = await News.findById(articleId);
    if (!article) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ error: "Article not found" });
    }
    next();
  } catch (error) {
    console.error("Error validating article:", error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};
