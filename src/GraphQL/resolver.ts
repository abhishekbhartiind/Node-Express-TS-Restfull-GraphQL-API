import bcrypt from "bcrypt";
import User from "../models/noSql/user";

// const resolve = {
//   createUser: async function ({ ...userInput }, request: any) {
//     //   const email = args.userInput.email;
//     const existingUser = await User.findOne({ email: userInput.email });
//     if (existingUser) {
//       const error = new Error("User exists already!");
//       throw error;
//     }
//     const hashedPw = await bcrypt.hash(userInput.password, 12);
//     const user = new User({
//       email: userInput.email,
//       name: userInput.name,
//       password: hashedPw,
//     });
//     const createdUser: any = await user.save();
//     return { ...createdUser._doc, _id: createdUser._id.toString() };
//   },
// };

const resolve = {
  Hello() {
    return {
      text: "Hello World!",
      views: 1234,
    };
  },
};
export default resolve;
