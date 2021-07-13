import { check } from "express-validator";

// user sign-in/up in validation
export const userSignupValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const userSignInValidator = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password").not().isEmpty().withMessage("Password must be require"),
];
