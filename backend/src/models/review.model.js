import mongoose, {Schema} from "mongoose";

const reviewSchema = new Schema(
    {
        vendor: {
            type: Schema.Types.ObjectId,
            ref: "Vendor",
            required: true
        },
        clientName: {
            type: String,
            required: true,
            trim: true
        },
        projectName: {
            type: String,
            required: true,
            trim: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Review = mongoose.model("Review", reviewSchema)
