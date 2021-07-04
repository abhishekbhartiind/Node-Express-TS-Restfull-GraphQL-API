import mongoose from "mongoose";
import * as dotenv from "dotenv";

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
dotenv.config();

export const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.icdhe.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

const NoSql: any = async () => {
  let message: any;
  let error: any;
  await mongoose
    .connect(MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      message = "Mongoose connected successfull";
    })
    .catch((err) => {
      error = err;
    });

  return new Promise((resolve, reject) => {
    if (!!message) {
      resolve(message);
    } else {
      reject({ message: "Mongo connection is down!", error: error });
    }
  });
};

export default NoSql;
