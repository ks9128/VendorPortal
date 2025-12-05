import mongoose, {Schema} from "mongoose";

const productSchema = new Schema(
    {
        vendor: {
            type: Schema.Types.ObjectId,
            ref: "Vendor",
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String, // cloudinary url
            required: true
        },
        shortDescription: {
            type: String,
            required: true,
            trim: true
        },
        priceRange: {
            type: String, 
        }
    },
    {
        timestamps: true
    }
)

export const Product = mongoose.model("Product", productSchema)
