import Post from "../models/noSql/post";
import User from "../models/noSql/user";

const resolve = {
  hello() {
    return {
      text: "test graphql view",
      views: 1234,
    };
  },
};

export default resolve;
