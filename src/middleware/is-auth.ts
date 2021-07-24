import jwt from "jsonwebtoken";
import * as dontenv from "dotenv";
import { eApiErrorMessages } from "../models/enum/auth_enum";
dontenv.config();

export const tokenVerify = (request: any, response: any, next: any) => {
  const token = request.get("Authoriztion")?.split(" ")[1];
  const jwt_secreat = process.env.JWT_SECREATE || "";
  let decodedToken: any;

  if (!token) {
    throw new Error("Token is not present in header");
  }

  try {
    decodedToken = jwt.verify(token, jwt_secreat);
  } catch (error: any) {
    error.statusCode = 500;
    throw error;
  }

  if (!decodedToken) {
    return response
      .status(401)
      .json({ message: eApiErrorMessages.api401Error });
  }

  request.userId = decodedToken.userId;
  next();
};
