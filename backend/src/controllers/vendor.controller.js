
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Vendor } from "../models/vendor.model.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerVendor = asyncHandler(async (req, res) => {
    // 1. Get user details from frontend
    const { vendorName, ownerName, email, contactNumber, businessCategory, city, description, password } = req.body

    // 2. Validation - Check if any field is empty
    if (
        [vendorName, ownerName, email, contactNumber, businessCategory, city, description, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // 3. Check if user already exists
    const existedVendor = await Vendor.findOne({ email })

    if (existedVendor) {
        throw new ApiError(409, "Vendor with email already exists")
    }

    // 4. Create Vendor object
    const vendor = await Vendor.create({
        vendorName,
        ownerName,
        email,
        contactNumber,
        businessCategory,
        city,
        description,
        password
    })

    // 5. Check for vendor creation
    const createdVendor = await Vendor.findById(vendor._id).select(
        "-password -refreshToken"
    )

    if (!createdVendor) {
        throw new ApiError(500, "Something went wrong while registering the vendor")
    }

    // 6. Return response
    return res.status(201).json(
        new ApiResponse(200, createdVendor, "Vendor registered Successfully")
    )
})

const loginVendor = asyncHandler(async (req, res) => {
    // 1. Get email and password
    const { email, password } = req.body

    if (!email || !password) {
        throw new ApiError(400, "username or email is required")
    }

    // 2. Find user
    const vendor = await Vendor.findOne({ email })

    if (!vendor) {
        throw new ApiError(404, "Vendor does not exist")
    }

    // 3. Check password
    const isPasswordValid = await vendor.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    // 4. Generate tokens
    const accessToken = vendor.generateAccessToken()
    const refreshToken = vendor.generateRefreshToken()

    // 5. Save refresh token in DB
    vendor.refreshToken = refreshToken
    await vendor.save({ validateBeforeSave: false })

    const loggedInVendor = await Vendor.findById(vendor._id).select("-password -refreshToken")

    // 6. Send cookies
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInVendor, accessToken, refreshToken
                },
                "User logged in Successfully"
            )
        )
})

const logoutVendor = asyncHandler(async (req, res) => {
    await Vendor.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"))
})

const updateVendorDetails = asyncHandler(async (req, res) => {
    const { vendorName, ownerName, contactNumber, city, description, businessCategory } = req.body

    if (!vendorName || !ownerName || !contactNumber || !city || !description || !businessCategory) {
        throw new ApiError(400, "All fields are required")
    }

    const vendor = await Vendor.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                vendorName,
                ownerName,
                contactNumber,
                city,
                description,
                businessCategory
            }
        },
        { new: true }
    ).select("-password -refreshToken")

    return res
        .status(200)
        .json(new ApiResponse(200, vendor, "Account details updated successfully"))
})

const getVendorProfile = asyncHandler(async (req, res) => {
    const { vendorId } = req.params;
    const vendor = await Vendor.findById(vendorId).select("-password -refreshToken");
    
    if (!vendor) {
        throw new ApiError(404, "Vendor not found");
    }

    return res.status(200).json(new ApiResponse(200, vendor, "Vendor fetched successfully"));
});

const getAllVendors = asyncHandler(async (req, res) => {
    const vendors = await Vendor.find().select("-password -refreshToken");
    return res.status(200).json(new ApiResponse(200, vendors, "Vendors fetched successfully"));
});

const getVendorStats = asyncHandler(async (req, res) => {
    const vendorId = req.user._id;
    const vendor = await Vendor.findById(vendorId);
    const productCount = await Product.countDocuments({ vendor: vendorId });
    // Sales is mock for now
    const sales = Math.floor(Math.random() * 100); 

    return res.status(200).json(new ApiResponse(200, {
        averageRating: vendor.averageRating || 0,
        numberOfReviews: vendor.numberOfReviews || 0,
        productCount,
        sales
    }, "Stats fetched successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, req.user, "User fetched successfully"));
});

export { registerVendor, loginVendor, logoutVendor, updateVendorDetails, getVendorProfile, getAllVendors, getVendorStats, getCurrentUser }
