import express from "express";
import {
  addProduct,
  deleteProductById,
  fetchProduct,
  fetchProductById,
  updateProductById,
} from "../../controllers/authController/productControler";

import { tokenVerify } from "../../middleware/is-auth";

const router = express.Router();

router.post("/addProduct", tokenVerify, addProduct);
router.get("/fetchProduct", tokenVerify, fetchProduct);
router.get("/fetchProduct/:id", tokenVerify, fetchProductById);
router.put("/updateProduct/:id", tokenVerify, updateProductById);
router.delete("/deleteProduct/:id", tokenVerify, deleteProductById);

export default router;
