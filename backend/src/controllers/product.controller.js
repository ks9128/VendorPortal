import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addProduct = asyncHandler(async (req, res) => {
    const { name, shortDescription, priceRange } = req.body

    if (!name || !shortDescription) {
        throw new ApiError(400, "Name and Description are required")
    }

    // Note: Image upload logic will be added later with Cloudinary
    // For now, we assume a placeholder or string URL is passed if any
    const image = req.body.image || "https://via.placeholder.com/150"

    const product = await Product.create({
        name,
        shortDescription,
        priceRange,
        image,
        vendor: req.user._id // From auth middleware
    })

    if (!product) {
        throw new ApiError(500, "Something went wrong while adding product")
    }

    return res
        .status(201)
        .json(new ApiResponse(201, product, "Product added successfully"))
})

const getVendorProducts = asyncHandler(async (req, res) => {
    const { vendorId } = req.params

    if (!vendorId) {
        throw new ApiError(400, "Vendor ID is required")
    }

    const products = await Product.find({ vendor: vendorId })

    return res
        .status(200)
        .json(new ApiResponse(200, products, "Products fetched successfully"))
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params

    const product = await Product.findById(productId)

    if (!product) {
        throw new ApiError(404, "Product not found")
    }

    // Security Check: Ensure the logged-in user owns this product
    if (product.vendor.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this product")
    }

    await Product.findByIdAndDelete(productId)

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Product deleted successfully"))
})

const updateProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params
    const { name, shortDescription, priceRange } = req.body

    const product = await Product.findById(productId)

    if (!product) {
        throw new ApiError(404, "Product not found")
    }

    if (product.vendor.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this product")
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
            $set: {
                name,
                shortDescription,
                priceRange
            }
        },
        { new: true }
    )

    return res
        .status(200)
        .json(new ApiResponse(200, updatedProduct, "Product updated successfully"))
})

export { addProduct, getVendorProducts, deleteProduct, updateProduct }
