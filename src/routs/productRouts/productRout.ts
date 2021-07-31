import express from "express";
import {
  addImage,
  addProduct,
  deleteImage,
  deleteProductById,
  downloadImage,
  fetchProduct,
  fetchProductById,
  generatePdf,
  updateProductById,
} from "../../controllers/authController/productControler";

import { tokenVerify } from "../../middleware/is-auth";

const router = express.Router();

router.post("/addProduct", tokenVerify, addProduct);
router.get("/fetchProduct", tokenVerify, fetchProduct);
router.get("/fetchProduct/:id", tokenVerify, fetchProductById);
router.put("/updateProduct/:id", tokenVerify, updateProductById);
router.delete("/deleteProduct/:id", tokenVerify, deleteProductById);
router.post("/uploadImage", tokenVerify, addImage);
router.get("/downloadImage/:id", tokenVerify, downloadImage);
router.delete("/deleteImage/:id", tokenVerify, deleteImage);
router.get("/genratePdf/:name", generatePdf);

export default router;
