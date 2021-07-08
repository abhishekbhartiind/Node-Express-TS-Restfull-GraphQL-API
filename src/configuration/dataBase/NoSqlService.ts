import mongoose from "mongoose";
import * as dotenv from "dotenv";
import session from "express-session";
import MongoDbSession from "connect-mongodb-session";

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
dotenv.config();

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.icdhe.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`;

const mongoStore = MongoDbSession(session);

export const store = new mongoStore({
  uri: MONGODB_URI,
  collection: "session",
});

export const NoSql: any = async () => {
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
