"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Import required modules
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const newsRoutes_1 = __importDefault(require("./routes/newsRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
console.log(config_1.default.newsApiKey);
console.log(process.env.NEWS_API_KEY);
// Initialize Express application
const app = (0, express_1.default)();
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default
    .connect(config_1.default.databaseURI)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit with error code
});
const basePath = '/news-aggregator-api/';
// Define routes
app.get(basePath, (req, res) => {
    return res.status(200).send("News aggregator API");
});
app.use(basePath, authRoutes_1.default);
app.use(basePath, newsRoutes_1.default);
app.use(basePath, userRoutes_1.default);
// Start the server
const PORT = parseInt(process.env.PORT || "3000");
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map