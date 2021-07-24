import { expect } from "chai";
import * as mongoose from "mongoose";
import User from "../models/noSql/user";
import * as dotenv from "dotenv";
import * as authControler from "../controllers/authController/authControler";

dotenv.config();

// const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.icdhe.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`;

// describe("Auth Controller - SiginIn", function () {
//   before(function (done) {
//     mongoose
//       .connect(MONGODB_URI)
//       .then((result) => {
//         const user = new User({
//           email: "shubham005@yopmail.com",
//           password: "Admin#123",
//           name: "Test Data",
//           phone: "+917073392579",
//           accessType: 1,
//           _id: "5c0f6699879af55031b34728a",
//         });
//         return user.save();
//       })
//       .then(() => {
//         done();
//       });
//   });

//   beforeEach(function () {});

//   afterEach(function () {});

//   it("should send a response with a valid user status for an existing user", function (done) {
//     const req = { userId: "5c0f66b979af55031b34728a" };
//     const res = {
//       statusCode: 500,
//       userStatus: null,
//       status: function (code: any) {
//         this.statusCode = code;
//         return this;
//       },
//       json: function (data: any) {
//         this.userStatus = data.status;
//       },
//     };

//     authControler
//       .getUserStatus(req, res, () => {})
//       .then(() => {
//         expect(res.statusCode).to.be.equal(200);
//         expect(res.userStatus).to.be.equal("I am new!");
//         done();
//       });
//   });
// });

describe("Auth Controller fail DB ", function () {
  it("should throw an error with code 500 if accessing the database fails", function (done) {
    User.findOne();
    const req = {
      body: {
        email: "test@test.com",
        password: "tester",
      },
    };

    authControler.signIn(req, {}).then((result: any) => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 500);
      done();
    });
    done();
  });
});
