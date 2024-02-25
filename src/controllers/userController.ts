import { Request, Response } from "express";
import HttpStatusCode from "../constants/HttpStatusCode";
import userService from "../services/userService";
import { AuthenticatedRequest } from "../utils/AuthenticatedRequest";

// Controller function to retrieve the news preferences for the logged-in user
export const getPreferences = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user._id;
    const preferences = await userService.getUserPreferences(userId);
    res.status(HttpStatusCode.OK).json(preferences);
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve user preferences" });
  }
};

// Controller function to update the news preferences for the logged-in user
export const updatePreferences = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user._id;
    const updatedPreferences = req.body;
    const preferences = await userService.updateUserPreferences(userId, updatedPreferences);
    res
      .status(HttpStatusCode.OK)
      .json({ message: "Preferences updated successfully" , preferences: preferences});
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to update user preferences" });
  }
};

// Controller function to mark a news article as read
export const markArticleAsRead = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user._id;
    const articleId = req.params.id;
    await userService.markArticleRead(userId, articleId);
    res.status(HttpStatusCode.OK).json({ message: "Article marked as read" });
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to mark article as read" });
  }
};

// Controller function to mark a news article as favorite
export const markArticleAsFavorite = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user._id;
    const articleId = req.params.id;
    await userService.markArticleFavorite(userId, articleId);
    res
      .status(HttpStatusCode.OK)
      .json({ message: "Article marked as favorite" });
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to mark article as favorite" });
  }
};

// Controller function to retrieve all read news articles
export const getReadArticles = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user._id;
    const readArticles = await userService.getUserReadArticles(userId);
    res.status(HttpStatusCode.OK).json(readArticles);
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve read articles" });
  }
};

// Controller function to retrieve all favorite news articles
export const getFavoriteArticles = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user._id;
    const favoriteArticles = await userService.getUserFavoriteArticles(userId);
    res.status(HttpStatusCode.OK).json(favoriteArticles);
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve favorite articles" });
  }
};
