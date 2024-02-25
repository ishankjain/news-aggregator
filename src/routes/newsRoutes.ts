import express from "express";
import { fetchNews, getNewsCategories, getNewsSources } from "../controllers/newsController";
import authMiddleware from "../middlewares/authMiddleware";
import { validateFetchNewsParams } from "../middlewares/validationMiddleware";

const router = express.Router();

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

// GET /news: Fetch news articles based on the logged-in user's preferences
// If a keyword is provided, perform a search
router.get("/news/:keyword?", validateFetchNewsParams, fetchNews);

// GET /newsSources: Get the news sources from the news API
router.get("/newsSources", getNewsSources);

// GET /newsCategories: Get the news categories from the news API
router.get("/newsCategories", getNewsCategories);

export default router;
