// @ts-ignore
import NewsAPI from "newsapi";
import config from "../config";
import UserNewsPreference, {
  UserNewsPreferenceInterface,
} from "../models/UserNewsPreference";
import News, { NewsInterface } from "../models/News";

/**
 * @type {NewsAPI}
 */
const newsapi = new NewsAPI(config.newsApiKey);

const extractUserPreferences = async (userId: string) => {
  const userPreferences: UserNewsPreferenceInterface | null =
    await UserNewsPreference.findOne({ user: userId });

  let categories: string[] = [];
  let sources: string[] = [];

  if (userPreferences) {
    categories = userPreferences.categories;
    sources = userPreferences.sources;
  }

  return { categories, sources };
};

const fetchNewsFromAPI = async (
  categories: string[],
  sources: string[],
  page: number,
  pageSize: number,
  keyword: string
) => {
  const query: any = {
    language: "en",
    page,
    pageSize,
  };

  // if (categories.length > 0) {
  //   query.category = categories.join(",");
  // }

  if (sources.length > 0) {
    query.sources = sources.join(",");
  }

  if (keyword) {
    query.q = keyword;
  }

  // Make API request with the constructed query
  const response = await newsapi.v2.topHeadlines(query);
  return response.articles;
};

const fetchNewsSourcesFromAPI = async () => {
  const response = await newsapi.v2.sources({
    language: "en",
  });

  return response.sources;
};

async function populateNewsDatabase(fetchedArticles: any) {
  const articles: NewsInterface[] = fetchedArticles.map((article: any) => ({
    title: article.title,
    url: article.url,
    description: article.description,
    source: article.source.name,
    category: article.category, // Assuming category is provided by the API
    publishedAt: new Date(article.publishedAt),
  }));

  // Array to store the inserted articles
  const newsObjects: NewsInterface[] = [];

  // Function to insert an article into the database
  const insertArticle = async (article: NewsInterface): Promise<void> => {
    try {
      // Check if the article already exists in the database
      const newsObject = await News.findOne({ url: article.url });
      if (newsObject) {
        newsObjects.push(newsObject);
      } else {
        // Insert the new article into the database
        const newArticle = await News.create(article);
        newsObjects.push(newArticle);
      }
    } catch (error) {
      console.error("Error inserting article:", error);
    }
  };

  // Iterate through each article and insert it into the database
  for (const article of articles) {
    await insertArticle(article);
  }
  
  return newsObjects;
}

const newsService = {
  fetchNews: async (
    userId: string,
    page: number,
    pageSize: number,
    keyword: string
  ): Promise<NewsInterface[]> => {
    // Fetch user's news preferences
    let { categories, sources }: { categories: string[]; sources: string[] } =
      await extractUserPreferences(userId);

    const fetchedArticles = await fetchNewsFromAPI(
      categories,
      sources,
      page,
      pageSize,
      keyword
    );

    const newsObjects: NewsInterface[] = await populateNewsDatabase(fetchedArticles);

    return newsObjects;
  },

  getNewsSources: async (): Promise<any> => {
    return await fetchNewsSourcesFromAPI();
  },

  getNewsCategories: async (): Promise<string[]> => {
    const sources = await fetchNewsSourcesFromAPI();
    const categories: Set<string> = new Set();
    sources.forEach((source: any) => {
      categories.add(source.category);
    });

    return Array.from(categories);
  },
};

export default newsService;