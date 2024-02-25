import { Response } from "express";
import newsService from "../services/newsService";
import HttpStatusCode from "../constants/HttpStatusCode";
import { AuthenticatedRequest } from "../utils/AuthenticatedRequest";

export const fetchNews = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user._id;
    const page = req.query.page ? +req.query.page : 1;
    const pageSize = req.query.pageSize ? +req.query.pageSize : 100;
    const { keyword } = req.params;
    const news = await newsService.fetchNews(userId, +page, +pageSize, keyword);
    res.status(HttpStatusCode.OK).json(news);
  } catch (error) {
    console.error("Error fetching news:");
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch news articles" });
  }
};

export const getNewsSources = async (
    _req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const sources = await newsService.getNewsSources();
      res.status(HttpStatusCode.OK).json(sources);
    } catch (error) {
      console.error("Error fetching news sources:", error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to fetch news sources" });
    }
  };
  
  export const getNewsCategories = async (
    _req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const categories = await newsService.getNewsCategories();
      res.status(HttpStatusCode.OK).json(categories);
    } catch (error) {
      console.error("Error fetching news categories:", error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to fetch news categories" });
    }
  };