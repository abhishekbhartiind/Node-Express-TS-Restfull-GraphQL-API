import express from "express";
import { addProduct } from "../../controllers/authController/productControler";

import { tokenVerify } from "../../middleware/is-auth";

const router = express.Router();

router.post("/addProduct", addProduct);
// router.get("/readUser", tokenVerify, userRead);
// router.get("/readUser/:userId", tokenVerify, userReadbyId);
// router.put("/updateUser/:userId", tokenVerify, userUpdateById);
// router.put("/updateUserPassword/:userId", tokenVerify, userUpdatePassword);
// router.delete("/userDelete/:userId", tokenVerify, userDeleteById);
// router.post("/userDelete", tokenVerify, userDelete);

export default router;
