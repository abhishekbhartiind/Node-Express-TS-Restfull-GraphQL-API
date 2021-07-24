import { expect } from "chai";
import { tokenVerify } from "../middleware/is-auth";

const jwt = require("jsonwebtoken");
const sinon = require("sinon");

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

  it("should throw an erro if  authoriztion token not verify", () => {
    const req = {
      get: function (headerName: any) {
        return "Bearer xyz";
      },
    };
    expect(tokenVerify.bind(this, req, {}, () => {})).to.throw("jwt malformed");
  });

  it("should yield a userId after decoding the token", () => {
    const req: any = {
      get: (headerName: any) => {
        return "Bearer adsfafasfasfasfasfasfafs";
      },
    };
    sinon.stub(jwt, "verify");
    jwt.verify.returns({ userId: "abc" });
    expect(tokenVerify.bind(this, req, {}, () => {})).to.not.throw();
    expect(jwt.verify.called).to.have.true;
    jwt.verify.restore();
  });
});
