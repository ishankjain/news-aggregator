import express from "express";
import {
  getPreferences,
  updatePreferences,
  markArticleAsRead,
  markArticleAsFavorite,
  getReadArticles,
  getFavoriteArticles,
} from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";
import {
  validateArticleExists,
  validateUpdatePreferences,
} from "../middlewares/validationMiddleware";

const router = express.Router();

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

// GET /preferences: Retrieve the news preferences for the logged-in user
router.get("/preferences", getPreferences);

// PUT /preferences: Update the news preferences for the logged-in user
router.put("/preferences", validateUpdatePreferences, updatePreferences);

// POST /news/:id/read: Mark a news article as read
router.post("/news/:id/read", validateArticleExists, markArticleAsRead);

// POST /news/:id/favorite: Mark a news article as a favorite
router.post("/news/:id/favorite", validateArticleExists, markArticleAsFavorite);

// GET /news/read: Retrieve all read news articles
router.get("/news/read", getReadArticles);

// GET /news/favorites: Retrieve all favorite news articles
router.get("/news/favorites", getFavoriteArticles);

export default router;
