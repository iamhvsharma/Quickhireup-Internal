import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import companyRoutes from "./routes/companyprofile.routes.js";
import jobListingRoutes from "./routes/jobListing.routes.js";
import jobSeekerRoutes from "./routes/jobseeker.routes.js";

// Creating App
const app = express();

// Configuring Cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Adding express.json middleware
app.use(express.json({ limit: "16kb" }));

// Adding URLencoded middleware
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Adding Cookie Parser Middleware
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/profile", companyRoutes);
app.use("/api/company", jobListingRoutes);
app.use("/api/profile", jobSeekerRoutes)

export { app };
