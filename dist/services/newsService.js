"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const newsapi_1 = __importDefault(require("newsapi"));
const config_1 = __importDefault(require("../config"));
const UserNewsPreference_1 = __importDefault(require("../models/UserNewsPreference"));
const News_1 = __importDefault(require("../models/News"));
/**
 * @type {NewsAPI}
 */
const newsapi = new newsapi_1.default(config_1.default.newsApiKey);
const extractUserPreferences = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userPreferences = yield UserNewsPreference_1.default.findOne({ user: userId });
    let categories = [];
    let sources = [];
    if (userPreferences) {
        categories = userPreferences.categories;
        sources = userPreferences.sources;
    }
    return { categories, sources };
});
const fetchNewsFromAPI = (categories, sources, page, pageSize, keyword) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
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
    const response = yield newsapi.v2.topHeadlines(query);
    return response.articles;
});
const fetchNewsSourcesFromAPI = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield newsapi.v2.sources({
        language: "en",
    });
    return response.sources;
});
function populateNewsDatabase(fetchedArticles) {
    return __awaiter(this, void 0, void 0, function* () {
        const articles = fetchedArticles.map((article) => ({
            title: article.title,
            url: article.url,
            description: article.description,
            source: article.source.name,
            category: article.category, // Assuming category is provided by the API
            publishedAt: new Date(article.publishedAt),
        }));
        // Array to store the inserted articles
        const newsObjects = [];
        // Function to insert an article into the database
        const insertArticle = (article) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the article already exists in the database
                const newsObject = yield News_1.default.findOne({ url: article.url });
                if (newsObject) {
                    newsObjects.push(newsObject);
                }
                else {
                    // Insert the new article into the database
                    const newArticle = yield News_1.default.create(article);
                    newsObjects.push(newArticle);
                }
            }
            catch (error) {
                console.error("Error inserting article:", error);
            }
        });
        // Iterate through each article and insert it into the database
        for (const article of articles) {
            yield insertArticle(article);
        }
        return newsObjects;
    });
}
const newsService = {
    fetchNews: (userId, page, pageSize, keyword) => __awaiter(void 0, void 0, void 0, function* () {
        // Fetch user's news preferences
        let { categories, sources } = yield extractUserPreferences(userId);
        const fetchedArticles = yield fetchNewsFromAPI(categories, sources, page, pageSize, keyword);
        const newsObjects = yield populateNewsDatabase(fetchedArticles);
        return newsObjects;
    }),
    getNewsSources: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield fetchNewsSourcesFromAPI();
    }),
    getNewsCategories: () => __awaiter(void 0, void 0, void 0, function* () {
        const sources = yield fetchNewsSourcesFromAPI();
        const categories = new Set();
        sources.forEach((source) => {
            categories.add(source.category);
        });
        return Array.from(categories);
    }),
};
exports.default = newsService;
//# sourceMappingURL=newsService.js.map