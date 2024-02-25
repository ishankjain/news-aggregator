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
const mongoose_1 = require("mongoose");
const News_1 = __importDefault(require("../models/News"));
const UserNewsInteraction_1 = __importDefault(require("../models/UserNewsInteraction"));
const UserNewsPreference_1 = __importDefault(require("../models/UserNewsPreference"));
const userService = {
    getUserPreferences: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield UserNewsPreference_1.default.findOne({ user: userId });
    }),
    updateUserPreferences: (userId, updatedPreferences) => __awaiter(void 0, void 0, void 0, function* () {
        const userPreferences = yield UserNewsPreference_1.default.findOne({ user: userId });
        let categories = [];
        let sources = [];
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
        return yield UserNewsPreference_1.default.findOneAndUpdate({ user: userId }, { categories, sources }, { new: true, upsert: true });
    }),
    markArticleRead: (userId, articleId) => __awaiter(void 0, void 0, void 0, function* () {
        yield UserNewsInteraction_1.default.findOneAndUpdate({ userId: userId }, { $addToSet: { readArticles: new mongoose_1.Types.ObjectId(articleId) } }, { upsert: true });
    }),
    markArticleFavorite: (userId, articleId) => __awaiter(void 0, void 0, void 0, function* () {
        yield UserNewsInteraction_1.default.findOneAndUpdate({ userId: userId }, { $addToSet: { favoriteArticles: new mongoose_1.Types.ObjectId(articleId) } }, { upsert: true });
    }),
    getUserReadArticles: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const interaction = yield UserNewsInteraction_1.default.findOne({ userId: userId });
        if (interaction) {
            return yield News_1.default.find({ _id: { $in: interaction.readArticles } });
        }
        return [];
    }),
    getUserFavoriteArticles: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const interaction = yield UserNewsInteraction_1.default.findOne({ userId: userId });
        if (interaction) {
            return yield News_1.default.find({ _id: { $in: interaction.favoriteArticles } });
        }
        return [];
    }),
};
exports.default = userService;
//# sourceMappingURL=userService.js.map