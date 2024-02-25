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
exports.getNewsCategories = exports.getNewsSources = exports.fetchNews = void 0;
const newsService_1 = __importDefault(require("../services/newsService"));
const HttpStatusCode_1 = __importDefault(require("../constants/HttpStatusCode"));
const fetchNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const page = req.query.page ? +req.query.page : 1;
        const pageSize = req.query.pageSize ? +req.query.pageSize : 100;
        const { keyword } = req.params;
        const news = yield newsService_1.default.fetchNews(userId, +page, +pageSize, keyword);
        res.status(HttpStatusCode_1.default.OK).json(news);
    }
    catch (error) {
        console.error("Error fetching news:");
        res
            .status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR)
            .json({ error: "Failed to fetch news articles" });
    }
});
exports.fetchNews = fetchNews;
const getNewsSources = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sources = yield newsService_1.default.getNewsSources();
        res.status(HttpStatusCode_1.default.OK).json(sources);
    }
    catch (error) {
        console.error("Error fetching news sources:", error);
        res
            .status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR)
            .json({ error: "Failed to fetch news sources" });
    }
});
exports.getNewsSources = getNewsSources;
const getNewsCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield newsService_1.default.getNewsCategories();
        res.status(HttpStatusCode_1.default.OK).json(categories);
    }
    catch (error) {
        console.error("Error fetching news categories:", error);
        res
            .status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR)
            .json({ error: "Failed to fetch news categories" });
    }
});
exports.getNewsCategories = getNewsCategories;
//# sourceMappingURL=newsController.js.map