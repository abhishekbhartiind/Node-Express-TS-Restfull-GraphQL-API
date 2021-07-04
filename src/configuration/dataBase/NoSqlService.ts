import mongoose from "mongoose";
import * as dotenv from "dotenv";

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
dotenv.config();

const URI = process.env.noSqlUrl || "";

const NoSql: any = async () => {
  let message: any;
  let error: any;
  await mongoose
    .connect(URI, {
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
