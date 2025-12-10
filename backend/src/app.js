import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        return callback(null, true);
    },
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

// routes import
import vendorRouter from './routes/vendor.routes.js'
import productRouter from './routes/product.routes.js'
import healthcheckRouter from './routes/healthcheck.routes.js'
import reviewRouter from './routes/review.routes.js'

import { errorHandler } from "./middlewares/error.middleware.js"

// routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/vendors", vendorRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/reviews", reviewRouter)

app.get("/", (req, res) => {
    res.send("Vendor Portal Backend is running successfully");
})

app.use(errorHandler)

export { app }
