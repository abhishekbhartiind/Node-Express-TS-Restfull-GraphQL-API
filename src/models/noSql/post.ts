import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    postTo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
