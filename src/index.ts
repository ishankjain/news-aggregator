import dotenv from 'dotenv';

dotenv.config();

// Import required modules
import express, { Express } from "express";
import mongoose from "mongoose";
import config from "./config";
import authRoutes from "./routes/authRoutes";
import newsRoutes from "./routes/newsRoutes";
import userRoutes from "./routes/userRoutes";

console.log(config.newsApiKey);
console.log(process.env.NEWS_API_KEY);

// Initialize Express application
const app: Express = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(config.databaseURI)
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
app.use(basePath, authRoutes);
app.use(basePath, newsRoutes);
app.use(basePath, userRoutes);

// Start the server
const PORT: number = parseInt(process.env.PORT || "3000");
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
