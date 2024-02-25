"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const router = express_1.default.Router();
// Apply authMiddleware to all routes in this file
router.use(authMiddleware_1.default);
// GET /preferences: Retrieve the news preferences for the logged-in user
router.get("/preferences", userController_1.getPreferences);
// PUT /preferences: Update the news preferences for the logged-in user
router.put("/preferences", validationMiddleware_1.validateUpdatePreferences, userController_1.updatePreferences);
// POST /news/:id/read: Mark a news article as read
router.post("/news/:id/read", validationMiddleware_1.validateArticleExists, userController_1.markArticleAsRead);
// POST /news/:id/favorite: Mark a news article as a favorite
router.post("/news/:id/favorite", validationMiddleware_1.validateArticleExists, userController_1.markArticleAsFavorite);
// GET /news/read: Retrieve all read news articles
router.get("/news/read", userController_1.getReadArticles);
// GET /news/favorites: Retrieve all favorite news articles
router.get("/news/favorites", userController_1.getFavoriteArticles);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map