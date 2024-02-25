import { Types } from "mongoose";
import News, { NewsInterface } from "../models/News";
import UserNewsInteraction from "../models/UserNewsInteraction";
import UserNewsPreference, {
  UserNewsPreferenceInterface,
} from "../models/UserNewsPreference";

const userService = {
  getUserPreferences: async (
    userId: string
  ): Promise<UserNewsPreferenceInterface | null> => {
    return await UserNewsPreference.findOne({ user: userId });
  },

  updateUserPreferences: async (
    userId: string,
    updatedPreferences: any
  ): Promise<UserNewsPreferenceInterface> => {
    const userPreferences: UserNewsPreferenceInterface | null =
      await UserNewsPreference.findOne({ user: userId });

    let categories: string[] = [];
    let sources: string[] = [];

    if (userPreferences) {
      categories = userPreferences.categories;
      sources = userPreferences.sources;
    }

    if (updatedPreferences.categories) {
      categories = updatedPreferences.categories;
    }

    if (updatedPreferences.sources) {
      sources = updatedPreferences.sources;
    }

    return await UserNewsPreference.findOneAndUpdate(
      { user: userId },
      { categories, sources },
      { new: true, upsert: true }
    );
  },

  markArticleRead: async (userId: string, articleId: string): Promise<void> => {
    await UserNewsInteraction.findOneAndUpdate(
      { userId: userId },
      { $addToSet: { readArticles: new Types.ObjectId(articleId) } },
      { upsert: true }
    );
  },

  markArticleFavorite: async (
    userId: string,
    articleId: string
  ): Promise<void> => {
    await UserNewsInteraction.findOneAndUpdate(
      { userId: userId },
      { $addToSet: { favoriteArticles: new Types.ObjectId(articleId) } },
      { upsert: true }
    );
  },

  getUserReadArticles: async (userId: string): Promise<NewsInterface[]> => {
    const interaction = await UserNewsInteraction.findOne({ userId: userId });
    if (interaction) {
      return await News.find({ _id: { $in: interaction.readArticles } });
    }
    return [];
  },

  getUserFavoriteArticles: async (userId: string): Promise<NewsInterface[]> => {
    const interaction = await UserNewsInteraction.findOne({ userId: userId });
    if (interaction) {
      return await News.find({ _id: { $in: interaction.favoriteArticles } });
    }
    return [];
  },
};

export default userService;
