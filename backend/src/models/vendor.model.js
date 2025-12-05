import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const vendorSchema = new Schema(
    {
        vendorName: {
            type: String,
            required: true,
            trim: true, 
            index: true 
        },
        ownerName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        contactNumber: {
            type: String,
            required: true,
            trim: true
        },
        businessCategory: {
            type: String,
            required: true,
            enum: ["Contractor", "Material Supplier", "Consultant", "Fabricator", "Other"]
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        logo: {
            type: String, // cloudinary url
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        },
        averageRating: {
            type: Number,
            default: 0
        },
        numberOfReviews: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

// encrypt password before saving
vendorSchema.pre("save", async function () {
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10)
})

// check if password is correct
vendorSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}
//genrate access token
vendorSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            vendorName: this.vendorName,
            ownerName: this.ownerName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


// generating refresh token
vendorSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const Vendor = mongoose.model("Vendor", vendorSchema)
