"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newsController_1 = require("../controllers/newsController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const router = express_1.default.Router();
// Apply authMiddleware to all routes in this file
router.use(authMiddleware_1.default);
// GET /news: Fetch news articles based on the logged-in user's preferences
// If a keyword is provided, perform a search
router.get("/news/:keyword?", validationMiddleware_1.validateFetchNewsParams, newsController_1.fetchNews);
// GET /newsSources: Get the news sources from the news API
router.get("/newsSources", newsController_1.getNewsSources);
// GET /newsCategories: Get the news categories from the news API
router.get("/newsCategories", newsController_1.getNewsCategories);
exports.default = router;
//# sourceMappingURL=newsRoutes.js.map