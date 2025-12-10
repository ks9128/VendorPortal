import { Router } from "express";
import { addProduct, deleteProduct, getVendorProducts, updateProduct } from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

// Public Route: Anyone can see a vendor's products
router.route("/vendor/:vendorId").get(getVendorProducts)

// Protected Routes: Only logged-in vendors can add/delete
router.route("/add").post(verifyJWT, upload.single("image"), addProduct)
router.route("/:productId").delete(verifyJWT, deleteProduct).put(verifyJWT, upload.single("image"), updateProduct)

export default router
