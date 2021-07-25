import express from "express";
import {
  userCreate,
  userRead,
  userReadbyId,
  userUpdateById,
  userUpdatePassword,
  userDeleteById,
  userDelete,
} from "../../controllers/authController/userController";

import { tokenVerify } from "../../middleware/is-auth";

const router = express.Router();

router.post("/createUser", tokenVerify, userCreate);
router.get("/readUser", tokenVerify, userRead);
router.get("/readUser/:userId", tokenVerify, userReadbyId);
router.put("/updateUser/:userId", tokenVerify, userUpdateById);
router.put("/updateUserPassword/:userId", tokenVerify, userUpdatePassword);
router.delete("/userDelete/:userId", tokenVerify, userDeleteById);
router.post("/userDelete", tokenVerify, userDelete);

export default router;
