import { Router } from "express";
import { addReview, getVendorReviews } from "../controllers/review.controller.js";

const router = Router()

// Public Routes
router.route("/:vendorId").get(getVendorReviews).post(addReview)

export default router
