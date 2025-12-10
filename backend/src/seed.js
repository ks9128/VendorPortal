import mongoose from "mongoose";
import dotenv from "dotenv";
import { Vendor } from "./models/vendor.model.js";
import { Product } from "./models/product.model.js";
import { Review } from "./models/review.model.js";
import bcrypt from "bcrypt";

dotenv.config({
    path: './.env'
});

import { DB_NAME } from "./constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error ", error);
        process.exit(1)
    }
}

const seedData = async () => {
    await connectDB();

    console.log("Clearing existing data...");
    await Vendor.deleteMany({});
    await Product.deleteMany({});
    await Review.deleteMany({});

    console.log("Seeding Vendors...");
    const hashedPassword = await bcrypt.hash("password123", 10);

    const vendors = await Vendor.insertMany([
        {
            vendorName: "Sharma Contractors",
            ownerName: "Rajesh Sharma",
            email: "rajesh@sharma.com",
            password: hashedPassword, 
            contactNumber: "9876543210",
            businessCategory: "Contractor",
            city: "Delhi",
            description: "We do all kind of building work. House renovation and repair.",
            averageRating: 4.5,
            numberOfReviews: 2
        },
        {
            vendorName: "Gupta Materials",
            ownerName: "Suresh Gupta",
            email: "suresh@gupta.com",
            password: hashedPassword,
            contactNumber: "9123456789",
            businessCategory: "Material Supplier",
            city: "Mumbai",
            description: "Best quality cement and bricks supplier.",
            averageRating: 5.0,
            numberOfReviews: 1
        },
        {
            vendorName: "Singh Consultants",
            ownerName: "Amit Singh",
            email: "amit@singh.com",
            password: hashedPassword,
            contactNumber: "8888888888",
            businessCategory: "Consultant",
            city: "Bangalore",
            description: "Expert advice for structural design.",
            averageRating: 0,
            numberOfReviews: 0
        }
    ]);

    console.log("Seeding Products...");
    const vendor1 = vendors[0]; // Sharma
    const vendor2 = vendors[1]; // Gupta

    await Product.insertMany([
        {
            name: "Home Repair Service",
            shortDescription: "Plumbing and electrical work for home.",
            priceRange: "Rs 500 - 2000",
            vendor: vendor1._id,
            image: "https://placehold.co/300?text=Home+Repair"
        },
        {
            name: "Full House Paint",
            shortDescription: "Painting service for 2 BHK flat.",
            priceRange: "Rs 15000 - 25000",
            vendor: vendor1._id,
            image: "https://placehold.co/300?text=Painting"
        },
        {
            name: "ACC Cement Bag",
            shortDescription: "50kg cement bag for construction.",
            priceRange: "Rs 400",
            vendor: vendor2._id,
            image: "https://placehold.co/300?text=Cement"
        }
    ]);

    console.log("Seeding Reviews...");
    await Review.insertMany([
        {
            vendor: vendor1._id,
            clientName: "Rahul Verma",
            projectName: "Kitchen fix",
            rating: 4,
            comment: "Good work done by Rajesh ji."
        },
        {
            vendor: vendor1._id,
            clientName: "Priya Mehta",
            projectName: "Wall paint",
            rating: 5,
            comment: "Very nice color finishing."
        },
        {
            vendor: vendor2._id,
            clientName: "Anil Kumar",
            projectName: "House construction",
            rating: 5,
            comment: "Timely delivery of materials."
        }
    ]);

    console.log("Database seeded successfully!");
    process.exit(0);
};

seedData();
