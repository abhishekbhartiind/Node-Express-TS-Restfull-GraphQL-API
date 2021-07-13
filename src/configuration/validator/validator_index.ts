import { validationResult } from "express-validator";

export const runValidation = (request: any, response: any, next: any) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({
      error: errors?.array()[0]?.msg || "Somthing happen in validation error",
    });
  }
  next();
};
