import mongoose, { Schema, Document } from "mongoose";

export interface UserNewsInteractionInterface extends Document {
  userId: mongoose.Types.ObjectId;
  readArticles: mongoose.Types.ObjectId[];
  favoriteArticles: mongoose.Types.ObjectId[];
}

const userNewsInteractionSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  readArticles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News",
    },
  ],
  favoriteArticles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News",
    },
  ],
});

const UserNewsInteraction = mongoose.model<UserNewsInteractionInterface>(
  "UserNewsInteraction",
  userNewsInteractionSchema,
);

export default UserNewsInteraction;
