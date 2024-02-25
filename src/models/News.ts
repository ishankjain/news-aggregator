import mongoose, { Schema, Document } from "mongoose";

export interface NewsInterface extends Document {
  title: string;
  url: string;
  description?: string;
  source?: string;
  category?: string;
  publishedAt?: Date;
  createdAt: Date;
}

const newsSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  source: String,
  category: String,
  publishedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const News = mongoose.model<NewsInterface>("News", newsSchema);

export default News;
