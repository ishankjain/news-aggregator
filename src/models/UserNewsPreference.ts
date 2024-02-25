import mongoose, { Schema, Document } from "mongoose";

export interface UserNewsPreferenceInterface extends Document {
  user: mongoose.Types.ObjectId;
  categories: string[];
  sources: string[];
}

const userNewsPreferenceSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categories: {
    type: [String],
    default: [],
  },
  sources: {
    type: [String],
    default: [],
  },
});

const UserNewsPreference = mongoose.model<UserNewsPreferenceInterface>(
  "UserNewsPreference",
  userNewsPreferenceSchema,
);

export default UserNewsPreference;
