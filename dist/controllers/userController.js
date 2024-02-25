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
exports.getFavoriteArticles = exports.getReadArticles = exports.markArticleAsFavorite = exports.markArticleAsRead = exports.updatePreferences = exports.getPreferences = void 0;
const HttpStatusCode_1 = __importDefault(require("../constants/HttpStatusCode"));
const userService_1 = __importDefault(require("../services/userService"));
// Controller function to retrieve the news preferences for the logged-in user
const getPreferences = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const preferences = yield userService_1.default.getUserPreferences(userId);
        res.status(HttpStatusCode_1.default.OK).json(preferences);
    }
    catch (error) {
        console.error(error);
        res
            .status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR)
            .json({ error: "Failed to retrieve user preferences" });
    }
});
exports.getPreferences = getPreferences;
// Controller function to update the news preferences for the logged-in user
const updatePreferences = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const updatedPreferences = req.body;
        const preferences = yield userService_1.default.updateUserPreferences(userId, updatedPreferences);
        res
            .status(HttpStatusCode_1.default.OK)
            .json({ message: "Preferences updated successfully", preferences: preferences });
    }
    catch (error) {
        console.error(error);
        res
            .status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR)
            .json({ error: "Failed to update user preferences" });
    }
});
exports.updatePreferences = updatePreferences;
// Controller function to mark a news article as read
const markArticleAsRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const articleId = req.params.id;
        yield userService_1.default.markArticleRead(userId, articleId);
        res.status(HttpStatusCode_1.default.OK).json({ message: "Article marked as read" });
    }
    catch (error) {
        console.error(error);
        res
            .status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR)
            .json({ error: "Failed to mark article as read" });
    }
});
exports.markArticleAsRead = markArticleAsRead;
// Controller function to mark a news article as favorite
const markArticleAsFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const articleId = req.params.id;
        yield userService_1.default.markArticleFavorite(userId, articleId);
        res
            .status(HttpStatusCode_1.default.OK)
            .json({ message: "Article marked as favorite" });
    }
    catch (error) {
        console.error(error);
        res
            .status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR)
            .json({ error: "Failed to mark article as favorite" });
    }
});
exports.markArticleAsFavorite = markArticleAsFavorite;
// Controller function to retrieve all read news articles
const getReadArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const readArticles = yield userService_1.default.getUserReadArticles(userId);
        res.status(HttpStatusCode_1.default.OK).json(readArticles);
    }
    catch (error) {
        console.error(error);
        res
            .status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR)
            .json({ error: "Failed to retrieve read articles" });
    }
});
exports.getReadArticles = getReadArticles;
// Controller function to retrieve all favorite news articles
const getFavoriteArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const favoriteArticles = yield userService_1.default.getUserFavoriteArticles(userId);
        res.status(HttpStatusCode_1.default.OK).json(favoriteArticles);
    }
    catch (error) {
        console.error(error);
        res
            .status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR)
            .json({ error: "Failed to retrieve favorite articles" });
    }
});
exports.getFavoriteArticles = getFavoriteArticles;
//# sourceMappingURL=userController.js.map