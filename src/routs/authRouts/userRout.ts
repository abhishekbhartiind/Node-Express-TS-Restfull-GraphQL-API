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

const router = express.Router();

router.post("/createUser", userCreate);
router.get("/readUser", userRead);
router.get("/readUser/:userId", userReadbyId);
router.put("/updateUser/:userId", userUpdateById);
router.put("/updateUserPassword/:userId", userUpdatePassword);
router.delete("/userDelete/:userId", userDeleteById);
router.post("/userDelete", userDelete);

export default router;
