import sinon from "sinon";
import { expect } from "chai";
import { tokenVerify } from "../middleware/is-auth";

const jwt = require("jsonwebtoken");

describe("Auth middleware", () => {
  it("should throw an erro if no authoriztion header is present", () => {
    const req = {
      get: function (headerName: any) {
        return null;
      },
    };
    expect(tokenVerify.bind(this, req, {}, () => {})).to.throw(
      "Token is not present in header"
    );
  });

  it("should throw an erro if  authoriztion header is only one string", () => {
    const req = {
      get: function (headerName: any) {
        return "abcsd";
      },
    };
    expect(tokenVerify.bind(this, req, {}, () => {})).to.throw();
  });

  it("should yield a userId after decoding the token", function () {
    const req = {
      get: function (headerName: any) {
        return "Bearer djfkalsdjfaslfjdlas";
      },
    };
    sinon.stub(jwt, "verify");
    jwt.verify.returns({ userId: "abc" });
    tokenVerify(req, {}, () => {});
    expect(req).to.have.property("userId");
    expect(req).to.have.property("userId", "abc");
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });

  it("should throw an erro if  authoriztion token not verify", () => {
    const req = {
      get: function (headerName: any) {
        return "Bearer xyz";
      },
    };
    expect(tokenVerify.bind(this, req, {}, () => {})).to.throw("jwt malformed");
  });
});
