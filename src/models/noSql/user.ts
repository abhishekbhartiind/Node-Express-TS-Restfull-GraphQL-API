import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
      index: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      max: 20,
    },
    password: {
      type: String,
      required: true,
    },
    accessType: {
      type: String,
      trim: true,
      required: true,
      max: 20,
    },
    profile: {
      type: String,
      required: false,
    },
    about: {
      type: String,
      required: false,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updatedAt" } }
);

export default mongoose.model("user", userSchema);
