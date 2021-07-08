import express from "express";
import {
  signIn,
  signUp,
  signOut,
} from "../../controllers/authController/authControler";

const router = express.Router();

export default router;
