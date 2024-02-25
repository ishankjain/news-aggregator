const config = {
  port: process.env.PORT || 3000,
  databaseURI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase",
  apiKey: process.env.API_KEY || "1234",
  logLevel: process.env.LOG_LEVEL || "info",
  cacheExpiration: process.env.CACHE_EXPIRATION || 3600, // in seconds
  newsApiKey: process.env.NEWS_API_KEY || "1234",
};

export default config;
