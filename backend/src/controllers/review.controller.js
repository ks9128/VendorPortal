import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Review } from "../models/review.model.js";
import { Vendor } from "../models/vendor.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addReview = asyncHandler(async (req, res) => {
    const { vendorId } = req.params
    const { clientName, projectName, rating, comment } = req.body

    if (!vendorId) {
        throw new ApiError(400, "Vendor ID is required")
    }

    if (!clientName || !projectName || !rating || !comment) {
        throw new ApiError(400, "All fields are required")
    }

    const vendor = await Vendor.findById(vendorId)
    if (!vendor) {
        throw new ApiError(404, "Vendor not found")
    }

    // 1. Create the review
    const review = await Review.create({
        vendor: vendorId,
        clientName,
        projectName,
        rating,
        comment
    })

    if (!review) {
        throw new ApiError(500, "Something went wrong while adding review")
    }

    // 2. Update Vendor's Average Rating
    // We fetch all reviews to calculate the new average accurately
    const allReviews = await Review.find({ vendor: vendorId })

    const totalRating = allReviews.reduce((acc, curr) => acc + curr.rating, 0)
    const newAverageRating = totalRating / allReviews.length

    vendor.averageRating = newAverageRating
    vendor.numberOfReviews = allReviews.length
    await vendor.save({ validateBeforeSave: false })

    return res
        .status(201)
        .json(new ApiResponse(201, review, "Review added successfully"))
})

const getVendorReviews = asyncHandler(async (req, res) => {
    const { vendorId } = req.params

    if (!vendorId) {
        throw new ApiError(400, "Vendor ID is required")
    }

    const reviews = await Review.find({ vendor: vendorId })

    return res
        .status(200)
        .json(new ApiResponse(200, reviews, "Reviews fetched successfully"))
})

export { addReview, getVendorReviews }
