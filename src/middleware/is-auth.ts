import jwt from "jsonwebtoken";
import * as dontenv from "dotenv";
import { eApiErrorMessages } from "../models/enum/auth_enum";
dontenv.config();

export const tokenVerify = (request: any, response: any, next: any) => {
  const token = request.get("Authorization")?.split(" ")[1];
  const jwt_secreat = process.env.JWT_SECREATE || "";
  let decodedToken: any;

  if (!token) {
    return response
      .status(401)
      .json({ message: eApiErrorMessages.api401Error });
  }

  try {
    decodedToken = jwt.verify(token, jwt_secreat);
  } catch (error: any) {
    error.statusCode = 500;
    return response
      .status(error.statusCode)
      .json({ message: "Invaild  signature" });
  }

  if (!decodedToken) {
    return response
      .status(401)
      .json({ message: eApiErrorMessages.api401Error });
  }

  request.userId = decodedToken.userId;
  next();
};
