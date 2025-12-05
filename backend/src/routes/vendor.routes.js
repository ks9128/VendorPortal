import { Router } from "express";
import { getAllVendors, getVendorProfile, loginVendor, logoutVendor, registerVendor, updateVendorDetails, getVendorStats, getCurrentUser } from "../controllers/vendor.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerVendor)
router.route("/login").post(loginVendor)

// Secured Routes
router.route("/logout").post(verifyJWT, logoutVendor)
router.route("/update-account").patch(verifyJWT, updateVendorDetails)
router.route("/current-user").get(verifyJWT, getCurrentUser)

// Public Routes
router.route("/").get(getAllVendors)
router.route("/profile/:vendorId").get(getVendorProfile)
router.route("/stats").get(verifyJWT, getVendorStats)

export default router
